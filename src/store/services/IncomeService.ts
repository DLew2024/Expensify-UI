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
} from '../../models/Constants/ThunkIds/IncomeThunkIds';
import type { Guid } from '../../utils/DataTypes/Guid';
import { buildAxiosCall } from '../api/buildAxiosCall';
import { createMutationThunk } from '../api/createMutationThunk';

//#region GET
export const getAllIncome = createAsyncThunk<TransactionDTO[], Guid | null>(
	GET_ALL_INCOME_THUNK_ID,
	async (currentlySelectedAccountId) => {
		const url = currentlySelectedAccountId
			? `api/income/getAll?accountId=${currentlySelectedAccountId}`
			: 'api/income/getAll';

		const { data } = await buildAxiosCall<TransactionDTO[], void>('GET', url);

		return data;
	},
);
export const downloadIncome = createAsyncThunk<Blob, void>(
	GET_DOWNLOADED_INCOME_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<Blob, void>(
			'GET',
			'api/income/downloadExcel',
			undefined,
			{
				responseType: 'blob',
			},
		);

		return data;
	},
);
//#endregion GET

//#region POST
export const addIncome = createMutationThunk<IncomeTransactionResponseDTO, AddIncomeTransactionDTO>(
	CREATE_INCOME_THUNK_ID,
	async (income, { thunkId }) => {
		const { data } = await buildAxiosCall<IncomeTransactionResponseDTO, AddIncomeTransactionDTO>(
			'POST',
			'api/income/add',
			income,
			{ thunkId },
		);

		return data;
	},
);
//#endregion POST

//#region PUT

//#endregion PUT

//#region DELETE
export const deleteIncome = createMutationThunk<void, Guid>(
	DELETE_INCOME_THUNK_ID,
	async (incomeId, { thunkId }) => {
		const { data } = await buildAxiosCall<void, Guid>(
			'DELETE',
			`api/income/${incomeId}`,
			undefined,
			{ thunkId },
		);

		return data;
	},
);
//#endregion DELETE
