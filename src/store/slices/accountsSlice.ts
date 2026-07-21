import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AccountResponseDTO } from '../../api/GeneratedDTOs';
import type { Guid } from '../../utils/DataTypes/Guid';

interface AccountsState {
	accounts: AccountResponseDTO[];
	selectedAccountId: Guid | null;
}

const initialState: AccountsState = {
	accounts: [],
	selectedAccountId: null,
};

const accountsSlice = createSlice({
	name: 'accounts',
	initialState,
	reducers: {
		setAccounts: (state, action: PayloadAction<AccountResponseDTO[]>) => {
			state.accounts = action.payload;
		},

		setSelectedAccountId: (state, action: PayloadAction<Guid | null>) => {
			state.selectedAccountId = action.payload;
		},

		clearAccounts: (state) => {
			state.accounts = [];
			state.selectedAccountId = null;
		},
	},
});

export const { setAccounts, setSelectedAccountId, clearAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;
