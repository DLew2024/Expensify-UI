import type { AddExpenseTransactionDTO, AddIncomeTransactionDTO } from '../../../api/GeneratedDTOs';
import { EMPTY_GUID } from '../Guid';

export const EMPTY_INCOME_TRANSACTION: AddIncomeTransactionDTO = {
	accountId: EMPTY_GUID,
	amount: 0,
	transactionDate: 0,
	description: '',
	source: '',
	icon: '',
};

export const EMPTY_EXPENSE_TRANSACTION: AddExpenseTransactionDTO = {
	accountId: EMPTY_GUID,
	amount: 0,
	transactionDate: 0,
	description: '',
	source: '',
	isRecurring: false,
	tags: [],
	icon: '',
};
