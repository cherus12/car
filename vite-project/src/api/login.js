import axios from 'axios'

export const login = async data => {
	try {
		const res = await axios.post('http://localhost:1337/api/auth/local', {
			identifier: data.username,
			password: data.password,
		})
		localStorage.setItem('token', res.data.jwt)
		localStorage.setItem(
			'user',
			JSON.stringify({ username: res.data.user.username, id: res.data.user.id })
		)
		// localStorage.setItem('token', res.data)
		// localStorage.setItem('user', JSON.stringify(res.data))

		return res.data
	} catch (err) {
		console.log(err)
		throw err
	}
}
