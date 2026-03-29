import type { Expense } from '../../../utils/DataTypes/ExpenseTypes';
import ExpenseListItem from './ExpenseListItem';

type ExpenseListProps = {
	expenses: Expense[];
};

const ExpenseList = ({ expenses }: ExpenseListProps) => {
	const isMobile = true;

	return (
		<div className="content_container">
			<div className="list_headers">
				<div className={isMobile && 'showForMobile'}>Expenses</div>
				<div className={isMobile && 'showForDesktop'}>Expense</div>
				<div className={isMobile && 'showForDesktop'}>Amount</div>
			</div>
			<div className="list_body">
				{expenses.length === 0 ? (
					<p>No Expenses</p>
				) : (
					expenses.map((expense) => {
						return <ExpenseListItem key={expense.id} {...expense} />;
					})
				)}
			</div>
		</div>
	);
};

export default ExpenseList;
