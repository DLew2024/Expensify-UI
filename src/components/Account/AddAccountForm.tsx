import { useState } from 'react';
import type { CreateAccountDTO } from '../../api/GeneratedDTOs';
import { EMPTY_ACCOUNT } from '../../utils/DataTypes/EmptyObjects/EMPTY_ACCOUNT';
import { AppliedCheckbox } from '../common/AppliedCheckbox';
import CardButton from '../common/CardButton';
import EmojiPickerPopup from '../EmojiPickerPopup';
import LabeledInput from '../Inputs/LabeledInput';
import AccountTypeSelector from '../Selectors/AccountTypeSelector';
import CurrencySelector from '../Selectors/CurrencySelector';
import styles from './styles/_AddAccountForm.module.scss';

interface AddAccountFormProps {
	onAddAccount: (account: CreateAccountDTO) => void;
}

const AddAccountForm = ({ onAddAccount }: AddAccountFormProps) => {
	const [account, setAccount] = useState<CreateAccountDTO>(EMPTY_ACCOUNT);
	const [isShownInNetWorth, setIsShownInNetWorth] = useState<boolean>(false);

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

			<AccountTypeSelector
				selectedAccountTypeId={account.accountTypeId}
				onChange={(accountTypeId) => {
					handleChange('accountTypeId', accountTypeId);
				}}
			/>

			<CurrencySelector
				selectedCurrencyId={account.currencyCodeId}
				onChange={(currencyCodeId) => {
					handleChange('currencyCodeId', currencyCodeId);
				}}
			/>

			<LabeledInput
				value={account.name ?? ''}
				onChange={(name) => handleChange('name', name)}
				label='Name of Account'
				type='text'
			/>

			<LabeledInput
				value={account.institutionName ?? ''}
				onChange={(institutionName) => handleChange('institutionName', institutionName)}
				label='Name of Institution'
				type='text'
			/>

			<LabeledInput
				value={account.lastFourDigits ?? ''}
				onChange={(lastFourDigits) => handleChange('lastFourDigits', lastFourDigits)}
				label='Last Four Digits'
				type='text'
			/>

			<LabeledInput
				value={String(account.initialBalance ?? 0)}
				onChange={(initialBalance) => handleChange('initialBalance', Number(initialBalance))}
				label='Initial Balance'
				type='number'
			/>

			<LabeledInput
				value={account.notes ?? ''}
				onChange={(notes) => handleChange('notes', notes)}
				label='Notes'
				type='text'
			/>

			<div className={styles.addAccountForm__actions}>
				<CardButton onClick={handleAddAccount}>Add Account</CardButton>
			</div>
		</div>
	);
};

export default AddAccountForm;
