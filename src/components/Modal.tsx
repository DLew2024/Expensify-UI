import { type ReactNode } from 'react';
import MainTextTypography from './MainTextTypography';
import styles from './styles/_Modal.module.scss';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className={styles.modal}>
			<div className={styles.modal__container}>
				<div className={styles.modal__content}>
					<div className={styles.modal__header}>
						<MainTextTypography variant="h3" className={styles.modal__title}>
							{title}
						</MainTextTypography>

						<button type="button" onClick={onClose} className={styles.modal__closeButton}>
							<svg
								className={styles.modal__closeIcon}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
						</button>
					</div>

					<div className={styles.modal__body}>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
