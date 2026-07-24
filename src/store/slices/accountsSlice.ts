import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AccountResponseDTO } from '../../api/GeneratedDTOs';
import type { Guid } from '../../utils/DataTypes/Guid';
import { addUserAccount, deleteAccount, getUserAccounts } from '../services/AccountService';

type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface AccountsState {
	userAccounts: AccountResponseDTO[];
	selectedAccountId: Guid | null;
	selectedAccount: AccountResponseDTO | null;
	status: LoadingStatus;
}

const initialState: AccountsState = {
	userAccounts: [],
	selectedAccountId: null,
	selectedAccount: null,
	status: 'idle',
};

const accountsSlice = createSlice({
	name: 'accounts',
	initialState,
	reducers: {
		setAccounts: (state, action: PayloadAction<AccountResponseDTO[]>) => {
			state.userAccounts = action.payload;
		},

		setSelectedAccountId: (state, action: PayloadAction<Guid>) => {
			state.selectedAccountId = action.payload;

			state.selectedAccount =
				state.userAccounts.find((account) => account.id === action.payload) ?? null;
		},

		clearAccounts: (state) => {
			state.userAccounts = [];
			state.selectedAccountId = null;
			state.selectedAccount = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserAccounts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUserAccounts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.userAccounts = action.payload;

				const defaultAccount =
					action.payload.find((account) => account.isDefault || account) ?? null;

				state.selectedAccount = defaultAccount;
				state.selectedAccountId = defaultAccount?.id ?? null;
			})
			.addCase(getUserAccounts.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(addUserAccount.fulfilled, (state, action) => {
				state.userAccounts.push(action.payload);
			})
			.addCase(deleteAccount.fulfilled, (state, action) => {
				const deletedAccountId = action.meta.arg;

				state.userAccounts = state.userAccounts.filter(
					(account) => account.id !== deletedAccountId,
				);

				if (state.selectedAccountId === deletedAccountId) {
					const nextAccount =
						state.userAccounts.find((account) => account.isDefault) ??
						state.userAccounts[0] ??
						null;

					state.selectedAccount = nextAccount;
					state.selectedAccountId = nextAccount?.id ?? null;
				}
			});
	},
});

export const { setAccounts, setSelectedAccountId, clearAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;
