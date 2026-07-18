import { useMemo } from 'react';
import { LuPlus } from 'react-icons/lu';
import type { TransactionDTO } from '../../api/GeneratedDTOs';
import { prepareIncomeBarChartData } from '../../utils/Functions/Conversions/NumberUtils';
import CustomBarChart from '../Charts/CustomBarChart';
import AddButton from '../common/AddButton';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_IncomeOverview.module.scss';

interface IncomeOverviewProps {
	transactions: TransactionDTO[];
	onAddIncome: () => void;
}

const IncomeOverview = ({ transactions, onAddIncome }: IncomeOverviewProps) => {
	const chartData = useMemo(() => prepareIncomeBarChartData(transactions), [transactions]);

	return (
		<WrapperCard>
			<div className={styles.incomeOverview__header}>
				<div>
					<MainTextTypography className={styles.incomeOverview__title} variant="h5">
						Income Overview
					</MainTextTypography>

					<MainTextTypography className={styles.incomeOverview__description} variant="body">
						Track your earnings over time and analyze your income trends.
					</MainTextTypography>
				</div>

				<AddButton
					icon={<LuPlus className={styles.incomeOverview__addIcon} />}
					onClick={onAddIncome}
				>
					Add Income
				</AddButton>
			</div>

			<div className={styles.incomeOverview__chart}>
				<CustomBarChart data={chartData} />
			</div>
		</WrapperCard>
	);
};

export default IncomeOverview;
