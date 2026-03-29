import numeral from 'numeral';
import { Link } from 'react-router';
import styles from './styles/_ExpenseSummary.module.scss';

type ExpenseSummaryProps = {
	expenseCount: number;
	expensesTotal: number;
};

const ExpenseSummary = ({ expenseCount, expensesTotal }: ExpenseSummaryProps) => {
	const expenseWord = expenseCount === 1 ? 'Expense' : 'Expenses';
	const formattedExpenseTotal = numeral(expensesTotal / 100).format('$0,0.00');

	return (
		<div className={styles.page_header}>
			<div className={styles.content_container}>
				<h1 className={styles.page_header__title}>
					Viewing <span>{expenseCount}</span>
					{expenseWord} totalling <span>{formattedExpenseTotal}</span>
				</h1>
				<div>
					<Link className="button" to="/create">
						Add Expense
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ExpenseSummary;
