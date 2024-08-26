import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		body: {},
	},
	reducers: {
		setUser: (state, action) => {
			state.body = action.payload
		},
	},
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
