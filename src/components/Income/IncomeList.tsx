import moment from 'moment';
import { LuDownload } from 'react-icons/lu';
import type { TransactionDTO } from '../../api/GeneratedDTOs';
import type { Guid } from '../../utils/DataTypes/Guid';
import { formatEpochSeconds } from '../../utils/Functions/Conversions/NumberUtils';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import CardButton from '../common/CardButton';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_IncomeList.module.scss';

interface IncomeListProps {
	transactions: TransactionDTO[];
	onDelete: (id: Guid) => void;
	onDownload: () => void;
}

const IncomeList = ({ transactions, onDelete, onDownload }: IncomeListProps) => {
	return (
		<WrapperCard>
			<div className={styles.incomeList__header}>
				<MainTextTypography className={styles.incomeList__title} variant="h5">
					Income Sources
				</MainTextTypography>

				<CardButton onClick={onDownload}>
					<LuDownload className={styles.incomeList__downloadIcon} />
				</CardButton>
			</div>

			<div className={styles.incomeList__grid}>
				{transactions.map((income) => (
					<TransactionInfoCard
						key={income.id}
						title={income.category.name ?? ''}
						icon={income.icon}
						date={income.transactionDate}
						amount={income.amount}
						type={income.type}
						onDelete={() => {
							if (income.id) {
								onDelete(income.id);
							}
						}}
					/>
				))}
			</div>
		</WrapperCard>
	);
};

export default IncomeList;
