import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import AddButton from '../common/AddButton';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';

const IncomeOverview = ({ transactions, onAddIncome }) => {
	const [chartData, setChartData] = useState([]);

	// useEffect(() => {
	// 	const result = prepareIncomeBarChartData(transactions);
	// 	setChartData(result);

	// 	return () => {};
	// }, [transactions]);

	return (
		<WrapperCard>
			<div className="flex items-center justify-between">
				<div className="">
					<MainTextTypography className="text-lg" variant="h5">
						Income Overview
					</MainTextTypography>
					<MainTextTypography className="text-xs text-gray-400 mt-0.5" variant="body">
						Track your earnings over time and analyze your income trends.
					</MainTextTypography>
				</div>

				<AddButton icon={<LuPlus className="text-lg" />} onClick={onAddIncome}>
					Add Income
				</AddButton>
			</div>

			<div className="mt-10">
				<CustomBarChart data={chartData} />
			</div>
		</WrapperCard>
	);
};

export default IncomeOverview;
