import { useMemo } from 'react';
import { LuPlus } from 'react-icons/lu';
import type { TransactionDTO } from '../../api/GeneratedDTOs';
import { prepareExpenseLineChartData } from '../../utils/Functions/Conversions/NumberUtils';
import CustomLineChart from '../Charts/CustomLineChart';
import AddButton from '../common/AddButton';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_ExpenseOverview.module.scss';

interface ExpenseOverviewProps {
	transactions: TransactionDTO[];
	onExpenseIncome: () => void;
}

const ExpenseOverview = ({ transactions, onExpenseIncome }: ExpenseOverviewProps) => {
	const chartData = useMemo(() => prepareExpenseLineChartData(transactions), [transactions]);

	return (
		<WrapperCard>
			<div className={styles.expenseOverview__header}>
				<div>
					<MainTextTypography variant="h5" className={styles.expenseOverview__title}>
						Expense Overview
					</MainTextTypography>

					<MainTextTypography variant="body" className={styles.expenseOverview__description}>
						Track your spending trends over time and gain insight into where your money goes.
					</MainTextTypography>
				</div>

				<AddButton onClick={onExpenseIncome}>
					<LuPlus className={styles.expenseOverview__addIcon} />
					Add Expense
				</AddButton>
			</div>

			<div className={styles.expenseOverview__chart}>
				<CustomLineChart data={chartData} />
			</div>
		</WrapperCard>
	);
};

export default ExpenseOverview;
