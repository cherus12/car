import React, { useEffect } from 'react'
import './login.scss'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/login.js'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../slice/userSlice.js'

export const Login = () => {
	const { register, handleSubmit } = useForm()

	const dispatch = useDispatch()

	const navigate = useNavigate()

	const onSubmit = async data => {
		try {
			const user = await login(data)

			dispatch(setUser(user))
			navigate('/')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='login'>
			<div className='login__container'>
				<div className='login-border'>
					<div className='login-title'>
						<h1>Login</h1>
					</div>
					<form action='#' onSubmit={handleSubmit(onSubmit)}>
						<div className='login-username'>
							<p>Username</p>
							<input type='text' placeholder='name' {...register('username')} />
						</div>
						<div className='login-password'>
							<p>Password</p>
							<input
								type='text'
								placeholder='password'
								{...register('password')}
							/>
						</div>

						<button>Login</button>

						<a href='/register'>
							<span>Регистрация</span>
						</a>
					</form>
				</div>
			</div>
		</div>
	)
}
