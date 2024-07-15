import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api' }),
	endpoints: builder => ({
		getUsers: builder.query({
			query: () => 'users?populate=*',
		}),
		getMarks: builder.query({
			query: () => 'marks?populate=*',
		}),
		getModels: builder.query({
			query: () => 'model?populate=*',
		}),
		getCars: builder.query({
			query: () => 'cars?populate=*',
		}),
	}),
})

export const {
	useGetUsersQuery,
	useGetMarksQuery,
	useGetModelsQuery,
	useGetCarsQuery,
} = apiSlice
