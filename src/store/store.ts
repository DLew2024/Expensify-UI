import {
	combineReducers,
	configureStore,
	type PreloadedStateShapeFromReducersMapObject,
} from '@reduxjs/toolkit';
import { thunkMiddleware } from './middleware/thunkMiddleware';
import accountsReducer from './slices/accountsSlice';
import expensesReducer from './slices/expensesSlice';
import filtersReducer from './slices/filtersSlice';

const customMiddleware = [thunkMiddleware];

const rootReducer = combineReducers({
	accounts: accountsReducer,
	expenses: expensesReducer,
	filters: filtersReducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({ serializableCheck: false }).concat([...customMiddleware]);
	},
});

export const setupStore = (
	preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>,
) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export const dispatch = store.dispatch;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
