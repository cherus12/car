import React from 'react'
import '../Login/login.scss'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
	const { register, handleSubmit } = useForm()

	const navigate = useNavigate()

	const onSubmit = async data => {
		try {
			await axios.post('http://localhost:1337/api/auth/local/register', {
				username: data.username,
				email: data.email,
				password: data.password,
			})
			navigate('/login')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='login'>
			<div className='login__container'>
				<div className='login-border'>
					<div className='login-title'>
						<h1>Register</h1>
					</div>
					<form action='#' onSubmit={handleSubmit(onSubmit)}>
						<div className='login-username'>
							<p>Username</p>
							<input type='text' placeholder='name' {...register('username')} />
						</div>
						<div className='login-username'>
							<p>email</p>
							<input type='text' placeholder='name' {...register('email')} />
						</div>
						<div className='login-password'>
							<p>Password</p>
							<input
								type='text'
								placeholder='password'
								{...register('password')}
							/>
						</div>

						<button>Регистрация</button>
						<a href='/login'>
							<span>Войти</span>
						</a>
					</form>
				</div>
			</div>
		</div>
	)
}
