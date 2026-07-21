import type { ReactElement } from 'react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	type TooltipPayload,
	XAxis,
	YAxis,
} from 'recharts';
import { v4 } from 'uuid';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_CustomBarChart.module.scss';
import type { CustomBarChartData } from './utils/CustomComponentTypes';

interface CustomBarChartProps {
	data: CustomBarChartData[];
}

const BAR_COLORS = { primary: '#875cf5', secondary: '#cfbefb' } as const;

const CustomBarChart = ({ data }: CustomBarChartProps) => {
	const getBarColor = (index: number): string =>
		index % 2 === 0 ? BAR_COLORS.primary : BAR_COLORS.secondary;

	const CustomTooltip = ({
		active,
		payload,
	}: {
		payload: TooltipPayload;
		active: boolean;
	}): ReactElement | null => {
		if (!active || !payload?.length) {
			return null;
		}

		return (
			<div className={styles.customBarChart__tooltip}>
				<MainTextTypography variant="body" className={styles.customBarChart__tooltipTitle}>
					{payload[0].payload.category}
				</MainTextTypography>

				<MainTextTypography variant="body" className={styles.customBarChart__tooltipText}>
					Amount:{' '}
					<span className={styles.customBarChart__tooltipValue}>${payload[0].payload.amount}</span>
				</MainTextTypography>
			</div>
		);
	};

	return (
		<div className={styles.customBarChart}>
			<ResponsiveContainer width={'100%'} height={300}>
				<BarChart data={data}>
					<CartesianGrid stroke="none" />

					<XAxis dataKey={'month'} tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
					<YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />

					<Tooltip content={(props) => <CustomTooltip {...props} />} />

					<Bar dataKey={'amount'} radius={[10, 10, 0, 0]} activeBar={{ fill: BAR_COLORS.primary }}>
						{data.map((_, index) => (
							<Cell key={`${v4()}`} fill={getBarColor(index)} />
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default CustomBarChart;
