// import type { Dayjs } from 'dayjs';
// import dayjs from 'dayjs';
// import { type FormEvent, useState } from 'react';
// import { EMPTY_EXPENSE, type Expense } from '../utils/DataTypes/ExpenseTypes';
// import { createNewGuid, EMPTY_GUID } from '../utils/DataTypes/Guid';
// import { dayjsToEpochSecondsSafeOrNowEpochSeconds } from '../utils/Functions/Conversions/DateUtils';
// import { AMOUNT_REGEX } from '../utils/Regex/RegexUtils';
// import { DateCalendar } from './DateCalendar';
// import styles from './styles/_ExpenseForm.module.scss';

// type ExpenseFormProps = {
// 	expense?: Expense;
// 	onSubmitForm: (data: Expense) => void;
// };

// const ExpenseForm = ({ expense = EMPTY_EXPENSE, onSubmitForm }: ExpenseFormProps) => {
// 	const { id, description, amount, createdAt, note } = expense;

// 	const idToSubmit = id === EMPTY_GUID ? createNewGuid() : id;
// 	const [descriptionText, setDescriptionText] = useState<string>(description);
// 	const [amountValue, setAmountValue] = useState<string>(amount.toString());
// 	const [date, setDate] = useState<Dayjs | null>(dayjs.unix(createdAt));
// 	const [noteText, setNoteText] = useState<string>(note);
// 	const [error, setError] = useState<string>('');

// 	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();

// 		if (!descriptionText || !amountValue) {
// 			setError('Please provide description and amount');
// 			console.error('Error: Please provide description and amount');
// 		} else {
// 			setError('');

// 			onSubmitForm({
// 				id: idToSubmit,
// 				createdAt: dayjsToEpochSecondsSafeOrNowEpochSeconds(date),
// 				description: descriptionText,
// 				note: noteText,
// 				amount: parseFloat(amountValue),
// 			});
// 		}
// 	};

// 	return (
// 		<form className="form" onSubmit={onSubmit}>
// 			{error && <p className="formError">{error}</p>}
// 			<input
// 				type="text"
// 				placeholder="Description"
// 				className={styles.text_input}
// 				value={descriptionText}
// 				onChange={(e) => setDescriptionText(e.target.value)}
// 			/>
// 			<input
// 				type="number"
// 				inputMode="decimal"
// 				placeholder="Amount"
// 				className="text_input"
// 				value={amountValue}
// 				onChange={(e) => {
// 					const amount = e.target.value;
// 					if (amount === '' || AMOUNT_REGEX.test(amount)) setAmountValue(amount);
// 				}}
// 			/>

// 			<DateCalendar value={date} onChange={setDate} />

// 			<textarea
// 				name=""
// 				id=""
// 				className="text_area"
// 				placeholder="Add note for your expense (optional)"
// 				value={noteText}
// 				onChange={(e) => setNoteText(e.target.value)}
// 			/>

// 			<div>
// 				<button className="button" type="submit">
// 					Save Expense
// 				</button>
// 			</div>
// 		</form>
// 	);
// };

// export default ExpenseForm;
