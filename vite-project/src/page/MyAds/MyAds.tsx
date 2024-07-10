import React from 'react'
import useFetch from '../../hooks/useFetch.jsx'
import axios from 'axios'
import { CarsCard } from '../../components/CarsCard/CarsCard.js'
import '../CarsList/carslist.scss'

export const MyAds = () => {
	const user = JSON.parse(localStorage.getItem('user')).id

	console.log(user)
	const { data, error } = useFetch(
		`http://localhost:1337/api/users/${user}?populate=*`
	)

	if (error) {
		console.log(error)
	}

	console.log(data, 'myAds')

	// const getUsers = async () => {
	// 	const token = localStorage.getItem('token')
	// 	const res = await axios.get(
	// 		`http://localhost:1337/api/users/${user}?populate=*`,
	// 		{
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		}
	// 	)

	// 	console.log(res.data, 'user')
	// }
	// getUsers()

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
