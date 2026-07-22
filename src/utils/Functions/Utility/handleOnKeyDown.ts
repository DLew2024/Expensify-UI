import { KeyboardKeys } from './KeyboardKeys';

type KeyActionMap<T extends (...args: any) => void> = {
	[key: string]: T;
};

//Overload Signatures

// Original single key version
export function handleOnKeyDown<T extends (...args: any) => void>(
	event: React.KeyboardEvent,
	onClick: T,
	key?: string,
	...onClickArgs: Parameters<T>
): void;

// Multiple key version
export function handleOnKeyDown<T extends (...args: any) => void>(
	event: React.KeyboardEvent,
	keyMap: KeyActionMap<T>,
	...onClickArgs: Parameters<T>
): void;

/**
 *  Used for accessibility navigation. This should be used for the onKeyDown event for any component
 *  in which a specified key (or any key besides tab if none are specified) handles the onClick event.
 *
 * @param event on key press event.
 *
 * @param onClick the component's onClick event handler. This parameter is designed to be able to take in any argument(s) (or no arguments).
 *
 * @param key specified key for the onclick event.
 *
 * @param onClickArgs spread of arguments to be passed to onClick (can be empty if no arguments necessary)
 */
export function handleOnKeyDown<T extends (...args: any) => void>(
	event: React.KeyboardEvent,
	onClickOrMap: T | KeyActionMap<T>,
	keyOrArguments?: string | any,
	...onClickArgs: Parameters<T>
): void {
	// ---- Multiple key map ----
	if (typeof onClickOrMap === 'object' && !('length' in onClickOrMap)) {
		const keyMap = onClickOrMap as KeyActionMap<T>;
		const callback = keyMap[event.key];
		if (callback) {
			event.preventDefault();
			event.stopPropagation();
			callback(...onClickArgs);
		}
		return;
	}

	// ---- Original single function ----
	const onClick = onClickOrMap as T;
	const key = keyOrArguments as string | undefined;

	if (event.key === KeyboardKeys.Enter) {
		event.preventDefault();
		onClick(...onClickArgs);
	} else if (key && event.key === key) {
		onClick(...onClickArgs);
	}
}
