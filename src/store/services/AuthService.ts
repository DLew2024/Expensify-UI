import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
	LoginUserDTO,
	RegisterUserDTO,
	UserResponseDTO,
	UserTokenResponseDTO,
} from '../../api/GeneratedDTOs';
import {
	GET_USER_INFO_THUNK_ID,
	POST_USER_LOGIN_THUNK_ID,
	POST_USER_REGISTER_THUNK_ID,
} from '../../models/Constants/ThunkIds/UserThunkIds';
import { buildAxiosCall, createMutationThunk } from '../services';
import { dispatch } from '../store';
import { uploadImage } from './ImageService';

interface RegisterUserRequest extends Omit<RegisterUserDTO, 'profileImageUrl'> {
	profileImage?: File;
}

//#region GET
export const getUserInfo = createAsyncThunk<UserResponseDTO, void>(
	GET_USER_INFO_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<UserResponseDTO, void>('GET', 'api/auth/getUser');

		return data;
	},
);
//#endregion GET

//#region POST
export const loginUser = createMutationThunk<UserTokenResponseDTO, LoginUserDTO>(
	POST_USER_LOGIN_THUNK_ID,
	async (userLoginCredentials, { thunkId }) => {
		const { data } = await buildAxiosCall<UserTokenResponseDTO, LoginUserDTO>(
			'POST',
			'api/auth/login',
			userLoginCredentials,
			{
				thunkId,
			},
		);

		return data;
	},
);

export const registerUser = createMutationThunk<UserTokenResponseDTO, RegisterUserRequest>(
	POST_USER_REGISTER_THUNK_ID,
	async ({ firstName, lastName, email, password, profileImage }, { thunkId }) => {
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
			{ thunkId },
		);

		return data;
	},
);
//#endregion POST

//#region PUT

//#region DELETE
