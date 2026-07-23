import { LuArrowRight } from 'react-icons/lu';
import type { TransactionDTO } from '../../api/GeneratedDTOs';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import CardButton from '../common/CardButton';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_RecentTransactions.module.scss';

interface RecentTransactionsProps {
	transactions?: TransactionDTO[];
	onSeeMore: () => void;
}

const RecentTransactions = ({ transactions, onSeeMore }: RecentTransactionsProps) => {
	return (
		<WrapperCard>
			<div className={styles.recentTransactions__header}>
				<MainTextTypography className={styles.recentTransactions__title} variant="h5">
					Recent Transactions
				</MainTextTypography>

				<CardButton
					icon={<LuArrowRight className={styles.recentTransactions__seeAllIcon} />}
					onClick={onSeeMore}
				>
					See All
				</CardButton>
			</div>

			<div className={styles.recentTransactions__list}>
				{transactions?.slice(0, 5).map((item) => (
					<TransactionInfoCard
						key={item.id}
						title={item.merchant}
						icon={item.icon}
						date={item.transactionDate}
						amount={item.amount}
						type={item.type}
						hideDeleteBtn
					/>
				))}
			</div>
		</WrapperCard>
	);
};

export default RecentTransactions;
