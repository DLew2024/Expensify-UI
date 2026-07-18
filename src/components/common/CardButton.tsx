import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles/_CardButton.module.scss';

interface CardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	icon?: ReactNode;
}

const CardButton = ({ children, icon, ...buttonProps }: CardButtonProps) => {
	return (
		<button type="button" className={styles.cardButton} {...buttonProps}>
			{children}
			{icon}
		</button>
	);
};
export default CardButton;
