import { LuTrash2 } from 'react-icons/lu';
import { RiAccountBoxLine } from 'react-icons/ri';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_AccountInfoCard.module.scss';

interface AccountInfoCardProps {
	name?: string;
	institutionName?: string;
	type?: string; // Using type to change color
	icon?: string;
	availableBalance?: number;
	lastFourDigits?: string;
	hideDeleteBtn?: boolean;
	onDelete?: () => void;
}

const AccountInfoCard = ({
	name = 'Error',
	institutionName,
	// type,
	icon,
	availableBalance,
	lastFourDigits,
	hideDeleteBtn = false,
	onDelete,
}: AccountInfoCardProps) => {
	return (
		<div className={styles.accountInfoCard}>
			<div className={styles.accountInfoCard__iconContainer}>
				{icon ? (
					<img src={icon} alt={name} className={styles.accountInfoCard__icon} />
				) : (
					<RiAccountBoxLine className={styles.accountInfoCard__fallbackIcon} />
				)}
			</div>

			<div className={styles.accountInfoCard__content}>
				<div className={styles.accountInfoCard__details}>
					<MainTextTypography className={styles.accountInfoCard__name}>
						{institutionName}: {name} Account
					</MainTextTypography>

					<MainTextTypography className={styles.accountInfoCard__balanceLabel}>
						Available Balance
					</MainTextTypography>

					<div className={styles.accountInfoCard__balanceDetails}>
						<MainTextTypography className={styles.accountInfoCard__balance}>
							${availableBalance}
						</MainTextTypography>

						<MainTextTypography className={styles.accountInfoCard__lastFourDigits}>
							{lastFourDigits}
						</MainTextTypography>
					</div>
				</div>

				<div className={styles.accountInfoCard__actions}>
					{!hideDeleteBtn && (
						<button
							type="button"
							onClick={onDelete}
							className={styles.accountInfoCard__deleteButton}
						>
							<LuTrash2 size={18} />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default AccountInfoCard;
