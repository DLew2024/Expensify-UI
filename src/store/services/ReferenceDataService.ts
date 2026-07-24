//#region GET

import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
	AccountTypeDTO,
	CategoryDTO,
	CurrencyCodeDTO,
	PaymentMethodDTO,
} from '../../api/GeneratedDTOs';
import { buildAxiosCall } from '../api/buildAxiosCall';
import {
	GET_ACCOUNT_TYPES_THUNK_ID,
	GET_CATEGORIES_THUNK_ID,
	GET_CURRENCIES_THUNK_ID,
	GET_PAYMENT_METHODS_THUNK_ID,
} from '../constants/ThunkIds/ReferenceDataThunkIds';

export const getCurrencies = createAsyncThunk<CurrencyCodeDTO[], void>(
	GET_CURRENCIES_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<CurrencyCodeDTO[], void>(
			'GET',
			'api/reference-data/currencies',
		);

		return data;
	},
);

export const getAccountTypes = createAsyncThunk<AccountTypeDTO[], void>(
	GET_ACCOUNT_TYPES_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<AccountTypeDTO[], void>(
			'GET',
			'api/reference-data/account-types',
		);

		return data;
	},
);

export const getPaymentMethods = createAsyncThunk<PaymentMethodDTO[], void>(
	GET_PAYMENT_METHODS_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<PaymentMethodDTO[], void>(
			'GET',
			'api/reference-data/payment-methods',
		);

		return data;
	},
);

export const getCategories = createAsyncThunk<CategoryDTO[], void>(
	GET_CATEGORIES_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<CategoryDTO[], void>(
			'GET',
			'api/reference-data/categories',
		);

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
