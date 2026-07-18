import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	type TooltipPayload,
	XAxis,
	YAxis,
} from 'recharts';
import type { ExpenseChartData } from '../Dashboard/types/DashboardTypes';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_CustomLineChart.module.scss';

interface CustomLineChartProps {
	data: ExpenseChartData;
}

const CustomLineChart = ({ data }: CustomLineChartProps) => {
	const CustomTooltip = ({ active, payload }: { active: boolean; payload: TooltipPayload }) => {
		if (!active || !payload?.length) {
			return null;
		}

		return (
			<div className={styles.customLineChart__tooltip}>
				<MainTextTypography variant="body" className={styles.customLineChart__tooltipCategory}>
					{payload[0].payload.category}
				</MainTextTypography>

				<MainTextTypography variant="body" className={styles.customLineChart__tooltipAmount}>
					Amount:{' '}
					<span className={styles.customLineChart__tooltipAmountValue}>
						{payload[0].payload.amount}
					</span>
				</MainTextTypography>
			</div>
		);
	};

	return (
		<div className={styles.customLineChart}>
			<ResponsiveContainer width="100%" height={300}>
				<AreaChart data={data}>
					<defs>
						<linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />

							<stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
						</linearGradient>
					</defs>

					<CartesianGrid stroke="none" />

					<XAxis dataKey="month" tick={{ fontSize: 12, fill: '#555' }} stroke="none" />

					<YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />

					<Tooltip content={(tooltipProps) => <CustomTooltip {...tooltipProps} />} />

					<Area
						type="monotone"
						dataKey="amount"
						stroke="#875cf5"
						fill="url(#incomeGradient)"
						strokeWidth={3}
						dot={{
							r: 3,
							fill: '#ab8df8',
						}}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default CustomLineChart;
