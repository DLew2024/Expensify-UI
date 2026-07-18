import clsx from 'clsx';
import { LuTrash2, LuTrendingDown, LuTrendingUp, LuUtensils } from 'react-icons/lu';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_TransactionCardInfo.module.scss';

interface TransactionInfoCardProps {
	title: string;
	icon?: string;
	date: string;
	amount: string | number;
	type: 'income' | 'expense';
	hideDeleteBtn?: boolean;
	onDelete?: () => void;
}

const TransactionInfoCard = ({
	title,
	icon,
	date,
	amount,
	type,
	hideDeleteBtn = false,
	onDelete,
}: TransactionInfoCardProps) => {
	return (
		<div className={styles.transactionInfoCard}>
			<div className={styles.transactionInfoCard__iconContainer}>
				{icon ? (
					<img src={icon} alt={title} className={styles.transactionInfoCard__icon} />
				) : (
					<LuUtensils />
				)}
			</div>

			<div className={styles.transactionInfoCard__content}>
				<div>
					<MainTextTypography className={styles.transactionInfoCard__title} variant="body">
						{title}
					</MainTextTypography>

					<MainTextTypography className={styles.transactionInfoCard__date} variant="body">
						{date}
					</MainTextTypography>
				</div>

				<div className={styles.transactionInfoCard__actions}>
					{!hideDeleteBtn && (
						<button
							type="button"
							onClick={onDelete}
							className={styles.transactionInfoCard__deleteButton}
						>
							<LuTrash2 size={18} />
						</button>
					)}

					<div
						className={clsx(
							styles.transactionInfoCard__amount,
							type === 'income'
								? styles['transactionInfoCard__amount--income']
								: styles['transactionInfoCard__amount--expense'],
						)}
					>
						<MainTextTypography className={styles.transactionInfoCard__amountText} variant="h6">
							{type === 'income' ? '+' : '-'} ${amount}
						</MainTextTypography>

						{type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TransactionInfoCard;
