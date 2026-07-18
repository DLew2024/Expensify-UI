import { useEffect, useState } from 'react';
import {
	type ExpenseBarChartDataItem,
	prepareExpenseBarChartData,
} from '../../utils/Functions/Conversions/NumberUtils';
import CustomBarChart from '../Charts/CustomBarChart';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_Last30DaysExpenses.module.scss';

interface Last30DaysExpensesProps {
	data: ExpenseBarChartDataItem[];
	onSeeMore?: () => void;
}

const Last30DaysExpenses = ({ data, onSeeMore }: Last30DaysExpensesProps) => {
	const [chartData, setChartData] = useState<ExpenseBarChartDataItem[]>([]);

	// useEffect(() => {
	// 	const result = prepareExpenseBarChartData(data);
	// 	setChartData(result);

	// 	return () => {};
	// }, [data]);

	return (
		<div className={styles.expenseChart}>
			<div className={styles.expenseChart__header}>
				<MainTextTypography variant="h5" className={styles.expenseChart__title}>
					Last 30 Days Expenses
				</MainTextTypography>
			</div>

			<CustomBarChart data={chartData} />
		</div>
	);
};

export default Last30DaysExpenses;
