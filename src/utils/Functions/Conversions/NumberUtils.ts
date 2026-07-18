import moment from 'moment';
import { THOUSANDS_SEPARATOR_REGEX } from '../../Regex/RegexUtils';

export interface ExpenseBarChartDataItem {
	category: string;
	amount: number;
}

export interface IncomeTransactionDTO {
	id: string;
	source: string;
	amount: number;
	date: string;
	icon?: string;
}

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
	data: ExpenseBarChartDataItem[] = [],
): ExpenseBarChartDataItem[] => {
	return data.map((item) => ({
		category: item.category,
		amount: item.amount,
	}));
};

export const prepareIncomeBarChartData = (
	data: IncomeTransactionDTO[] = [],
): IncomeBarChartDataItem[] => {
	const sortedData = [...data].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	);

	return sortedData.map((item) => ({
		month: moment(item.date).format('Do MMM'),
		amount: item.amount,
		source: item.source,
	}));
};

export const prepareExpenseLineChartData = (data: any[] = []) => {
	const sortedData = [...data].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	);

	return sortedData.map((item) => ({
		month: moment(item.date).format('Do MMM'),
		amount: item?.amount,
		category: item?.category,
	}));
};
