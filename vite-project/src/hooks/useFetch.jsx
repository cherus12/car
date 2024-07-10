import dotenv from 'dotenv'
import { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = url => {
	const [data, setData] = useState()
	const [error, setError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [totalCount, setTotalCount] = useState(0)

	const myAds = url.split('/')
	const myAdsWord = myAds.slice(-2)[0]

	const token = localStorage.getItem('token')

	useEffect(() => {
		const fetch = async () => {
			try {
				setIsLoading(true)
				const res = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				setTotalCount(res?.data?.meta?.pagination?.total)
				setData(myAdsWord == 'users' ? res.data : res.data.data)
			} catch (err) {
				setError(err)
			}
			setIsLoading(false)
		}

		fetch()
	}, [url])

	const reFetch = async () => {
		try {
			setIsLoading(true)

			const res = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setData(myAdsWord == 'users' ? res.data : res.data.data)
		} catch (err) {
			setError(err)
		}
		setIsLoading(false)
	}

	return { data, error, reFetch, isLoading, totalCount }
}

export default useFetch
