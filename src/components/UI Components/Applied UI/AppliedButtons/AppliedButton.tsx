import type React from 'react';
import { type ElementRef, forwardRef } from 'react';
import { onKeyDownHandler } from '../buttonUtils';
import type { AppliedAriaAttributes, ElementAttributes } from '../global';

export type AppliedButtonProps = ElementAttributes &
	Omit<AppliedAriaAttributes, 'aria-label'> & {
		'aria-label': string;
		children?: React.ReactNode;
		startIcon?: React.ReactNode;
		endIcon?: React.ReactNode;
		value?: string | number;
		disabled?: boolean;
		onClick?: (
			event:
				| React.MouseEvent<HTMLButtonElement, MouseEvent>
				| React.KeyboardEvent<HTMLButtonElement>,
		) => void;
		onMouseOver?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
		onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	};

export const AppliedButton = forwardRef<ElementRef<'button'>, AppliedButtonProps>(
	function AppliedButton(props, ref) {
		const { startIcon, endIcon, children, ...otherProps } = props;
		return (
			<button
				onKeyDown={(event) => props.onClick && onKeyDownHandler(event, props.onClick)}
				ref={ref}
				{...otherProps}
			>
				{startIcon}

				{children}

				{endIcon}
			</button>
		);
	},
);

export default AppliedButton;
