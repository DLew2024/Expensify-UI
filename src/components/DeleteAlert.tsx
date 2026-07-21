import CardButton from './common/CardButton';
import MainTextTypography from './MainTextTypography';
import styles from './styles/_DeleteAlert.module.scss';

interface DeleteAlertProps {
	content: string;
	onDelete: () => void;
}

const DeleteAlert = ({ content, onDelete }: DeleteAlertProps) => {
	return (
		<div className={styles.deleteAlert}>
			<MainTextTypography variant="body" className={styles.deleteAlert__content}>
				{content}
			</MainTextTypography>

			<div className={styles.deleteAlert__actions}>
				<CardButton onClick={onDelete}>Delete</CardButton>
			</div>
		</div>
	);
};

export default DeleteAlert;
