import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const carsSlice = createApi({
	reducerPath: 'cars',
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
		getCars: builder.query({
			query: (queryToString, page) =>
				`cars?populate=*${queryToString}&pagination[page]=${page}&pagination[pageSize]=10`,
		}),
		getCar: builder.query({
			query: carId => `cars/${carId}?populate=*`,
		}),
	}),
})

export const { useGetCarsQuery, useGetCarQuery } = carsSlice
