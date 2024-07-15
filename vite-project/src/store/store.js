import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../slice/filterSlice'
import userReducer from '../slice/userSlice'
import { apiSlice } from '../slice/apiSlice'

export default configureStore({
	reducer: {
		filter: filterReducer,
		user: userReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
})
