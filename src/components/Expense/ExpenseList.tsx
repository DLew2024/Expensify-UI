import moment from 'moment';
import { LuDownload } from 'react-icons/lu';
import type { TransactionDTO } from '../../api/GeneratedDTOs';
import type { Guid } from '../../utils/DataTypes/Guid';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import CardButton from '../common/CardButton';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_ExpenseList.module.scss';

interface ExpenseListProps {
	transactions: TransactionDTO[];
	onDelete: (id: Guid) => void;
	onDownload: () => void;
}

const ExpenseList = ({ transactions, onDelete, onDownload }: ExpenseListProps) => {
	return (
		<WrapperCard>
			<div className={styles.expenseList__header}>
				<MainTextTypography className={styles.expenseList__title} variant="h5">
					All Expenses
				</MainTextTypography>

				<CardButton onClick={onDownload}>
					<LuDownload className={styles.expenseList__downloadIcon} />
				</CardButton>
			</div>

			<div className={styles.expenseList__grid}>
				{transactions.map((expense) => (
					<TransactionInfoCard
						key={expense.id}
						title={expense.category.name}
						icon={expense.icon}
						date={moment(expense.transactionDate).format('Do MMM YYYY')}
						amount={expense.amount}
						type={expense.type}
						onDelete={() => onDelete(expense.id)}
					/>
				))}
			</div>
		</WrapperCard>
	);
};

export default ExpenseList;
