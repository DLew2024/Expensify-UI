export const onKeyDownHandler = <T extends Element>(
	event: React.KeyboardEvent<T>,
	onClick: (event: React.KeyboardEvent<T>) => void,
) => {
	if (event.key !== 'Enter' && event.key !== ' ') return;

	event.preventDefault();
	onClick(event);
};
