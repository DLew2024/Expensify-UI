import { useState } from 'react';
import type { AddExpenseTransactionDTO } from '../../api/GeneratedDTOs';
import FillButton from '../common/FillButton';
import EmojiPickerPopup from '../EmojiPickerPopup';
import LabeledInput from '../Inputs/LabeledInput';
import styles from './styles/_AddExpenseForm.module.scss';

interface AddExpenseFormProps {
	onAddExpense: (expense: AddExpenseTransactionDTO) => void;
}

const emptyExpenseTransaction: AddExpenseTransactionDTO = {
	icon: '',
	category: '',
	amount: 0,
	date: 0,
};

const AddExpenseForm = ({ onAddExpense }: AddExpenseFormProps) => {
	const [expense, setExpense] = useState<AddExpenseTransactionDTO>(emptyExpenseTransaction);

	const handleChange = <K extends keyof AddExpenseTransactionDTO>(
		key: K,
		value: AddExpenseTransactionDTO[K],
	) => {
		setExpense((prevExpense) => ({
			...prevExpense,
			[key]: value,
		}));
	};

	return (
		<div className={styles.addExpenseForm}>
			<EmojiPickerPopup
				icon={expense.icon}
				onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
			/>

			<LabeledInput
				value={expense.category}
				onChange={(category) => handleChange('category', category)}
				label="Category"
				placeholder="Rent, Groceries, etc"
			/>

			<LabeledInput
				value={String(expense.amount ?? '')}
				onChange={(amount) => handleChange('amount', Number(amount))}
				label="Amount"
				type="number"
			/>

			<LabeledInput
				value={String(expense.date ?? '')}
				onChange={(date) => handleChange('date', Number(date))}
				label="Date"
				type="date"
			/>

			<div className={styles.addExpenseForm__actions}>
				<FillButton onClick={() => onAddExpense(expense)}>Add Expense</FillButton>
			</div>
		</div>
	);
};

export default AddExpenseForm;
