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
export const getAllExpense = createAsyncThunk<string[], void>(
	GET_ALL_EXPENSE_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<string[], void>('GET', 'api/expense/get');
		return data;
	},
);

export const downloadExpense = createAsyncThunk<void, void>(
	GET_DOWNLOADED_EXPENSE_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<void, void>('GET', 'api/expense/downloadExcel');
		return data;
	},
);
//#endregion GET

//#region POST
export const addExpense = createAsyncThunk<void, void>(CREATE_EXPENSE_THUNK_ID, async () => {
	const { data } = await buildAxiosCall<void, void>('POST', 'api/expense/add');
	return data;
});
//#endregion POST

//#region PUT

//#endregion PUT

//#region DELETE
export const deleteExpense = createAsyncThunk<void, Guid>(
	DELETE_EXPENSE_THUNK_ID,
	async (expenseId) => {
		const { data } = await buildAxiosCall<void, Guid>('DELETE', `api/expense/${expenseId}`);
		return data;
	},
);
//#endregion DELETE
