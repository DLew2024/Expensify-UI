import { createSlice } from '@reduxjs/toolkit';
import type {
	AccountTypeDTO,
	CategoryDTO,
	CurrencyCodeDTO,
	PaymentMethodDTO,
} from '../../api/GeneratedDTOs';
import {
	getAccountTypes,
	getCategories,
	getCurrencies,
	getPaymentMethods,
} from '../services/ReferenceDataService';

type ReferenceDataStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface ReferenceDataState {
	currencies: CurrencyCodeDTO[];
	accountTypes: AccountTypeDTO[];
	paymentMethods: PaymentMethodDTO[];
	categories: CategoryDTO[];
	status: ReferenceDataStatus;
	error: string | null;
}

const initialState: ReferenceDataState = {
	currencies: [],
	accountTypes: [],
	paymentMethods: [],
	categories: [],
	status: 'idle',
	error: null,
};

const referenceDataSlice = createSlice({
	name: 'referenceData',
	initialState,
	reducers: {
		clearReferenceData: (state) => {
			state.currencies = [];
			state.accountTypes = [];
			state.paymentMethods = [];
			state.categories = [];
			state.status = 'idle';
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Currencies
			.addCase(getCurrencies.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getCurrencies.fulfilled, (state, action) => {
				state.currencies = action.payload;
				state.status = 'succeeded';
			})
			.addCase(getCurrencies.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? 'Failed to load currencies.';
			})

			// Account Types
			.addCase(getAccountTypes.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getAccountTypes.fulfilled, (state, action) => {
				state.accountTypes = action.payload;
				state.status = 'succeeded';
			})
			.addCase(getAccountTypes.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? 'Failed to load account types.';
			})

			// Payment Methods
			.addCase(getPaymentMethods.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getPaymentMethods.fulfilled, (state, action) => {
				state.paymentMethods = action.payload;
				state.status = 'succeeded';
			})
			.addCase(getPaymentMethods.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? 'Failed to load payment methods.';
			})

			// Categories
			.addCase(getCategories.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getCategories.fulfilled, (state, action) => {
				state.categories = action.payload;
				state.status = 'succeeded';
			})
			.addCase(getCategories.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? 'Failed to load categories.';
			});
	},
});

export const { clearReferenceData } = referenceDataSlice.actions;

export default referenceDataSlice.reducer;
