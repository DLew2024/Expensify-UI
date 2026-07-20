import { useMemo } from 'react';
import type { TransactionDTO } from '../../api/GeneratedDTOs';
import { prepareExpenseBarChartData } from '../../utils/Functions/Conversions/NumberUtils';
import CustomBarChart from '../Charts/CustomBarChart';
import type { CustomBarChartData } from '../Charts/utils/CustomComponentTypes';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_Last30DaysExpenses.module.scss';

interface Last30DaysExpensesProps {
	data: TransactionDTO[];
	onSeeMore?: () => void;
}

const Last30DaysExpenses = ({ data }: Last30DaysExpensesProps) => {
	const chartData = useMemo<CustomBarChartData[]>(() => prepareExpenseBarChartData(data), [data]);

	return (
		<WrapperCard className={styles.expenseChart}>
			<div className={styles.expenseChart__header}>
				<MainTextTypography variant="h5" className={styles.expenseChart__title}>
					Last 30 Days Expenses
				</MainTextTypography>
			</div>

			<CustomBarChart data={chartData} />
		</WrapperCard>
	);
};

export default Last30DaysExpenses;
