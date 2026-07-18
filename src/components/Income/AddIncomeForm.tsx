import { useState } from 'react';
import FillButton from '../common/FillButton';
import EmojiPickerPopup from '../EmojiPickerPopup';
import LabeledInput from '../Inputs/LabeledInput';

const AddIncomeForm = ({ onAddIncome }) => {
	const [income, setIncome] = useState({
		source: '',
		amount: '',
		date: '',
		icon: '',
	});

	const handleChange = (key, value) => setIncome({ ...income, [key]: value });

	return (
		<div>
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
				value={income.amount}
				onChange={(amount) => handleChange('amount', amount)}
				label="Amount"
				placeholder=""
				type="number"
			/>

			<LabeledInput
				value={income.date}
				onChange={(date) => handleChange('date', date)}
				label="Date"
				placeholder=""
				type="date"
			/>

			<div className="flex justify-end mt-6">
				<FillButton onClick={() => onAddIncome(income)}>Add Income</FillButton>
			</div>
		</div>
	);
};

export default AddIncomeForm;
