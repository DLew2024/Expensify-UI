import axios from 'axios';
import { API_PATHS } from '../utils/apiPaths';
import axiosInstance from '../utils/axiosInstance';
import { uploadImage } from '../utils/Functions/Utility/UploadImage';

export interface User {
	fullName: string;
	email: string;
	password: string;
	profilePictureUrl?: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	user: User;
}

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
	const { data } = await axiosInstance.post<LoginResponse>(API_PATHS.AUTH.LOGIN, credentials);
	return data;
};

export interface RegisterRequest {
	fullName: string;
	email: string;
	password: string;
	profilePictureURL?: File | null;
}

export interface RegisterResponse {
	token: string;
	user: User;
}

export const registerUser = async ({
	fullName,
	email,
	password,
	profilePictureURL,
}: RegisterRequest): Promise<RegisterResponse> => {
	let profilePictureUrl = '';

	if (profilePictureURL) {
		const { imageUrl } = await uploadImage(profilePictureURL);
		profilePictureUrl = imageUrl ?? '';
	}

	const { data } = await axiosInstance.post<RegisterResponse>(API_PATHS.AUTH.REGISTER, {
		fullName,
		email,
		password,
		profilePictureUrl,
	});

	return data;
};

export const handleApiRequest = async <T>(request: () => Promise<{ data: T }>): Promise<T> => {
	try {
		const { data } = await request();
		return data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			throw new Error(
				error.response?.data?.message ?? 'Something went wrong. Please try again later.',
			);
		}

		throw new Error('Something went wrong. Please try again later.');
	}
};
