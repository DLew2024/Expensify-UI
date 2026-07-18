import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles/_AddButton.module.scss';

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	icon?: ReactNode;
}

const AddButton = ({ children, icon, ...buttonProps }: AddButtonProps) => {
	return (
		<button type="button" className={styles.addButton} {...buttonProps}>
			{icon}
			{children}
		</button>
	);
};

export default AddButton;
