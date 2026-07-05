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
		</UserProvider>
	);
}

const Root = () => {
	// Check if token exists in local storage or any other authentication logic
	const isAuthenticated = typeof window !== 'undefined' && !!localStorage.getItem('token');

	return isAuthenticated ? (
		<Navigate to={NavigationRoutePaths.DASHBOARD} />
	) : (
		<Navigate to={NavigationRoutePaths.LOGIN} />
	);
};

export default App;
