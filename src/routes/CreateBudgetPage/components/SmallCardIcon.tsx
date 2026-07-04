interface SmallCardIconProps {
	icon?: string;
	color?: string;
}

export const SmallCardIcon = (props: SmallCardIconProps) => {
	const { icon, color } = props;
	return (
		<div>
			{icon}
			{color}
		</div>
	);
};
