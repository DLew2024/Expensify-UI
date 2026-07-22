//#region GET

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UPLOAD_IMAGE_THUNK_ID } from '../../models/Constants/ThunkIds/ImageThunkIds';
import { buildAxiosCall, createMutationThunk } from '../services';

interface UploadImageResponse {
	imageUrl?: string;
}

//#endregion GET

//#region POST
export const uploadImage = createMutationThunk<UploadImageResponse, File>(
	UPLOAD_IMAGE_THUNK_ID,
	async (imageFile, { thunkId }) => {
		const formData = new FormData();
		formData.append('image', imageFile);

		const { data } = await buildAxiosCall<UploadImageResponse, FormData>(
			'POST',
			'api/image/upload-image',
			formData,
			{
				thunkId,
			},
		);

		return data;
	},
);
//#endregion POST

//#region PUT

//#endregion PUT

//#region DELETE

//#endregion DELETE
