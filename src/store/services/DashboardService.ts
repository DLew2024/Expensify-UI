import { createAsyncThunk } from '@reduxjs/toolkit';
import type { DashboardDataResponseDTO } from '../../api/GeneratedDTOs';
import { GET_USER_DASHBOARD_INFO_THUNK_ID } from '../../models/Constants/ThunkIds/DashboardThunkIds';
import type { Guid } from '../../utils/DataTypes/Guid';
import { buildAxiosCall } from '../api/buildAxiosCall';

//#region GET
export const getUserDashboardData = createAsyncThunk<DashboardDataResponseDTO, Guid | null>(
	GET_USER_DASHBOARD_INFO_THUNK_ID,
	async (currentlySelectedAccountId) => {
		const url = currentlySelectedAccountId
			? `api/dashboard?accountId=${currentlySelectedAccountId}`
			: 'api/dashboard';

		const { data } = await buildAxiosCall<DashboardDataResponseDTO, void>('GET', url);

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
