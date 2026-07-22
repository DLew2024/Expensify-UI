import type { CSSProperties } from '@mui/material';
import React from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'body' | 'div';

type MainTextTypographyProps = {
	variant?: TypographyVariant;
	className?: string;
	children: React.ReactNode;
	textAlign?: CSSProperties['textAlign'];
	fontWeight?: CSSProperties['fontWeight'];
	whiteSpace?: CSSProperties['whiteSpace'];
	fontSize?: CSSProperties['fontSize'];
};

export const MainTextTypography: React.FC<MainTextTypographyProps> = ({
	variant = 'body',
	className,
	children,
}) => {
	const Tag = variant === 'body' ? 'p' : variant;

	return React.createElement(Tag, { className }, children);
};

export default MainTextTypography;
