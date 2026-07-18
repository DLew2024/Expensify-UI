/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <Only change with data> */
import { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';

interface RecentIncomeWithChartProps {
	data: any[];
	totalIncome: number;
}

const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4f39f6'];

const RecentIncomeWithChart = ({ data, totalIncome }: RecentIncomeWithChartProps) => {
	const [chartData, setChartData] = useState<any[]>([]);

	const prepareChartData = () => {
		const dataArr = data?.map((item) => ({
			name: item?.source,
			amount: item?.amount,
		}));

		setChartData(dataArr);
	};

	// useEffect(() => {
	// 	prepareChartData();

	// 	return () => {};
	// }, [data]);

	return (
		<WrapperCard>
			<div className="flex items-center justify-between">
				<MainTextTypography variant="h5" className="text-lg">
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
