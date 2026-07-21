import { useState } from 'react';
import type { CreateAccountDTO } from '../../api/GeneratedDTOs';
import { EMPTY_GUID } from '../../utils/DataTypes/Guid';
import CardButton from '../common/CardButton';
import EmojiPickerPopup from '../EmojiPickerPopup';
import LabeledInput from '../Inputs/LabeledInput';

interface AddAccountFormProps {
	onAddAccount: (account: CreateAccountDTO) => void;
}

export const AddAccountForm = ({ onAddAccount }: AddAccountFormProps) => {
	// Create EMPTY FILE
	const [account, setAccount] = useState<CreateAccountDTO>({
		name: '',
		accountTypeId: EMPTY_GUID,
		institutionName: '',
		lastFourDigits: '',
		currencyCode: 0,
		initialBalance: 0,
		includeInNetWorth: true,
		notes: '',
		icon: '',
	});

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
		<div>
			<EmojiPickerPopup
				icon={account.icon}
				onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
			/>

			{'Will Need to be a drop down'}
			{/* <LabeledInput
				value={account.accountTypeId}
				onChange={(source) => handleChange('source', source)}
				label="Account Type"
				placeholder="Checking, Savings, etc"
			/> */}

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

			{'Will Need to be a drop down'}
			{/* <LabeledInput
				value={account.currencyCode}
				onChange={(currencyCode) => handleChange('currencyCode', currencyCode)}
				label="Account Type"
				placeholder="Type of currency"
			/> */}

			<LabeledInput
				value={String(account.initialBalance ?? 0)}
				onChange={(initialBalance) => handleChange('initialBalance', Number(initialBalance))}
				label="Amount"
				type="number"
			/>

			{'Checkbox'}
			{/* <LabeledInput
				value={checked}
				onChange={(includeInNetWorth) => handleChange('initialBalance', includeInNetWorth)}
				label="Include in Net Worth"
			/> */}

			<LabeledInput
				value={account.notes ?? ''}
				onChange={(notes) => handleChange('lastFourDigits', notes)}
				label="Notes"
				type="text"
			/>

			<div>
				<CardButton onClick={handleAddAccount}>Add Account</CardButton>
			</div>
		</div>
	);
};
