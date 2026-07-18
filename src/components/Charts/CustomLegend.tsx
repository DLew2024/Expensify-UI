import styles from './styles/_CustomLegend.module.scss';

interface CustomLegendProps {
	payload?: {
		id: string;
		value: string;
		color: string;
	}[];
}

const CustomLegend = ({ payload }: CustomLegendProps) => {
	if (!payload?.length) {
		return null;
	}

	return (
		<div className={styles.customLegend}>
			{payload.map((entry) => (
				<div key={`legend-${entry.id}`} className={styles.customLegend__item}>
					<div
						className={styles.customLegend__indicator}
						style={{ backgroundColor: entry.color }}
					/>

					<span className={styles.customLegend__label}>{entry.value}</span>
				</div>
			))}
		</div>
	);
};

export default CustomLegend;
