import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	CREATE_INCOME_THUNK_ID,
	DELETE_INCOME_THUNK_ID,
	GET_ALL_INCOME_THUNK_ID,
	GET_DOWNLOADED_INCOME_THUNK_ID,
} from '../../models/Constants/ThunkIds/Income';
import type { Guid } from '../../utils/DataTypes/Guid';
import { buildAxiosCall } from '../services';

//#region GET
export const getAllIncome = createAsyncThunk<void, void>(GET_ALL_INCOME_THUNK_ID, async () => {
	const { data } = await buildAxiosCall<void, void>('GET', 'api/income/get');
	return data;
});

export const downloadIncome = createAsyncThunk<void, void>(
	GET_DOWNLOADED_INCOME_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<void, void>('GET', 'api/income/downloadExcel');
		return data;
	},
);
//#endregion GET

//#region POST
export const addIncome = createAsyncThunk<void, void>(CREATE_INCOME_THUNK_ID, async () => {
	const { data } = await buildAxiosCall<void, void>('POST', 'api/income/add');
	return data;
});
//#endregion POST

//#region PUT

//#endregion PUT

//#region DELETE
export const deleteIncome = createAsyncThunk<void, Guid>(
	DELETE_INCOME_THUNK_ID,
	async (incomeId) => {
		const { data } = await buildAxiosCall<void, Guid>('DELETE', `api/income/${incomeId}`);
		return data;
	},
);
//#endregion DELETE
