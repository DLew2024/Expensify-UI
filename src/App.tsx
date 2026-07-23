import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';
import UserProvider from './context/userContext';
import type { AppState } from './store/store';
import { shouldBypassAuth } from './utils/Development/Dev';
import { appRoutes } from './utils/Navigation/AppRoutes';
import { NavigationRoutePaths } from './utils/Navigation/NavigationRoutePaths';

function App() {
	const $selectedAccountId = useSelector((state: AppState) => state.accounts.selectedAccountId);
	const availableRoutes = appRoutes.filter((route) => !route.requiresAccount || $selectedAccountId);

	return (
		<UserProvider>
			<div>
				<Routes>
					<Route path={NavigationRoutePaths.ROOT} element={<Root />} />
					{availableRoutes.map(({ path, caseSensitive, Component }) => (
						<Route key={path} caseSensitive={caseSensitive} path={path} element={<Component />} />
					))}
				</Routes>
			</div>

			<Toaster
				toastOptions={{
					className: '',
					style: {
						fontSize: '13px',
					},
				}}
			/>
		</UserProvider>
	);
}

const Root = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		if (shouldBypassAuth()) {
			localStorage.setItem('token', 'dev-token');
			setIsAuthenticated(true);
			return;
		}

		setIsAuthenticated(Boolean(localStorage.getItem('token')));
	}, []);

	if (isAuthenticated === null) {
		return null;
	}

	return (
		<Navigate
			to={isAuthenticated ? NavigationRoutePaths.DASHBOARD : NavigationRoutePaths.SIGN_UP}
			replace
		/>
	);
};

export default App;
