import React, { useEffect, useRef, useState } from 'react'
import './caradd.scss'
import { ArrowBack } from '@mui/icons-material'
import { Button, FormControl, MenuItem, Select } from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import useFetch from '../../hooks/useFetch.jsx'
import { Characteristic } from '../../components/Characteristic/Characteristic.js'

export const CarAdd = () => {
	const { register, handleSubmit } = useForm()

	const [markName, setMarkName] = useState(null)
	// const [model, setModel] = useState(null)
	const [chooseItem, setChooseItem] = useState(null)

	const [type, setType] = useState(null)
	const [current, setCurrent] = useState(null)

	const [files, setFiles] = useState([])

	const handleFile = e => {
		const file = e.target.files
		const all = []

		for (let i = 0; i < file.length; i++) {
			all.push(file[i])
		}

		setFiles(all)
	}

	const [characteristicForm, setCharacteristicForm] = useState({
		body: '',
		color: '',
		drive: '',
		engine: '',
		generation: '',
		title: '',
		transmission: '',
		year: '',
		mark: '',
		model: '',
		marks: '',
	})

	const handleCharacteristicForm = (type, value) => {
		console.log(type, value, 'handleCharacteristicForm')
		setCharacteristicForm(prev => ({ ...prev, [type]: value }))
	}

	console.log(characteristicForm, 'characteristicForm')

	const onSubmit = async item => {
		const data = {
			...item,
			price: Number(item.price),
			mileage: Number(item.price),
			...characteristicForm,
		}

		// console.log(data, 'dataform')

		// console.log(data, 'datas')

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
			const resCarId = res.data.data.id
			getUsers(resCarId)

			console.log(res.data, 'res-data')
		} catch (err) {
			console.error(err)
		}
	}

	const handleClick = event => {
		setCurrent(prev => (event !== prev ? event : ''))
	}

	const handleName = marks => {
		setType(marks)
	}

	const { data, error } = useFetch(
		`http://localhost:1337/api/${type}?populate=*${
			type == 'marks' && markName && `&[filters][title][$containsi]=${markName}`
		}${type == 'models' ? `&[filters][marks][title][$eq]=${markName}` : ''}`
	) // console.log(data, 'data')

	// console.log(type, 'type')

	const getUsers = async carId => {
		const token = localStorage.getItem('token')
		const user = JSON.parse(localStorage.getItem('user')).id
		const cars = {
			cars: carId,
		}
		console.log(cars)

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
			console.log(res.data, 'user - res')
		} catch (err) {
			console.log(err, 'error user')
		}
	}

	console.log(data, 'data')

	const handleChooseItem = item => {
		const converted = {}

		for (let i in item) {
			converted[i] = item[i].split(',') || item[i]
		}

		setChooseItem(converted)
	}

	// console.log(chooseItem, 'chooseitem')

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='card-add'>
				<div className='card-add__container'>
					<div className='offer'>
						<div className='offer-title'>
							<h1>BMW</h1>
						</div>

						<div className='offer-mark' onClick={() => handleName('marks')}>
							<div className='offer-input'>
								<div className='text-offer'>
									<div className='text-placeholder'>Марка</div>
									<div className='text-input'>
										<input
											onChange={e => setMarkName(e.target.value)}
											value={markName}
										/>
									</div>
								</div>
							</div>
							{data?.length > 0 ? (
								<div
									className={`find-items ${type == 'marks' ? 'show' : 'close'}`}
								>
									<ul className='find-items-links'>
										{data.map(item => (
											<li
												className='find-item-link'
												key={item.id}
												onClick={() => {
													handleName('')
													setMarkName(item.attributes.title)
													handleCharacteristicForm(
														'mark',
														item.attributes.title
													)
													handleCharacteristicForm('marks', item.id)
												}}
											>
												<div className='find-item-image'>
													<img
														src='https://avatars.mds.yandex.net/get-verba/216201/2a0000018dc08f7b4ccd9af125955b697894/logo'
														alt=''
													/>
												</div>
												<div className='find-item-name'>
													{item.attributes.title || ''}
												</div>
											</li>
										))}
									</ul>
								</div>
							) : (
								''
							)}
						</div>
						<div className='offer-model' onClick={() => handleName('models')}>
							<div className='offer-input'>
								<div className='text-offer'>
									<div className='text-placeholder'>Модель</div>
									<div className='text-input'>
										<input
											type='text'
											value={chooseItem?.title || ''}
											onChange={e => setModel(e.target.value)}
										/>
									</div>
								</div>
							</div>
							{markName && data.length > 0 && (
								<div
									className={`find-items ${
										type == 'models' ? 'show' : 'close'
									}`}
								>
									<ul className='find-items-links'>
										{data &&
											data.map(item => (
												<li
													className='find-item-link'
													// onClick={() => setChooseItem(item?.attributes)}
													onClick={() => {
														handleChooseItem(item?.attributes)
														handleCharacteristicForm(
															'model',
															item.attributes.title
														)
													}}
												>
													<div className='find-item-image'>
														<img
															src='https://avatars.mds.yandex.net/get-verba/216201/2a0000018dc08f7b4ccd9af125955b697894/logo'
															alt=''
														/>
													</div>
													<div className='find-item-name'>
														{item?.attributes?.title || ''}
													</div>
												</li>
											))}
									</ul>
								</div>
							)}
						</div>
						<div className='offer-characteristic'>
							<h1>Характеристики</h1>
							<Characteristic
								title={'Год выпуска'}
								registerName={'year'}
								current={current}
								type={'year'}
								data={chooseItem}
								handleClick={handleClick}
								handleCharacteristicForm={handleCharacteristicForm}
							></Characteristic>
							<Characteristic
								title={'Кузов'}
								registerName={'body'}
								current={current}
								type={'body'}
								data={chooseItem}
								handleClick={handleClick}
								handleCharacteristicForm={handleCharacteristicForm}
							></Characteristic>
							<Characteristic
								title={'Поколение'}
								registerName={'generation'}
								current={current}
								type={'generation'}
								data={chooseItem}
								handleClick={handleClick}
								handleCharacteristicForm={handleCharacteristicForm}
							></Characteristic>
							<Characteristic
								title={'Двигатель'}
								registerName={'engine'}
								current={current}
								type={'engine'}
								data={chooseItem}
								handleClick={handleClick}
								handleCharacteristicForm={handleCharacteristicForm}
							></Characteristic>
							<Characteristic
								title={'Привод'}
								registerName={'drive'}
								current={current}
								type={'drive'}
								data={chooseItem}
								handleClick={handleClick}
								handleCharacteristicForm={handleCharacteristicForm}
							></Characteristic>
							<Characteristic
								title={'Коробка'}
								registerName={'transmission'}
								current={current}
								type={'transmission'}
								data={chooseItem}
								handleClick={handleClick}
								handleCharacteristicForm={handleCharacteristicForm}
							></Characteristic>
							<Characteristic
								title={'Цвет'}
								registerName={'color'}
								current={current}
								type={'color'}
								data={chooseItem}
								handleClick={handleClick}
								handleCharacteristicForm={handleCharacteristicForm}
							></Characteristic>
						</div>
					</div>

					<div className='offer'>
						<div className='offer-title'>
							<h1>Пробег</h1>
						</div>

						<div className='offer-input'>
							<div className='text-offer'>
								<div className='text-placeholder'>км</div>
								<div className='text-input'>
									<input
										type='text'
										placeholder='11 111'
										{...register('mileage')}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className='offer'>
						<div className='offer-title'>
							<h1>Фото</h1>
						</div>

						<div className='offer-photo'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								class='IconSvg IconSvg_name_SvgPhoto IconSvg_size_32'
							>
								<g fill='currentColor' fill-rule='evenodd'>
									<path d='M11.99 5.988a6 6 0 1 1 0 12 6 6 0 0 1 0-12m6.02-.957-1.657-2.924a2.21 2.21 0 0 0-1.925-1.11h-4.74c-.8 0-1.537.425-1.924 1.108l-1.66 2.926H2.202C.985 5.031 0 5.995 0 7.182L.05 18.8c0 1.19.985 2.151 2.2 2.151h19.522c1.216 0 2.2-.961 2.2-2.15l-.049-11.619c0-1.187-.987-2.15-2.2-2.15H18.01z'></path>
									<path d='M12.021 8.022c-2.205 0-4 1.794-4 4s1.795 4 4 4 4-1.795 4-4-1.794-4-4-4'></path>
								</g>
							</svg>
							<input type='file' onChange={handleFile} multiple />
						</div>
					</div>

					<div className='offer'>
						<div className='offer-title'>
							<h1>Описание</h1>
						</div>
						<div className='textarea-box'>
							<textarea name='' id='' {...register('desc')}></textarea>
						</div>
					</div>

					<div className='offer'>
						<div className='offer-title'>
							<h1>Контакты</h1>
						</div>
						<div className='offer-input'>
							<div className='text-offer'>
								<div className='text-placeholder'>Как к вам обращаться?</div>
								<div className='text-input'>
									<input
										type='text'
										placeholder='Частное лицо'
										{...register('name')}
									/>
								</div>
							</div>
						</div>
						<div className='offer-input'>
							<div className='text-offer'>
								<div className='text-placeholder'>
									Электронная почта(e-mail)
								</div>
								<div className='text-input'>
									<input
										type='text'
										placeholder='name@mail.ru'
										{...register('email')}
									/>
								</div>
							</div>
						</div>
						<div className='offer-phone'>
							<div className='offer-phone-text'>
								<div className='offer-input __small'>
									<div className='text-offer'>
										<div className='text-placeholder'>Номер телефона</div>
										<div className='text-input'>
											<input
												type='text'
												placeholder='+7 123 123 1231'
												{...register('phone')}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className='offer-phone-time'>
								<FormControl sx={{ m: 1, minWidth: 120, marginTop: '16px' }}>
									<Select
										value={''}
										displayEmpty
										inputProps={{ 'aria-label': 'Without label' }}
									>
										<MenuItem value=''>
											<em>Седан</em>
										</MenuItem>
										<MenuItem value={10}>Ten</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem>
									</Select>
								</FormControl>
								<FormControl sx={{ m: 1, minWidth: 120, marginTop: '16px' }}>
									<Select
										value={''}
										displayEmpty
										inputProps={{ 'aria-label': 'Without label' }}
									>
										<MenuItem value=''>
											<em>Седан</em>
										</MenuItem>
										<MenuItem value={10}>Ten</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem>
									</Select>
								</FormControl>
							</div>
						</div>
					</div>

					<div className='offer'>
						<div className='offer-title'>
							<h1>Цена</h1>
						</div>
						<div className='offer-input'>
							<div className='text-offer'>
								<div className='text-input'>
									<input
										type='text'
										placeholder='1 000 000'
										{...register('price')}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='button-submit'>
						<Button onClick={handleSubmit(onSubmit)}>Отправить</Button>
					</div>
				</div>
			</div>
		</form>
	)
}
