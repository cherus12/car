import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../slice/filterSlice'
import userReducer from '../slice/userSlice'

export default configureStore({
	reducer: {
		filter: filterReducer,
		user: userReducer,
	},
})
