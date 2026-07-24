import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAccounts } from './AccountService';
import {
	getAccountTypes,
	getCategories,
	getCurrencies,
	getPaymentMethods,
} from './ReferenceDataService';

export const initializeApplicationData = createAsyncThunk<void, void>(
	'application/initialize',
	async (_, { dispatch }) => {
		await Promise.all([
			dispatch(getUserAccounts()).unwrap(),
			dispatch(getCurrencies()).unwrap(),
			dispatch(getAccountTypes()).unwrap(),
			dispatch(getPaymentMethods()).unwrap(),
			dispatch(getCategories()).unwrap(),
		]);
	},
);
