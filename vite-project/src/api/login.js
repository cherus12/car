import axios from 'axios'

export const login = async data => {
	try {
		const res = await axios.post('http://localhost:1337/api/auth/local', {
			identifier: data.username,
			password: data.password,
		})
		localStorage.setItem('token', res.data.jwt)
		localStorage.setItem('user', JSON.stringify(res.data.user))

		return res.data
	} catch (err) {
		console.log(err)
	}
}
