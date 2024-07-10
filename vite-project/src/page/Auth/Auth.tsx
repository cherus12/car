import React from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

export const Auth = () => {
	// const { register, handleSubmit } = useForm()

	// const dispatch = useDispatch()

	// const navigate = useNavigate()

	const location = useLocation().pathname.split('/').join('')

	const pathName = location[0].toUpperCase() + location.slice(1)

	console.log(pathName, 'location')

	// const onSubmit = async data => {
	// 	try {
	// 		const user = await login(data)

	// 		// dispatch(setUser(user))
	// 		navigate('/')
	// 	} catch (err) {
	// 		console.log(err)
	// 	}
	// }

	return (
		<div className='login'>
			<div className='login__container'>
				<div className='login-border'>
					<div className='login-title'>
						<h1>Login</h1>
					</div>
					<form action='#'>
						<div className='login-username'>
							<p>Username</p>
							<input type='text' placeholder='name' />
						</div>
						<div className='login-password'>
							<p>Password</p>
							<input type='text' placeholder='password' />
						</div>

						<button>Войти</button>
						<a href='/register'>
							<span>{location}</span>
						</a>
					</form>
				</div>
			</div>
		</div>
	)
}
