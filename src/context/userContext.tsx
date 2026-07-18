import { createContext, type ReactNode, useContext, useState } from 'react';
import type { UserResponseDTO } from '../api/GeneratedDTOs';

interface UserContextType {
	user: UserResponseDTO | null;
	updateUser: (user: UserResponseDTO) => void;
	clearUser: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
	children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUser] = useState<UserResponseDTO | null>(null);

	const updateUser = (userData: UserResponseDTO) => {
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
