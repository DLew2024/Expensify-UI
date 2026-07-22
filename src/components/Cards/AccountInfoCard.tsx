import { LuTrash2 } from 'react-icons/lu';
import { RiAccountBoxLine } from 'react-icons/ri';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_AccountInfoCard.module.scss';

interface TransactionInfoCardProps {
	name?: string;
	institutionName?: string;
	type?: string;
	availableBalance?: number;
	lastFourDigits?: string;
	hideDeleteBtn?: boolean;
	onDelete?: () => void;
}

export const AccountInfoCard = ({
	name = 'Error',
	institutionName,
	type,
	availableBalance,
	lastFourDigits,
	hideDeleteBtn = false,
	onDelete,
}: TransactionInfoCardProps) => {
	return (
		<div className={styles.accountInfoCard}>
			<div className={styles.accountInfoCard__icon}>
				<RiAccountBoxLine />
			</div>

			<div className={styles.accountInfoCard__content}>
				<div className={styles.accountInfoCard__details}>
					<MainTextTypography variant="body" className={styles.accountInfoCard__name}>
						{name}
					</MainTextTypography>

					<MainTextTypography variant="body" className={styles.accountInfoCard__type}>
						{type}
					</MainTextTypography>
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
