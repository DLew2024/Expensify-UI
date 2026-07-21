import moment from 'moment';
import type { TransactionDTO } from '../../../api/GeneratedDTOs';
import type {
	CustomBarChartData,
	CustomLineChartData,
} from '../../../components/Charts/utils/CustomComponentTypes';
import { THOUSANDS_SEPARATOR_REGEX } from '../../Regex/RegexUtils';

export const formatEpochSeconds = (epochSeconds: number, format: string = 'Do MMM'): string => {
	return moment.unix(epochSeconds).format(format);
};

export const addThousandsSeparator = (num: number): string => {
	if (num == null || Number.isNaN(num)) {
		return '';
	}

	const [integerPart, fractionalPart] = num.toString().split('.');

	const formattedInteger = integerPart.replace(THOUSANDS_SEPARATOR_REGEX, ',');

	return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

export const prepareExpenseBarChartData = (data: TransactionDTO[] = []): CustomBarChartData[] => {
	return data.map((item) => ({
		categoryName: item.category.name ?? 'Undefined',
		amount: item.amount,
		month: formatEpochSeconds(Number(item.transactionDate)),
	}));
};

export const prepareIncomeBarChartData = (data: TransactionDTO[] = []): CustomBarChartData[] => {
	const sortedData = [...data].sort(
		(a, b) => Number(a.transactionDate ?? 0) - Number(b.transactionDate ?? 0),
	);

	return sortedData.map((transaction) => {
		return {
			categoryName: transaction.merchant ?? 'Undefined',
			amount: transaction.amount,
			month: formatEpochSeconds(Number(transaction.transactionDate)),
		};
	});
};

export const prepareExpenseLineChartData = (data: TransactionDTO[] = []): CustomLineChartData[] => {
	const sortedData = [...data].sort(
		(a, b) => Number(a.transactionDate ?? 0) - Number(b.transactionDate ?? 0),
	);

	return sortedData.map((transaction) => ({
		categoryId: transaction.category.id,
		amount: Number(transaction.amount ?? 0),
		date: formatEpochSeconds(Number(transaction.transactionDate)),
	}));
};
