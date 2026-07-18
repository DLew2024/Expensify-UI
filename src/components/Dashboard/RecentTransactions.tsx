import moment from 'moment';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_RecentTransactions.module.scss';

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

const RecentTransactions = ({ transactions, onSeeMore }: RecentTransactionsProps) => {
	return (
		<div className={styles.recentTransactions}>
			<div className={styles.recentTransactions__header}>
				<MainTextTypography className={styles.recentTransactions__title} variant="h5">
					Recent Transactions
				</MainTextTypography>

				<button type="button" className={styles.recentTransactions__seeAllButton}>
					See All
					<LuArrowRight className={styles.recentTransactions__seeAllIcon} />
				</button>
			</div>

			<div className={styles.recentTransactions__list}>
				{transactions?.slice(0, 5).map((item) => (
					<TransactionInfoCard
						key={item.id}
						title={item.type === 'expense' ? item.category : item.source}
						icon={item.icon}
						date={moment(item.date).format('Do MMM YYYY')}
						amount={item.amount}
						type={item.type}
						hideDeleteBtn
					/>
				))}
			</div>
		</div>
	);
};

export default RecentTransactions;
