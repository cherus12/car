import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../slice/filterSlice'
import userReducer from '../slice/userSlice'
import { apiSlice } from '../slice/apiSlice'
import { userSlice } from '../api/users'
import { carsSlice } from '../api/cars'

export default configureStore({
	reducer: {
		filter: filterReducer,
		user: userReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		[userSlice.reducerPath]: userSlice.reducer,
		[carsSlice.reducerPath]: carsSlice.reducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			apiSlice.middleware,
			userSlice.middleware,
			carsSlice.middleware
		),
})
