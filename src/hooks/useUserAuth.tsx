import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUserContext } from '../context/userContext';
import { getUserInfo } from '../store/services/AuthService';
import { dispatch } from '../store/store';
import { NavigationRoutePaths } from '../utils/Navigation/NavigationRoutePaths';

export const useUserAuth = () => {
	const { user, updateUser, clearUser } = useUserContext();
	const navigate = useNavigate();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <Intentionally run with user>
	useEffect(() => {
		if (user) return;

		let isMounted = true;

		const fetchUserInfo = async () => {
			try {
				const { user } = await dispatch(getUserInfo()).unwrap();
				if (isMounted && user) updateUser(user);
			} catch (error: unknown) {
				console.error('Failed to fetch user info:', error);
				if (isMounted) {
					clearUser();
					navigate(NavigationRoutePaths.LOGIN);
				}
			}
		};

		void fetchUserInfo();

		return () => {
			isMounted = false;
		};
	}, [user]);
};
