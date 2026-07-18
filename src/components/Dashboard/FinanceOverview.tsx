import CustomPieChart from '../Charts/CustomPieChart';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_FinanceOverview.module.scss';

interface FinanceOverviewProps {
	totalBalance: number;
	totalIncome: number;
	totalExpenses: number;
}

const COLORS = ['#875CF5', '#FA2C37', '#FF6900'];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }: FinanceOverviewProps) => {
	const balanceData = [
		{ id: '1', name: 'Total Balance', amount: totalBalance },
		{ id: '2', name: 'Total Expenses', amount: totalExpenses },
		{ id: '3', name: 'Total Income', amount: totalIncome },
	];

	return (
		<WrapperCard>
			<div className={styles.financeOverview__header}>
				<MainTextTypography className={styles.financeOverview__title} variant="h5">
					Financial Overview
				</MainTextTypography>
			</div>

			<CustomPieChart
				data={balanceData}
				label="Total Balance"
				totalAmount={`$${totalBalance}`}
				colors={COLORS}
				showAnchorText
			/>
		</WrapperCard>
	);
};

export default FinanceOverview;
