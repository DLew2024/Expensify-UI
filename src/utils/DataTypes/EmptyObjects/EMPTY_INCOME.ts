import type { AddIncomeTransactionDTO } from '../../../api/GeneratedDTOs';
import { EMPTY_GUID } from '../Guid';

export const EMPTY_INCOME: AddIncomeTransactionDTO = {
	icon: '',
	source: '',
	amount: 0,
	transactionDate: 0,
	description: '',
	accountId: EMPTY_GUID,
};
