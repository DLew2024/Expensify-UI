import type { ReactNode } from 'react';
import { LuTrendingUpDown } from 'react-icons/lu';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_AuthLayout.module.scss';

type AuthLayoutProps = {
	children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<div className={styles.root}>
			<div className={styles.element}>
				<MainTextTypography variant="h2" className={styles.text}>
					Expense Tracker
				</MainTextTypography>
				{children}
			</div>

			<div className={styles.imageContainer}>
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

				<img src="" className={styles.image} alt="" />
			</div>
		</div>
	);
};

export default AuthLayout;

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
		<div className={styles.statsInfoCardIconContainer}>
			<div className={styles.statsInfoCardIcon}>{icon}</div>

			<div className="">
				<MainTextTypography variant="h6" className={styles.statsInfoCardHeader}>
					{label}
				</MainTextTypography>
				<MainTextTypography variant="span" className={styles.statsInfoCardValue}>
					$ {value}
				</MainTextTypography>
			</div>
		</div>
	);
};
