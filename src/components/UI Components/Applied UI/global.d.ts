export interface ElementAttributes {
	className?: string;
	hidden?: boolean;
	id?: string;
	tabIndex?: number;
	type?: 'submit' | 'button' | 'reset';
}

export interface AppliedAriaAttributes {
	'aria-label'?: string;
	'aria-describedby'?: string;
}
