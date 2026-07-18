import { useMemo } from 'react';
import type { TransactionDTO } from '../../api/GeneratedDTOs';
import CustomPieChart from '../Charts/CustomPieChart';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_RecentIncomeWithChart.module.scss';

interface RecentIncomeWithChartProps {
	data: TransactionDTO[];
	totalIncome: number;
}

const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4f39f6'];

const RecentIncomeWithChart = ({ data, totalIncome }: RecentIncomeWithChartProps) => {
	const chartData = useMemo(
		() =>
			data.map((transaction) => ({
				id: transaction.id,
				name: transaction.merchant ?? '',
				amount: transaction.amount ?? 0,
			})),
		[data],
	);

	return (
		<WrapperCard>
			<div className={styles.recentIncomeWithChart__header}>
				<MainTextTypography variant="h5" className={styles.recentIncomeWithChart__title}>
					Last 60 Days Income
				</MainTextTypography>
			</div>

			<CustomPieChart
				data={chartData}
				label="Total Income"
				totalAmount={`$${totalIncome}`}
				colors={COLORS}
				showAnchorText
			/>
		</WrapperCard>
	);
};

export default RecentIncomeWithChart;
