import type { ReactNode } from 'react';
import { LuTrendingUpDown } from 'react-icons/lu';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_AuthLayout.module.scss';

const StatsInfoCard = ({
	icon,
	label,
	value,
}: {
	icon: ReactNode;
	label: string;
	value: string;
}) => {
	return (
		<div className={styles.statsInfoCard}>
			<div className={styles.statsInfoCard__icon}>{icon}</div>

			<div className={styles.statsInfoCard__body}>
				<MainTextTypography variant="h6" className={styles.statsInfoCard__body__header}>
					{label}
				</MainTextTypography>
				<MainTextTypography variant="span">$ {value}</MainTextTypography>
			</div>
		</div>
	);
};

interface AuthLayoutProps {
	children?: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
	const imageUrl = '';
	return (
		<div className={styles.authLayoutContainer}>
			<div className={styles.authLayoutContainer__mainElement}>
				<MainTextTypography variant="h2" className={styles.authLayoutContainer__mainElement__text}>
					Expensify
				</MainTextTypography>
				{children}
			</div>

			<div className={styles.authLayoutContainer__imagesSection}>
				<div className={styles.floatingElement1}></div>
				<div className={styles.floatingElement2}></div>
				<div className={styles.floatingElement3}></div>

				<div className={styles.statsCardContainer}>
					<StatsInfoCard
						icon={<LuTrendingUpDown />}
						label="Track Your Income & Expenses"
						value="500,000"
					/>
				</div>

				{imageUrl && <img src={imageUrl} className={styles.image} alt="" />}
			</div>
		</div>
	);
};

export default AuthLayout;
