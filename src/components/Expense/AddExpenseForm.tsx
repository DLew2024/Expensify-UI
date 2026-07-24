import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import type { AddExpenseTransactionDTO } from '../../api/GeneratedDTOs';
import type { AppState } from '../../store/store';
import { EMPTY_EXPENSE_TRANSACTION } from '../../utils/DataTypes/EmptyObjects/EMPTY_TRANSACTIONS';
import {
	convertStringToEpochSeconds,
	formatEpochSeconds,
} from '../../utils/Functions/Conversions/DateUtils';
import CardButton from '../common/CardButton';
import EmojiPickerPopup from '../EmojiPickerPopup';
import LabeledInput from '../Inputs/LabeledInput';
import styles from './styles/_AddExpenseForm.module.scss';

enum CurrencyCode {
	USD = 0,
}

interface AddExpenseFormProps {
	onAddExpense: (expense: AddExpenseTransactionDTO) => void;
}

const AddExpenseForm = ({ onAddExpense }: AddExpenseFormProps) => {
	const $selectedAccountId = useSelector((state: AppState) => state.accounts.selectedAccountId);

	const [expense, setExpense] = useState<AddExpenseTransactionDTO>(EMPTY_EXPENSE_TRANSACTION);

	const handleChange = <K extends keyof AddExpenseTransactionDTO>(
		key: K,
		value: AddExpenseTransactionDTO[K],
	) => {
		setExpense((prevExpense) => ({
			...prevExpense,
			[key]: value,
		}));
	};

	const handleAddExpense = () => {
		if (!$selectedAccountId) {
			toast.error('Please select an account');
			return;
		}

		onAddExpense({
			...expense,
			accountId: $selectedAccountId,
		});
	};

	return (
		<div className={styles.addExpenseForm}>
			<EmojiPickerPopup
				icon={expense.icon}
				onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
			/>

			<LabeledInput
				value={expense.source}
				onChange={(source) => handleChange('source', source)}
				label="Source"
				placeholder="Rent, Groceries, etc"
			/>

			<LabeledInput
				value={String(expense.amount ?? '')}
				onChange={(amount) => handleChange('amount', Number(amount))}
				label="Amount"
				type="number"
			/>

			<LabeledInput
				value={
					expense.transactionDate ? formatEpochSeconds(expense.transactionDate, 'YYYY-MM-DD') : ''
				}
				onChange={(transactionDate) =>
					handleChange('transactionDate', convertStringToEpochSeconds(transactionDate))
				}
				label="Date"
				type="date"
			/>

			<LabeledInput
				value={String(expense.description ?? '')}
				onChange={(description) => handleChange('description', description)}
				label="Description"
				type="text"
			/>

			<div className={styles.addExpenseForm__actions}>
				<CardButton onClick={handleAddExpense}>Add Expense</CardButton>
			</div>
		</div>
	);
};

export default AddExpenseForm;
