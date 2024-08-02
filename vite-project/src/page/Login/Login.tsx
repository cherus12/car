import React, { useEffect, useState } from 'react'
import './login.scss'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/login.js'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../slice/userSlice.js'

export const Login = () => {
	const { register, handleSubmit } = useForm()
	const [isDisabled, setIsDisabled] = useState(false)

	const dispatch = useDispatch()

	const navigate = useNavigate()

	const onSubmit = async data => {
		console.log(data)

		try {
			const user = await login(data)

			dispatch(setUser(user))
			navigate('/')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='auth'>
			<div className='auth__wrapper'>
				<div className='auth__wrapper-title'>
					<h1>Login</h1>
				</div>

				<div className='auth__wrapper-form'>
					<form action='#' onSubmit={handleSubmit(onSubmit)}>
						<div className='auth__wrapper-form-item'>
							<p>Username</p>
							<input type='text' placeholder='name' {...register('username')} />
						</div>
						<div className='auth__wrapper-form-item'>
							<p>Password</p>
							<input
								type='text'
								placeholder='password'
								{...register('password')}
							/>
						</div>

						<button disabled={isDisabled}>Login</button>

						<a href='/register'>
							<span>Регистрация</span>
						</a>
					</form>
				</div>
			</div>
		</div>
	)
}

{
	/* <div className='login'>
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
		</div> */
}
