import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUserContext } from '../context/userContext';
import { API_PATHS } from '../utils/apiPaths';
import axiosInstance from '../utils/axiosInstance';
import { NavigationRoutePaths } from '../utils/Navigation/NavigationRoutePaths';

export const useUserAuth = () => {
	const { user, updateUser, clearUser } = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) return;

		// let isMounted = true;

		const fetchUserInfo = async () => {
			// Fix once endpoint is established
			// try {
			// 	const { data } = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
			// 	if (isMounted && data) updateUser(data);
			// } catch (error: unknown) {
			// 	console.error('Failed to fetch user info:', error);
			// 	if (isMounted) {
			// 		clearUser();
			// 		navigate(NavigationRoutePaths.LOGIN);
			// 	}
			// }
		};

		void fetchUserInfo();

		return () => {
			// isMounted = false;
		};
		//	}, [user, updateUser, clearUser, navigate]);
	}, [user]);
};
