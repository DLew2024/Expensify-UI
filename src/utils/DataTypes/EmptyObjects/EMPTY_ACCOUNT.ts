import type { CreateAccountDTO } from '../../../api/GeneratedDTOs';
import { EMPTY_GUID } from '../Guid';

export const EMPTY_ACCOUNT: CreateAccountDTO = {
	name: '',
	accountTypeId: EMPTY_GUID,
	institutionName: '',
	lastFourDigits: '',
	currencyCode: 0,
	initialBalance: 0,
	includeInNetWorth: true,
	notes: '',
	icon: '',
};
