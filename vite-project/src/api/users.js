import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userSlice = createApi({
	reducerPath: 'users',
	baseQuery: fetchBaseQuery({
		baseUrl: `http://localhost:1337/api`,
		prepareHeaders: (headers, { getState }) => {
			const token = localStorage.getItem('token')

			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}

			return headers
		},
	}),
	endpoints: builder => ({
		getUsers: builder.query({
			query: () => `users?populate=*`,
		}),
		getUser: builder.query({
			query: userId => `users/${userId}?populate=*`,
		}),
		getUserProfile: builder.query({
			query: () => `users/me?populate=*`,
		}),
	}),
})

export const { useGetUsersQuery, useGetUserQuery, useGetUserProfileQuery } =
	userSlice
