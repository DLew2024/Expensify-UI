import { createAsyncThunk } from '@reduxjs/toolkit';
import type { DashboardDataResponseDTO } from '../../api/GeneratedDTOs';
import { GET_USER_DASHBOARD_INFO_THUNK_ID } from '../../models/Constants/ThunkIds/DashboardThunkIds';
import { buildAxiosCall } from '../api/buildAxiosCall';

//#region GET
export const getUserDashboardData = createAsyncThunk<DashboardDataResponseDTO, void>(
	GET_USER_DASHBOARD_INFO_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<DashboardDataResponseDTO, void>('GET', 'api/dashboard');

		return data;
	},
);
//#endregion GET

//#region POST

//#endregion POST

//#region PUT

//#endregion PUT

//#region DELETE

//#endregion DELETE
