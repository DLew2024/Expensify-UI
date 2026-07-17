import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	CREATE_EXPENSE_THUNK_ID,
	DELETE_EXPENSE_THUNK_ID,
	GET_ALL_EXPENSE_THUNK_ID,
	GET_DOWNLOADED_EXPENSE_THUNK_ID,
} from '../../models/Constants/ThunkIds/Expense';
import type { Guid } from '../../utils/DataTypes/Guid';
import { buildAxiosCall } from '../services';

//#region GET
export const getAllIncome = createAsyncThunk<void, void>(GET_ALL_EXPENSE_THUNK_ID, async () => {
	const { data } = await buildAxiosCall<void, void>('GET', 'api/expense/get');
	return data;
});

export const downloadIncome = createAsyncThunk<void, void>(
	GET_DOWNLOADED_EXPENSE_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<void, void>('GET', 'api/expense/downloadExcel');
		return data;
	},
);
//#endregion GET

//#region POST
export const addIncome = createAsyncThunk<void, void>(CREATE_EXPENSE_THUNK_ID, async () => {
	const { data } = await buildAxiosCall<void, void>('POST', 'api/expense/add');
	return data;
});
//#endregion POST

//#region PUT

//#endregion PUT

//#region DELETE
export const deleteIncome = createAsyncThunk<void, Guid>(
	DELETE_EXPENSE_THUNK_ID,
	async (incomeId) => {
		const { data } = await buildAxiosCall<void, Guid>('DELETE', `api/expense/${incomeId}`);
		return data;
	},
);
//#endregion DELETE
