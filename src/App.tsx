import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router';
import UserProvider from './context/userContext';
import { appRoutes } from './utils/Navigation/AppRoutes';
import { NavigationRoutePaths } from './utils/Navigation/NavigationRoutePaths';

function App() {
	return (
		<UserProvider>
			<div>
				<Routes>
					<Route path={NavigationRoutePaths.ROOT} element={<Root />} />
					{appRoutes.map(({ path, caseSensitive, Component }) => (
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
