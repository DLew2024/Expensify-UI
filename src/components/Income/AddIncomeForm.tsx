import { useState } from 'react';
import type { AddIncomeTransactionDTO } from '../../api/GeneratedDTOs';
import FillButton from '../common/FillButton';
import type { IncomeProperties } from '../Dashboard/types/DashboardTypes';
import EmojiPickerPopup from '../EmojiPickerPopup';
import LabeledInput from '../Inputs/LabeledInput';

interface AddIncomeFormProps {
	onAddIncome: (expense: AddIncomeTransactionDTO) => void;
}

const emptyIncomeTransaction: AddIncomeTransactionDTO = {
	description: '',
	source: '',
};

const AddIncomeForm = ({ onAddIncome }: AddIncomeFormProps) => {
	const [income, setIncome] = useState<AddIncomeTransactionDTO>(emptyIncomeTransaction);

	const handleChange = <K extends keyof IncomeProperties>(key: K, value: IncomeProperties[K]) => {
		setIncome({ ...income, [key]: value });
	};

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
				value={String(income.amount)}
				onChange={(amount) => handleChange('amount', amount)}
				label="Amount"
				placeholder=""
				type="number"
			/>

			<LabeledInput
				value={String(income.transactionDate)}
				onChange={(transactionDate) => handleChange('date', transactionDate)}
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
