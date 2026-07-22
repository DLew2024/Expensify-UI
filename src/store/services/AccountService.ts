import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AccountResponseDTO, CreateAccountDTO } from '../../api/GeneratedDTOs';
import {
	CREATE_USER_ACCOUNTS,
	DELETE_ACCOUNT_THUNK_ID,
	GET_USER_ACCOUNTS,
} from '../../models/Constants/ThunkIds/AccountThunkIds';
import type { Guid } from '../../utils/DataTypes/Guid';
import { buildAxiosCall, createMutationThunk } from '../services';

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
export const addUserAccount = createMutationThunk<void, CreateAccountDTO>(
	CREATE_USER_ACCOUNTS,
	async (account, { thunkId }) => {
		const { data } = await buildAxiosCall<void, CreateAccountDTO>('POST', 'api/accounts', account, {
			thunkId,
		});

		return data;
	},
);
//#endregion POST

//#region PUT

//#endregion PUT

//#region DELETE
export const deleteAccount = createMutationThunk<void, Guid>(
	DELETE_ACCOUNT_THUNK_ID,
	async (accountId, { thunkId }) => {
		const { data } = await buildAxiosCall<void, Guid>(
			'DELETE',
			`api/account/${accountId}`,
			undefined,
			{ thunkId },
		);

		return data;
	},
);
//#endregion DELETE
