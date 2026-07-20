import moment from 'moment';
import type { TransactionDTO } from '../../../api/GeneratedDTOs';
import type {
	CustomBarChartData,
	CustomLineChartData,
} from '../../../components/Charts/utils/CustomComponentTypes';
import { THOUSANDS_SEPARATOR_REGEX } from '../../Regex/RegexUtils';

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
		month: moment(item.transactionDate).format('Do MMM'),
	}));
};

export const prepareIncomeBarChartData = (data: TransactionDTO[] = []): CustomBarChartData[] => {
	const sortedData = [...data].sort(
		(a, b) => Number(a.transactionDate ?? 0) - Number(b.transactionDate ?? 0),
	);

	return sortedData.map((transactionDate) => ({
		categoryName: transactionDate.merchant ?? 'Undefined',
		amount: transactionDate.amount,
		month: moment(transactionDate.transactionDate).format('Do MMM'),
	}));
};

export const prepareExpenseLineChartData = (data: TransactionDTO[] = []): CustomLineChartData[] => {
	const sortedData = [...data].sort(
		(a, b) => Number(a.transactionDate ?? 0) - Number(b.transactionDate ?? 0),
	);

	return sortedData.map((transaction) => ({
		categoryId: transaction.category.id,
		amount: Number(transaction.amount ?? 0),
		date: moment(Number(transaction.transactionDate)).format('Do MMM'),
	}));
};
