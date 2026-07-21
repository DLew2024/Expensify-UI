import { LuArrowRight } from 'react-icons/lu';
import type { TransactionDTO } from '../../api/GeneratedDTOs';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import CardButton from '../common/CardButton';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_RecentIncome.module.scss';

interface RecentIncomesProps {
	transactions: TransactionDTO[];
	onSeeMore?: () => void;
}

const RecentIncome = ({ transactions, onSeeMore }: RecentIncomesProps) => {
	return (
		<WrapperCard>
			<div className={styles.recentIncome__header}>
				<MainTextTypography className={styles.recentIncome__title} variant="h5">
					Income
				</MainTextTypography>

				<CardButton
					icon={<LuArrowRight className={styles.recentIncome__buttonIcon} />}
					onClick={onSeeMore}
				>
					See All
				</CardButton>
			</div>

			<div className={styles.recentIncome__transactions}>
				{transactions.slice(0, 5).map((item) => (
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

export default RecentIncome;
