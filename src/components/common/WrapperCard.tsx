import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './styles/_WrapperCard.module.scss';

interface WrapperCardProps {
	children: ReactNode;
	className?: string;
}

const WrapperCard = ({ children, className }: WrapperCardProps) => {
	return <div className={clsx(styles.wrapperCard, className)}>{children}</div>;
};

export default WrapperCard;
