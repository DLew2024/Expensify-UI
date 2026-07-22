import { useState } from 'react';
import type { CreateAccountDTO } from '../../api/GeneratedDTOs';
import type { Guid } from '../../utils/DataTypes/Guid';
import { EMPTY_ACCOUNT } from '../../utils/EmptyObjects/EMPTY_ACCOUNT';
import { AppliedCheckbox } from '../common/AppliedCheckbox';
import CardButton from '../common/CardButton';
import Selector from '../common/Selector';
import EmojiPickerPopup from '../EmojiPickerPopup';
import LabeledInput from '../Inputs/LabeledInput';
import styles from './styles/_AddAccountForm.module.scss';

interface Currency {
	name: string;
	currencyCode: string;
}

interface AccountTypeOption {
	id: Guid;
	name: string;
}
interface AddAccountFormProps {
	onAddAccount: (account: CreateAccountDTO) => void;
}

const AddAccountForm = ({ onAddAccount }: AddAccountFormProps) => {
	const [account, setAccount] = useState<CreateAccountDTO>(EMPTY_ACCOUNT);
	const [isShownInNetWorth, setIsShownInNetWorth] = useState<boolean>(false);

	const CURRENCIES: Currency[] = [
		{ name: 'US Dollar', currencyCode: '0' },
		{ name: 'Euro', currencyCode: '1' },
		{ name: 'British Pound', currencyCode: '2' },
		{ name: 'Canadian Dollar', currencyCode: '3' },
	];

	const accountTypes: AccountTypeOption[] = [
		{ id: '6f8332b7-cf15-4c41-b1b5-a85022859dd8' as Guid, name: 'Checking' },
	];

	const handleChange = <K extends keyof CreateAccountDTO>(key: K, value: CreateAccountDTO[K]) => {
		setAccount((prevAccount) => ({
			...prevAccount,
			[key]: value,
		}));
	};

	const handleAddAccount = () => {
		onAddAccount({
			...account,
		});
	};

	return (
		<div className={styles.addAccountForm}>
			<AppliedCheckbox
				aria-label={'Should be included in net worth'}
				checked={isShownInNetWorth}
				label={'Should be included in net worth'}
				onChange={(event, checked) => {
					event.stopPropagation();
					setIsShownInNetWorth(checked);
				}}
				tabIndex={0}
			/>

			<EmojiPickerPopup
				icon={account.icon}
				onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
			/>

			<Selector<AccountTypeOption>
				items={accountTypes}
				selectedValue={account.accountTypeId}
				label="Account Type"
				placeholder="Select Account Type"
				getValue={(accountType) => accountType.id}
				getLabel={(accountType) => accountType.name}
				onChange={(accountType) => {
					if (accountType) {
						handleChange('accountTypeId', accountType.id);
					}
				}}
			/>
			<Selector<Currency>
				items={CURRENCIES}
				selectedValue={String(account.currencyCode)}
				label="Currency"
				placeholder="Select Currency"
				getValue={(currency) => currency.currencyCode}
				getLabel={(currency) => `${currency.currencyCode} - ${currency.name}`}
				onChange={(currency) => {
					handleChange('currencyCode', Number(currency?.currencyCode) ?? '');
				}}
			/>

			<LabeledInput
				value={account.name ?? ''}
				onChange={(name) => handleChange('name', name)}
				label="Name of Account"
				type="text"
			/>

			<LabeledInput
				value={account.institutionName ?? ''}
				onChange={(institutionName) => handleChange('institutionName', institutionName)}
				label="Name of Institution"
				type="text"
			/>

			<LabeledInput
				value={account.lastFourDigits ?? ''}
				onChange={(lastFourDigits) => handleChange('lastFourDigits', lastFourDigits)}
				label="Last Four Digits"
				type="text"
			/>

			<LabeledInput
				value={String(account.initialBalance ?? 0)}
				onChange={(initialBalance) => handleChange('initialBalance', Number(initialBalance))}
				label="Initial Balance"
				type="number"
			/>

			<LabeledInput
				value={account.notes ?? ''}
				onChange={(notes) => handleChange('notes', notes)}
				label="Notes"
				type="text"
			/>

			<div className={styles.addAccountForm__actions}>
				<CardButton onClick={handleAddAccount}>Add Account</CardButton>
			</div>
		</div>
	);
};

export default AddAccountForm;
