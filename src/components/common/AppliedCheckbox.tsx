import clsx from 'clsx';
import { type ElementRef, forwardRef, type ReactNode } from 'react';
import { handleOnKeyDown } from '../../utils/Functions/Utility/handleOnKeyDown';
import MainTextTypography from '../MainTextTypography';
import { onKeyDownHandler } from '../UI Components/Applied UI/buttonUtils';
import styles from './styles/_AppliedCheckbox.module.scss';

export type AppliedCheckboxProps = {
	// Required
	'aria-label': string;
	label: ReactNode;
	tabIndex: number;
	checked: boolean;
	onChange: (event: React.SyntheticEvent<HTMLElement>, checked: boolean) => void;

	// Optional
	disabled?: boolean;
	disableToggleWithLabel?: boolean;
	disableLabelFromTabbing?: boolean;
	checkboxContainerClassName?: string;
	filledCheckboxIconClassName?: string;
	emptyCheckboxIconClassName?: string;
	checkboxLabelClassName?: string;
	fullWidthLabel?: boolean;
	hideCheckbox?: boolean;
	indeterminate?: boolean;
};

export const AppliedCheckbox = forwardRef<ElementRef<'button'>, AppliedCheckboxProps>(
	function AppliedCheckbox(props, ref) {
		const {
			'aria-label': ariaLabel,
			checkboxContainerClassName,
			checked,
			disabled,
			label,
			tabIndex,
			fullWidthLabel,
			disableToggleWithLabel,
			disableLabelFromTabbing,
			hideCheckbox,
			filledCheckboxIconClassName,
			emptyCheckboxIconClassName,
			checkboxLabelClassName,
			indeterminate,
			onChange,
			...otherProps
		} = props;

		const toggleChecked = (event: React.SyntheticEvent<HTMLElement>) => {
			if (disabled) return;
			onChange(event, !checked);
		};

		const isLabelString = typeof label === 'string';

		return (
			<div
				className={clsx(
					styles.appliedCheckbox,
					checkboxContainerClassName ?? '',
					disabled && styles.disabled,
				)}
			>
				{!hideCheckbox && (
					<button
						{...otherProps}
						aria-label={'Checkbox button'}
						className={`${styles.checkboxButton}`}
						disabled={disabled}
						onClick={(event) => {
							toggleChecked(event);
						}}
						onKeyDown={(event) => {
							onKeyDownHandler(event, toggleChecked);
						}}
						ref={ref}
						tabIndex={tabIndex}
						type="button"
					>
						{checked ? (
							<AppliedFilledCheckboxIcon
								className={`${styles.checkboxBase} ${filledCheckboxIconClassName ?? ''}`}
							/>
						) : indeterminate ? (
							<AppliedIndeterminateCheckboxIcon
								className={`${styles.checkboxBase} ${filledCheckboxIconClassName ?? ''}`}
							/>
						) : (
							<AppliedEmptyCheckboxIcon
								className={`${styles.checkboxBase} ${emptyCheckboxIconClassName ?? ''}`}
							/>
						)}
					</button>
				)}

				{/** biome-ignore lint/a11y/useSemanticElements: <Using Div here> */}
				<div
					aria-label={ariaLabel}
					className={clsx(styles.checkboxLabel, disabled && styles.disabledCheckboxLabel)}
					onClick={(e) => !disableToggleWithLabel && toggleChecked(e)}
					onKeyDown={(e) => !disableToggleWithLabel && handleOnKeyDown(e, () => toggleChecked(e))}
					role="button"
					style={{
						width: fullWidthLabel ? '100%' : 'auto',
						cursor: disableToggleWithLabel ? 'default' : 'pointer',
					}}
					tabIndex={disableToggleWithLabel || disableLabelFromTabbing ? -1 : 0}
				>
					{isLabelString ? (
						<MainTextTypography className={checkboxLabelClassName} textAlign="left">
							{label}
						</MainTextTypography>
					) : (
						label
					)}
				</div>
			</div>
		);
	},
);

type AppliedCheckboxIconProps = {
	className?: string;
};

function AppliedEmptyCheckboxIcon({ className }: AppliedCheckboxIconProps) {
	return (
		<svg
			className={className}
			height="20"
			viewBox="0 0 27 27"
			width="20"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M28.5,7.5v21H7.5V7.5h21m0-3H7.5a3.009,3.009,0,0,0-3,3v21a3.009,3.009,0,0,0,3,3h21a3.009,3.009,0,0,0,3-3V7.5A3.009,3.009,0,0,0,28.5,4.5Z"
				data-name="Icon material-check-box-outline-blank"
				id="Icon_material-check-box-outline-blank"
				transform="translate(-4.5 -4.5)"
			/>
		</svg>
	);
}

function AppliedFilledCheckboxIcon({ className }: AppliedCheckboxIconProps) {
	return (
		<svg
			className={className}
			height="20"
			viewBox="0 0 27 27"
			width="20"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M28.5,4.5H7.5a3,3,0,0,0-3,3v21a3,3,0,0,0,3,3h21a3,3,0,0,0,3-3V7.5A3,3,0,0,0,28.5,4.5ZM15,25.5,7.5,18l2.115-2.115L15,21.255,26.385,9.87,28.5,12Z"
				data-name="Icon material-check-box"
				id="Icon_material-check-box"
				transform="translate(-4.5 -4.5)"
			/>
		</svg>
	);
}

function AppliedIndeterminateCheckboxIcon({ className }: AppliedCheckboxIconProps) {
	return (
		<svg
			className={className}
			height="20"
			viewBox="0 0 27 27"
			width="20"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M28.5,4.5H7.5a3,3,0,0,0-3,3v21a3,3,0,0,0,3,3h21a3,3,0,0,0,3-3V7.5A3,3,0,0,0,28.5,4.5ZM10.5,16.5h15v3h-15Z"
				data-name="Icon material-indeterminate-check-box"
				id="Icon_material-indeterminate-check-box"
				transform="translate(-4.5 -4.5)"
			/>
		</svg>
	);
}
