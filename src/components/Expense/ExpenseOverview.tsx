import { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import type { TransactionDTO } from '../../api/GeneratedDTOs';
import { prepareExpenseLineChartData } from '../../utils/Functions/Conversions/NumberUtils';
import CustomLineChart from '../Charts/CustomLineChart';
import AddButton from '../common/AddButton';
import WrapperCard from '../common/WrapperCard';
import type { ExpenseChartData } from '../Dashboard/types/DashboardTypes';
import MainTextTypography from '../MainTextTypography';

interface ExpenseOverviewProps {
	transactions: TransactionDTO[];
	onExpenseIncome: () => void;
}

const ExpenseOverview = ({ transactions, onExpenseIncome }: ExpenseOverviewProps) => {
	const [chartData, setChartData] = useState<ExpenseChartData>([]);

	useEffect(() => {
		const result = prepareExpenseLineChartData(transactions);
		setChartData(result);

		return () => {};
	}, [transactions]);

	return (
		<WrapperCard>
			<div className="flex items-center justify-between">
				<div className="">
					<MainTextTypography variant="h5" className="text-lg">
						Expense Overview
					</MainTextTypography>

					<MainTextTypography variant="body" className="text-xs text-gray-40 mt-0.5">
						Track your spending trends over time and gain insight into whe e your money goes.
					</MainTextTypography>
				</div>

				<AddButton onClick={onExpenseIncome}>
					<LuPlus className="text-lg" />
					Add Expense
				</AddButton>
			</div>

			<div className="mt-10">
				<CustomLineChart data={chartData} />
			</div>
		</WrapperCard>
	);
};

export default ExpenseOverview;
