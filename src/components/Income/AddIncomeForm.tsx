import moment from 'moment';
import { useState } from 'react';
import { v4 } from 'uuid';
import type { AddIncomeTransactionDTO } from '../../api/GeneratedDTOs';
import type { Guid } from '../../utils/DataTypes/Guid';
import CardButton from '../common/CardButton';
import EmojiPickerPopup from '../EmojiPickerPopup';
import LabeledInput from '../Inputs/LabeledInput';
import styles from './styles/_AddIncomeForm.module.scss';

interface AddIncomeFormProps {
	onAddIncome: (income: AddIncomeTransactionDTO) => void;
}

const emptyIncomeTransaction: AddIncomeTransactionDTO = {
	source: '',
	amount: 0,
	transactionDate: 0,
	icon: '',
	accountId: v4() as Guid, // must add a account id
	description: 'TEst',
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
				value={
					income.transactionDate ? moment.unix(income.transactionDate).format('YYYY-MM-DD') : ''
				}
				onChange={(transactionDate) =>
					handleChange('transactionDate', moment(transactionDate).unix())
				}
				label="Date"
				type="date"
			/>

			<div className={styles.addIncomeForm__actions}>
				<CardButton onClick={() => onAddIncome(income)}>Add Income</CardButton>
			</div>
		</div>
	);
};

export default AddIncomeForm;
