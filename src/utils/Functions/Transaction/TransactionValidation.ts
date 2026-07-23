import type { AddExpenseTransactionDTO, AddIncomeTransactionDTO } from '../../../api/GeneratedDTOs';
import { EMPTY_GUID } from '../../DataTypes/Guid';

interface BaseTransactionValidationFields {
	accountId: string;
	source: string;
	amount: number;
	description: string;
	transactionDate: number;
}

const validateBaseTransaction = (transaction: BaseTransactionValidationFields): string | null => {
	if (!transaction.accountId || transaction.accountId === EMPTY_GUID) {
		return 'Account is required.';
	}

	if (!Number.isFinite(transaction.amount) || transaction.amount <= 0) {
		return 'Amount should be a valid number greater than 0.';
	}

	if (!transaction.transactionDate) {
		return 'Date is required.';
	}

	if (!transaction.description.trim()) {
		return 'Description is required.';
	}

	if (!transaction.source.trim()) {
		return 'Source is required.';
	}

	return null;
};

export const validateIncome = (income: AddIncomeTransactionDTO): string | null => {
	const baseError = validateBaseTransaction(income);

	if (baseError) {
		return baseError;
	}

	// Add Income-specific validation here

	return null;
};

export const validateExpense = (expense: AddExpenseTransactionDTO): string | null => {
	const baseError = validateBaseTransaction(expense);

	if (baseError) {
		return baseError;
	}

	// Add Expense-specific validation here

	return null;
};
