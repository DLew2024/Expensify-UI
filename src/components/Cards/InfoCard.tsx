import clsx from 'clsx';
import type { ReactNode } from 'react';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_InfoCard.module.scss';

interface InfoCardProps {
	icon: ReactNode;
	label: string;
	value: string | number;
	variant: 'primary' | 'success' | 'danger';
}

const InfoCard = ({ icon, label, value, variant }: InfoCardProps) => {
	return (
		<div className={styles.infoCard}>
			<div className={clsx(styles.infoCard__icon, styles[`infoCard__icon--${variant}`])}>
				{icon}
			</div>

			<div className={styles.infoCard__content}>
				<MainTextTypography variant="h6" className={styles.infoCard__label}>
					{label}
				</MainTextTypography>

				<span className={styles.infoCard__value}>${value}</span>
			</div>
		</div>
	);
};

export default InfoCard;
