import { useState } from 'react';
import type { AddIncomeTransactionDTO } from '../../api/GeneratedDTOs';
import FillButton from '../common/FillButton';
import EmojiPickerPopup from '../EmojiPickerPopup';
import LabeledInput from '../Inputs/LabeledInput';
import styles from './styles/_AddIncomeForm.module.scss';

interface AddIncomeFormProps {
	onAddIncome: (income: AddIncomeTransactionDTO) => void;
}

const emptyIncomeTransaction: AddIncomeTransactionDTO = {
	description: '',
	source: '',
	amount: 0,
	transactionDate: 0,
	icon: '',
};

const AddIncomeForm = ({ onAddIncome }: AddIncomeFormProps) => {
	const [income, setIncome] = useState<AddIncomeTransactionDTO>(emptyIncomeTransaction);

	const handleChange = <K extends keyof AddIncomeTransactionDTO>(
		key: K,
		value: AddIncomeTransactionDTO[K],
	) => {
		setIncome((prevIncome) => ({
			...prevIncome,
			[key]: value,
		}));
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
				value={income.transactionDate ? String(income.transactionDate) : ''}
				onChange={(transactionDate) => handleChange('transactionDate', Number(transactionDate))}
				label="Date"
				type="date"
			/>

			<div className={styles.addIncomeForm__actions}>
				<FillButton onClick={() => onAddIncome(income)}>Add Income</FillButton>
			</div>
		</div>
	);
};

export default AddIncomeForm;
