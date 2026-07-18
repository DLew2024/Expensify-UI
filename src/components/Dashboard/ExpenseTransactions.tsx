import moment from 'moment';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_ExpenseTransactions.module.scss';

interface TransactionResponseDTO {
	id: string;
	title?: string;
	category: string;
	source: string;
	icon: string;
	date: string | number;
	amount: number;
	type: 'income' | 'expense';
}

interface RecentTransactionsProps {
	transactions?: TransactionResponseDTO[];
	onSeeMore: () => void;
}

const ExpenseTransactions = ({ transactions, onSeeMore }: RecentTransactionsProps) => {
	return (
		<WrapperCard>
			<div className={styles.expensesCard__header}>
				<MainTextTypography variant="h5">Expenses</MainTextTypography>

				<button type="button" onClick={onSeeMore} className={styles.expensesCard__button}>
					See All
					<LuArrowRight className={styles.expensesCard__buttonIcon} />
				</button>
			</div>

			<div className={styles.expensesCard__list}>
				{transactions?.slice(0, 5).map((expense) => (
					<TransactionInfoCard
						key={expense.id}
						title={expense.category}
						icon={expense.icon}
						date={moment(expense.date).format('Do MMM YYYY')}
						amount={expense.amount}
						type="expense"
						hideDeleteBtn
					/>
				))}
			</div>
		</WrapperCard>
	);
};

export default ExpenseTransactions;
