import type { TransactionDTO } from '../../../api/GeneratedDTOs';
import type {
	CustomBarChartData,
	CustomLineChartData,
} from '../../../components/Charts/utils/CustomComponentTypes';
import { THOUSANDS_SEPARATOR_REGEX } from '../../Regex/RegexUtils';
import { formatEpochSeconds } from './DateUtils';

export const addThousandsSeparator = (num: number): string => {
	if (num == null || Number.isNaN(num)) {
		return '';
	}

	const [integerPart, fractionalPart] = num.toString().split('.');

	const formattedInteger = integerPart.replace(THOUSANDS_SEPARATOR_REGEX, ',');

	return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

export const prepareExpenseBarChartData = (data: TransactionDTO[] = []): CustomBarChartData[] => {
	return data.map((transaction) => ({
		id: transaction.id,
		sourceName: transaction.merchant ?? '',
		amount: transaction.amount,
		date: formatEpochSeconds(Number(transaction.transactionDate)),
	}));
};

export const prepareIncomeBarChartData = (data: TransactionDTO[] = []): CustomBarChartData[] => {
	const sortedData = [...data].sort(
		(a, b) => Number(a.transactionDate ?? 0) - Number(b.transactionDate ?? 0),
	);

	return sortedData.map((transaction) => {
		return {
			categoryName: transaction.merchant ?? 'Undefined',
			sourceName: transaction.merchant ?? '',
			amount: transaction.amount,
			date: formatEpochSeconds(Number(transaction.transactionDate)),
		};
	});
};

export const prepareExpenseLineChartData = (data: TransactionDTO[] = []): CustomLineChartData[] => {
	const sortedData = [...data].sort(
		(a, b) => Number(a.transactionDate ?? 0) - Number(b.transactionDate ?? 0),
	);

	return sortedData.map((transaction) => ({
		categoryId: transaction.id,
		amount: Number(transaction.amount ?? 0),
		date: formatEpochSeconds(Number(transaction.transactionDate)),
	}));
};
