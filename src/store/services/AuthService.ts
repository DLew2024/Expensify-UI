import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
	LoginUserDTO,
	RegisterUserDTO,
	UserTokenResponseDTO,
} from '../../api/generated/ApiDTOs';
import {
	GET_USER_INFO_THUNK_ID,
	POST_USER_LOGIN_THUNK_ID,
	POST_USER_REGISTER_THUNK_ID,
} from '../../models/Constants/ThunkIds/User';
import { buildAxiosCall } from '../services';
import { dispatch } from '../store';
import { uploadImage } from './ImageService';

interface RegisterUserRequest extends Omit<RegisterUserDTO, 'profileImageUrl'> {
	profileImage?: File;
}
export interface UploadImageResponse {
	imageUrl?: string;
}

//#region GET
export const getUserInfo = createAsyncThunk<UserTokenResponseDTO, void>(
	GET_USER_INFO_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<UserTokenResponseDTO, void>('GET', 'api/auth/getUser');

		return data;
	},
);
//#endregion GET

//#region POST
export const loginUser = createAsyncThunk<UserTokenResponseDTO, LoginUserDTO>(
	POST_USER_LOGIN_THUNK_ID,
	async (userLoginCredentials) => {
		const { data } = await buildAxiosCall<UserTokenResponseDTO, LoginUserDTO>(
			'POST',
			'api/auth/login',
			userLoginCredentials,
		);

		return data;
	},
);

export const registerUser = createAsyncThunk<UserTokenResponseDTO, RegisterUserRequest>(
	POST_USER_REGISTER_THUNK_ID,
	async ({ firstName, lastName, email, password, profileImage }) => {
		let profileImageUrl = '';

		if (profileImage) {
			const { imageUrl } = await dispatch(uploadImage(profileImage)).unwrap();
			profileImageUrl = imageUrl ?? '';
		}

		const request: RegisterUserDTO = {
			firstName,
			lastName,
			email,
			password,
			profileImageURl: profileImageUrl,
		};
		const { data } = await buildAxiosCall<UserTokenResponseDTO, RegisterUserDTO>(
			'POST',
			'api/auth/register',
			request,
		);

		return data;
	},
);
//#endregion POST

//#region PUT

//#region DELETE
