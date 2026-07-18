import { useState } from 'react';
import FillButton from '../common/FillButton';
import EmojiPickerPopup from '../EmojiPickerPopup';
import LabeledInput from '../Inputs/LabeledInput';

const AddExpenseForm = ({ onAddExpense }) => {
	const [expense, setExpense] = useState({
		category: '',
		amount: '',
		date: '',
		icon: '',
	});

	const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

	return (
		<div>
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
				value={expense.amount}
				onChange={(amount) => handleChange('amount', amount)}
				label="Category"
				type="number"
			/>

			<LabeledInput
				value={expense.date}
				onChange={(date) => handleChange('date', date)}
				label="Category"
				placeholder="Rent Groceries"
				type="date"
			/>

			<div className="flex justify-end mt-6">
				<FillButton onClick={() => onAddExpense(expense)}>Add Income</FillButton>
			</div>
		</div>
	);
};

export default AddExpenseForm;
