import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
	AddIncomeTransactionDTO,
	IncomeTransactionResponseDTO,
	TransactionDTO,
} from '../../api/GeneratedDTOs';
import {
	CREATE_INCOME_THUNK_ID,
	DELETE_INCOME_THUNK_ID,
	GET_ALL_INCOME_THUNK_ID,
	GET_DOWNLOADED_INCOME_THUNK_ID,
} from '../../models/Constants/ThunkIds/Income';
import type { Guid } from '../../utils/DataTypes/Guid';
import { buildAxiosCall } from '../services';

//#region GET
export const getAllIncome = createAsyncThunk<TransactionDTO[], void>(
	GET_ALL_INCOME_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<TransactionDTO[], void>('GET', 'api/income/get');
		return data;
	},
);

export const downloadIncome = createAsyncThunk<Blob, void>(
	GET_DOWNLOADED_INCOME_THUNK_ID,
	async () => {
		const response = await buildAxiosCall<Blob, void>(
			'GET',
			'api/income/downloadExcel',
			undefined,
			{
				responseType: 'blob',
			},
		);

		return response.data;
	},
);
//#endregion GET

//#region POST
export const addIncome = createAsyncThunk<AddIncomeTransactionDTO, IncomeTransactionResponseDTO>(
	CREATE_INCOME_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<AddIncomeTransactionDTO, IncomeTransactionResponseDTO>(
			'POST',
			'api/income/add',
		);
		return data;
	},
);
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
