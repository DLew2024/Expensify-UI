import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AccountResponseDTO } from '../../api/GeneratedDTOs';
import { GET_USER_ACCOUNTS } from '../../models/Constants/ThunkIds/Account';
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

//#endregion POST

//#region PUT

//#endregion PUT

//#region DELETE

//#endregion DELETE
