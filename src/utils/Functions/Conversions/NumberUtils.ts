import moment from 'moment';
import type { TransactionDTO } from '../../../api/GeneratedDTOs';
import type {
	ExpenseBarChartDataItem,
	ExpenseChartData,
	IncomeBarChartData,
} from '../../../components/Dashboard/types/DashboardTypes';
import { THOUSANDS_SEPARATOR_REGEX } from '../../Regex/RegexUtils';

export interface IncomeBarChartDataItem {
	month: string;
	amount: number;
	source: string;
}

export const isNotFiniteNumber = (value: unknown): boolean => {
	return typeof value !== 'number' || !Number.isFinite(value);
};

export const isFiniteNumber = (value: unknown): value is number => {
	return typeof value === 'number' && Number.isFinite(value);
};

export const addThousandsSeparator = (num: number): string => {
	if (num == null || Number.isNaN(num)) {
		return '';
	}

	const [integerPart, fractionalPart] = num.toString().split('.');

	const formattedInteger = integerPart.replace(THOUSANDS_SEPARATOR_REGEX, ',');

	return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

export const prepareExpenseBarChartData = (
	data: TransactionDTO[] = [],
): ExpenseBarChartDataItem[] => {
	return data.map((item) => ({
		categoryName: item.category.name,
		amount: item.amount,
	}));
};

export const prepareIncomeBarChartData = (data: TransactionDTO[] = []): IncomeBarChartData => {
	const sortedData = [...data].sort(
		(a, b) => Number(a.transactionDate ?? 0) - Number(b.transactionDate ?? 0),
	);

	return sortedData.map((transactionDate) => ({
		date: moment(transactionDate.transactionDate).format('Do MMM'),
		amount: transactionDate.amount,
		merchant: transactionDate.merchant,
	}));
};

export const prepareExpenseLineChartData = (data: TransactionDTO[] = []): ExpenseChartData => {
	const sortedData = [...data].sort(
		(a, b) => Number(a.transactionDate ?? 0) - Number(b.transactionDate ?? 0),
	);

	return sortedData.map((transaction) => ({
		date: moment(Number(transaction.transactionDate)).format('Do MMM'),
		amount: Number(transaction.amount ?? 0),
		categoryId: transaction.category.id,
	}));
};
