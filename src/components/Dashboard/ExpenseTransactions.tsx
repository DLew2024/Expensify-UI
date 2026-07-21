import { LuArrowRight } from 'react-icons/lu';
import type { TransactionDTO } from '../../api/GeneratedDTOs';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import CardButton from '../common/CardButton';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_ExpenseTransactions.module.scss';
import { TransactionType } from './types/DashboardTypes';

interface RecentTransactionsProps {
	transactions?: TransactionDTO[];
	onSeeMore: () => void;
}

const ExpenseTransactions = ({ transactions, onSeeMore }: RecentTransactionsProps) => {
	return (
		<WrapperCard>
			<div className={styles.expensesCard__header}>
				<MainTextTypography variant="h5">Expenses</MainTextTypography>

				<CardButton onClick={onSeeMore}>
					See All
					<LuArrowRight className={styles.expensesCard__buttonIcon} />
				</CardButton>
			</div>

			<div className={styles.expensesCard__list}>
				{transactions?.slice(0, 5).map((expense) => (
					<TransactionInfoCard
						key={expense.id}
						title={expense.category.name}
						icon={expense.icon}
						date={expense.transactionDate}
						amount={expense.amount}
						type={TransactionType.Expense}
						hideDeleteBtn
					/>
				))}
			</div>
		</WrapperCard>
	);
};

export default ExpenseTransactions;
