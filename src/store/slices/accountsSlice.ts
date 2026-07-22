import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AccountResponseDTO } from '../../api/GeneratedDTOs';
import { EMPTY_GUID, type Guid } from '../../utils/DataTypes/Guid';

interface AccountsState {
	userAccounts: AccountResponseDTO[];
	selectedAccountId: Guid;
}

const initialState: AccountsState = {
	userAccounts: [],
	selectedAccountId: EMPTY_GUID,
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
		},

		clearAccounts: (state) => {
			state.userAccounts = [];
			state.selectedAccountId = EMPTY_GUID;
		},
	},
});

export const { setAccounts, setSelectedAccountId, clearAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;
