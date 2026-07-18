import { THOUSANDS_SEPARATOR_REGEX } from '../../Regex/RegexUtils';

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

export interface ExpenseBarChartDataItem {
	category: string;
	amount: number;
}

export const prepareExpenseBarChartData = (
	data: ExpenseBarChartDataItem[] = [],
): ExpenseBarChartDataItem[] => {
	return data.map((item) => ({
		category: item.category,
		amount: item.amount,
	}));
};
