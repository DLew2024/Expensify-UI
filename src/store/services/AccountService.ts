import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AccountResponseDTO, CreateAccountDTO } from '../../api/GeneratedDTOs';
import {
	CREATE_USER_ACCOUNTS,
	DELETE_ACCOUNT_THUNK_ID,
	GET_USER_ACCOUNTS,
} from '../../models/Constants/ThunkIds/AccountThunkIds';
import type { Guid } from '../../utils/DataTypes/Guid';
import { buildAxiosCall } from '../services';

//#region GET
export const getUserAccounts = createAsyncThunk<AccountResponseDTO[], void>(
	GET_USER_ACCOUNTS,
	async () => {
		const { data } = await buildAxiosCall<AccountResponseDTO[], void>('GET', `api/accounts`);
		return data;
	},
);
//#endregion GET

//#region POST
export const addUserAccount = createAsyncThunk<void, CreateAccountDTO>(
	CREATE_USER_ACCOUNTS,
	async (account) => {
		const { data } = await buildAxiosCall<void, CreateAccountDTO>('POST', `api/accounts`, account);
		return data;
	},
);
//#endregion POST

//#region PUT

//#endregion PUT

//#region DELETE
export const deleteAccount = createAsyncThunk<void, Guid>(
	DELETE_ACCOUNT_THUNK_ID,
	async (accountId) => {
		const { data } = await buildAxiosCall<void, Guid>('DELETE', `api/account/${accountId}`);
		return data;
	},
);
//#endregion DELETE
