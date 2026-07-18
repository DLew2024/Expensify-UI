import moment from 'moment';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import CardButton from '../common/CardButton';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_RecentIncome.module.scss';

interface RecentIncomesProps {
	transactions: any[];
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
						title={item.source}
						icon={item.icon}
						date={moment(item.date).format('Do MMM YYYY')}
						amount={item.amount}
						type="income"
						hideDeleteBtn
					/>
				))}
			</div>
		</WrapperCard>
	);
};

export default RecentIncome;
