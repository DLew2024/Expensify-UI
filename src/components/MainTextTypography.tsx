import React from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'body' | 'div';

type MainTextTypographyProps = {
	variant?: TypographyVariant;
	className?: string;
	children: React.ReactNode;
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
