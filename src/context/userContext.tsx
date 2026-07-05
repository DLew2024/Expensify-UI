import { createContext, type ReactNode, useContext, useState } from 'react';
import type { User } from '../services/authService';

interface UserContextType {
	user: User | null;
	updateUser: (user: User) => void;
	clearUser: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
	children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUser] = useState<User | null>(null);

	const updateUser = (userData: User) => {
		setUser(userData);
	};

	const clearUser = () => {
		setUser(null);
	};

	return (
		<UserContext.Provider
			value={{
				user,
				updateUser,
				clearUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;

export function useUserContext() {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}

	return context;
}
