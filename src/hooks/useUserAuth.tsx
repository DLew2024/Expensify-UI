// import { useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import { useUserContext } from '../context/userContext';

export const useUserAuth = () => {
	// const { user, updateUser, clearUser } = useUserContext();
	// const navigate = useNavigate();
	// useEffect(() => {
	// 	if (user) return;
	// 	// let isMounted = true;
	// 	const fetchUserInfo = async () => {
	// 		// Fix once endpoint is established
	// 		// try {
	// 		// 	const { data } = await dispatch(getUserInfo).unwrap();
	// 		// 	if (isMounted && data) updateUser(data);
	// 		// } catch (error: unknown) {
	// 		// 	console.error('Failed to fetch user info:', error);
	// 		// 	if (isMounted) {
	// 		// 		clearUser();
	// 		// 		navigate(NavigationRoutePaths.LOGIN);
	// 		// 	}
	// 		// }
	// 	};
	// 	void fetchUserInfo();
	// 	return () => {
	// 		// isMounted = false;
	// 	};
	// 	//	}, [user, updateUser, clearUser, navigate]);
	// }, [user]);
};
