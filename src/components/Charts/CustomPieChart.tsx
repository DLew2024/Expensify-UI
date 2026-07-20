import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { Guid } from '../../utils/DataTypes/Guid';
import CustomLegend from './CustomLegend';
import CustomTooltip from './CustomTooltip';

interface PieChartDataItem {
	id: Guid | string;
	name: string;
	amount: number;
}

interface CustomPieChartProps {
	data: PieChartDataItem[];
	label: string;
	totalAmount: string;
	colors: string[];
	showAnchorText?: boolean;
}

const CustomPieChart = ({
	data,
	label,
	totalAmount,
	colors,
	showAnchorText = false,
}: CustomPieChartProps) => {
	return (
		<ResponsiveContainer>
			<PieChart>
				<Pie
					data={data}
					dataKey="amount"
					nameKey="name"
					cx={'50%'}
					cy={'50%'}
					outerRadius={130}
					innerRadius={100}
					labelLine={false}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${entry.id}`} fill={colors[index % colors.length]} />
					))}
				</Pie>
				<Tooltip content={<CustomTooltip />} />
				<Legend content={<CustomLegend />} />

				{showAnchorText && (
					<>
						<text x={'50%'} y={'50%'} dy={-25} textAnchor="middle" fill="#667" fontSize={'14px'}>
							{label}
						</text>

						<text x={'50%'} y={'50%'} dy={8} textAnchor="middle" fill="#333" fontSize={'semi-bold'}>
							{totalAmount}
						</text>
					</>
				)}
			</PieChart>
		</ResponsiveContainer>
	);
};

export default CustomPieChart;
