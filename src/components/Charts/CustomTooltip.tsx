import MainTextTypography from '../MainTextTypography';
import styles from './styles/_CustomTooltip.module.scss';

interface CustomTooltipProps {
	active?: boolean;
	payload?: {
		name: string;
		value: number;
	}[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
	if (active && payload && payload.length) {
		return (
			<div className={styles.customTooltip}>
				<MainTextTypography className={styles.customTooltip__title} variant="body">
					{payload[0].name}
				</MainTextTypography>

				<MainTextTypography className={styles.customTooltip__text} variant="body">
					Amount: <span className={styles.customTooltip__value}>{payload[0].value}</span>
				</MainTextTypography>
			</div>
		);
	}

	return null;
};

export default CustomTooltip;
