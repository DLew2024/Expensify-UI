const isLocalDevelopmentHost = () => {
	if (typeof window === 'undefined') return false;

	return ['localhost', '127.0.0.1', '0.0.0.0'].includes(window.location.hostname);
};

export const shouldBypassAuth = () => import.meta.env.DEV || isLocalDevelopmentHost();
