import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch.jsx'
import axios from 'axios'
import { CarsCard } from '../../components/CarsCard/CarsCard.js'
import { useGetUserProfileQuery } from '../../api/users.js'
import '../CarsList/carslist.scss'

export const MyAds = () => {
	const { data, error } = useFetch(
		`http://localhost:1337/api/users/me?populate=*`
	)

	console.log(data, 'data-myads')

	return (
		<div className='myads'>
			<div className='myads__container'>
				<div className='listing-cars-cards'>
					{data?.cars?.map(item => (
						<CarsCard item={item}></CarsCard>
					))}
				</div>
			</div>
		</div>
	)
}
