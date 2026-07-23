import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AccountResponseDTO } from '../../api/GeneratedDTOs';
import type { Guid } from '../../utils/DataTypes/Guid';
import { getUserAccounts } from '../services/AccountService';

interface AccountsState {
	userAccounts: AccountResponseDTO[];
	selectedAccountId: Guid | null;
	selectedAccount: AccountResponseDTO | null;
}

const initialState: AccountsState = {
	userAccounts: [],
	selectedAccountId: null,
	selectedAccount: null,
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
		builder.addCase(getUserAccounts.fulfilled, (state, action) => {
			state.userAccounts = action.payload;

			const defaultAccount = action.payload.find((account) => account.isDefault) ?? null;

			state.selectedAccount = defaultAccount;
			state.selectedAccountId = defaultAccount?.id ?? null;
		});
	},
});

export const { setAccounts, setSelectedAccountId, clearAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;
