import axios from 'axios'

export const carAdd = async (data, files) => {
	const formData = new FormData()
	formData.append('data', JSON.stringify(data))

	files.forEach((file, index) => {
		formData.append(`files.photo`, file, file.name)
	})

	try {
		const res = await axios.post(
			'http://localhost:1337/api/cars?populate*=',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		)

		return res.data.data.id
	} catch (err) {
		console.error(err)
	}
}

export const getUserCars = async user => {
	try {
		const res = await axios.get(
			`http://localhost:1337/api/users/${user}?populate=*`
		)

		const allCars = res.data
		const carsId = allCars?.cars.map(item => item.id)

		return carsId
	} catch (err) {
		console.log(err, 'error')
	}
}

export const getUsers = async (carId, allUsersCars, user) => {
	const token = localStorage.getItem('token')

	const cars = {
		cars: [...allUsersCars, carId],
	}

	try {
		const res = await axios.put(
			`http://localhost:1337/api/users/${user}?populate=*`,
			cars,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		return res.data
	} catch (err) {
		console.log(err, 'error user')
	}
}
