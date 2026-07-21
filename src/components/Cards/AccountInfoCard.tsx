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
	type,
	hideDeleteBtn = false,
	onDelete,
}: TransactionInfoCardProps) => {
	return (
		<div className={styles.accountInfoCard}>
			<div>
				<RiAccountBoxLine />
			</div>

			<div>
				<div>
					<MainTextTypography variant="body">{name}</MainTextTypography>

					<MainTextTypography variant="body">{type}</MainTextTypography>
				</div>

				<div>
					{!hideDeleteBtn && (
						<button
							type="button"
							onClick={onDelete}
							className={styles.transactionInfoCard__deleteButton}
						>
							<LuTrash2 size={18} />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
