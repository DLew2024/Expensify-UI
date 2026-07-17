import axios from 'axios';
import type { RegisterUserDTO, UserTokenResponseDTO } from '../api/generated/ApiDTOs';
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

interface RegisterUserRequest extends Omit<RegisterUserDTO, 'profileImageUrl'> {
	profileImage?: File;
}

export const registerUser = async ({
	firstName,
	lastName,
	email,
	password,
	profileImage,
}: RegisterUserRequest): Promise<UserTokenResponseDTO> => {
	let profileImageUrl = '';

	if (profileImage) {
		const { imageUrl } = await uploadImage(profileImage);
		profileImageUrl = imageUrl ?? '';
	}

	const request: RegisterUserDTO = {
		firstName,
		lastName,
		email,
		password,
		profileImageURl: profileImageUrl,
	};

	const { data } = await axiosInstance.post<UserTokenResponseDTO>(API_PATHS.AUTH.REGISTER, request);

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
