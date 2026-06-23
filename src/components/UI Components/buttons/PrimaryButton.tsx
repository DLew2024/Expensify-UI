import clsx from 'clsx';
import { forwardRef } from 'react';
import AppliedButton, { type AppliedButtonProps } from '../Applied UI/AppliedButtons/AppliedButton';
import styles from './_PrimaryButton.module.scss';

type PrimaryButtonProps = AppliedButtonProps;

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
	function PrimaryButton({ className, children, ...otherProps }, ref) {
		return (
			<AppliedButton ref={ref} className={clsx(styles.button, className)} {...otherProps}>
				{children}
			</AppliedButton>
		);
	},
);

export default PrimaryButton;
