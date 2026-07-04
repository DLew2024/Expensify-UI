import clsx from 'clsx';
import type React from 'react';
import styles from './styles/_PrimaryInput.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const PrimaryInput: React.FC<InputProps> = ({ className, ...props }) => {
	return <input {...props} className={clsx(styles.primaryInput, className)} />;
};
