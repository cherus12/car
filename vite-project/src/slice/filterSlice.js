import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
	name: 'filter',
	initialState: {
		body: {},
	},
	reducers: {
		setFilter: (state, action) => {
			state.body = action.payload
		},
	},
})

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer
