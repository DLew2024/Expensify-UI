import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import type { AddIncomeTransactionDTO } from '../../api/GeneratedDTOs';
import type { AppState } from '../../store/store';
import { EMPTY_INCOME_TRANSACTION } from '../../utils/DataTypes/EmptyObjects/EMPTY_TRANSACTIONS';
import {
	convertStringToEpochSeconds,
	formatEpochSeconds,
} from '../../utils/Functions/Conversions/DateUtils';
import CardButton from '../common/CardButton';
import EmojiPickerPopup from '../EmojiPickerPopup';
import LabeledInput from '../Inputs/LabeledInput';
import styles from './styles/_AddIncomeForm.module.scss';

interface AddIncomeFormProps {
	onAddIncome: (income: AddIncomeTransactionDTO) => void;
}

const AddIncomeForm = ({ onAddIncome }: AddIncomeFormProps) => {
	const $selectedAccountId = useSelector((state: AppState) => state.accounts.selectedAccountId);

	const [income, setIncome] = useState<AddIncomeTransactionDTO>(EMPTY_INCOME_TRANSACTION);

	const handleChange = <K extends keyof AddIncomeTransactionDTO>(
		key: K,
		value: AddIncomeTransactionDTO[K],
	) => {
		setIncome((prevIncome) => ({
			...prevIncome,
			[key]: value,
		}));
	};

	const handleAddIncome = () => {
		if (!$selectedAccountId) {
			toast.error('Please select an account');
			return;
		}

		onAddIncome({
			...income,
			accountId: $selectedAccountId,
		});
	};

	return (
		<div className={styles.addIncomeForm}>
			<EmojiPickerPopup
				icon={income.icon}
				onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
			/>

			<LabeledInput
				value={income.source}
				onChange={(source) => handleChange('source', source)}
				label="Income Source"
				placeholder="Freelance, Salary, etc"
			/>

			<LabeledInput
				value={String(income.amount ?? '')}
				onChange={(amount) => handleChange('amount', Number(amount))}
				label="Amount"
				type="number"
			/>

			<LabeledInput
				value={
					income.transactionDate ? formatEpochSeconds(income.transactionDate, 'YYYY-MM-DD') : ''
				}
				onChange={(transactionDate) =>
					handleChange('transactionDate', convertStringToEpochSeconds(transactionDate))
				}
				label="Date"
				type="date"
			/>

			<LabeledInput
				value={String(income.description ?? '')}
				onChange={(description) => handleChange('description', description)}
				label="Description"
				type="text"
			/>

			<div className={styles.addIncomeForm__actions}>
				<CardButton onClick={handleAddIncome}>Add Income</CardButton>
			</div>
		</div>
	);
};

export default AddIncomeForm;
