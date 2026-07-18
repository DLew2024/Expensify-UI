import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles/_FillButton.module.scss';

interface FillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	icon?: ReactNode;
}

const FillButton = ({ children, icon, ...buttonProps }: FillButtonProps) => {
	return (
		<button type="button" className={styles.fillButton} {...buttonProps}>
			{children}
			{icon}
		</button>
	);
};
export default FillButton;
