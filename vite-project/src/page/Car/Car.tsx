import React, { useState } from 'react'
import './car.scss'
import { ArrowBack, Message, Photo } from '@mui/icons-material'
import axios from 'axios'
import useFetch from '../../hooks/useFetch.jsx'
import { useLocation } from 'react-router-dom'
import { Slide } from '../../components/Slide/Slide.js'
import { Chat } from '../../components/Chat/Chat.tsx'

export const Car = () => {
	const data = useLocation().state

	const userId = JSON.parse(localStorage.getItem('user')).id
	const token = localStorage.getItem('token')

	const seller = data?.attributes?.users_permissions_users.data[0]?.id
	const chat_id = Number(userId?.toString() + seller?.toString())
	const chat_id_reverse = seller?.toString() + userId?.toString()

	console.log(chat_id, 'chat_id')

	console.log(userId, 'userID')

	const [isOpen, setIsOpen] = useState(false)

	const getChatId = async () => {
		try {
			const res = await axios.get(
				`http://localhost:1337/api/chats?populate=*&[filters][chat_id][$in]=${chat_id}&[filters][chat_id_reverse][$in]=${chat_id_reverse}`
			)

			return res.data
		} catch (err) {
			console.log(err, 'getChatId error')
		}
	}

	const handleClick = async () => {
		const chatData = await getChatId()
		const chatDataId = chatData?.data[0]?.attributes?.chat_id

		console.log(chatData, 'chatdata')
		console.log(chatDataId, 'chatDataId')

		if (chatDataId === undefined && userId !== seller) {
			try {
				const res = await axios.post(
					`http://localhost:1337/api/chats`,
					{
						data: {
							chat_id,
							chat_id_reverse,
							messages: [],
							users: [userId, seller],
							cars: data.id,
							car_buyer: userId,
							car_seller: seller,
						},
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)

				console.log(res.data, 'chat-data')
			} catch (err) {
				console.log(err, 'err')
			}
		}

		setIsOpen(prev => !prev)
	}

	// let nado = Object.entries(data.attributes)

	console.log(data, 'car-data?')
	// console.log(nado, 'nado')

	return (
		<div className='car'>
			{isOpen && <Chat setIsOpen={setIsOpen}></Chat>}

			<div className='car__container'>
				<div className='car-header-wrapper'>
					<div className='car-header'>
						<div className='car-header-left'>
							<h1>
								{data?.attributes.mark} {data?.attributes.model},{' '}
								{data?.attributes.year_of_release}
							</h1>
							<div className='car-header-infos'>
								<div className='car-header-info'>8 марта</div>
								<div className='car-header-info'>722(50 сегодня)</div>
								<div className='car-header-info'>№ {data?.id}</div>
							</div>
						</div>
						<div className='car-header-right'>
							<div className='car-header-price'>
								<h1>{data?.attributes.price} ₽</h1>
							</div>
						</div>
					</div>
					<div className='car-owner'>
						<div className='car-owner-info'>
							<div className='car-owner-photo'>
								<img
									src='	https://avatars.mds.yandex.net/get-autoru-users/48059/74f33325a9cdb5cdd589d1db7bc523d5/100x100'
									alt=''
								/>
							</div>
							<div className='car-owner-name-address'>
								<div className='car-owner-name'>
									{
										data?.attributes?.users_permissions_users.data[0]
											?.attributes.username
									}
								</div>
								<div className='car-owner-address'>
									<span>kukuevo</span>
								</div>
							</div>
						</div>
						<div className='car-owner-message' onClick={handleClick}>
							<Message style={{ color: 'white' }}></Message>
							<div className='chat-with-owner'>Написать сообщение</div>
						</div>
					</div>
					<div className='car-column'>
						<div className='car-column-left'>
							<ul className='car-card-info'>
								<li className='car-card-availability'>
									<span>Статус</span>
									<span>{data?.attributes.availability}</span>
								</li>
								<li className='car-card-year'>
									<span>Год выпуска</span>
									<span>{data?.attributes.year_of_release}</span>
								</li>
								<li className='car-card-km-age'>
									<span>Пробег</span>
									<span>{data?.attributes.mileage} km</span>
								</li>
								<li className='car-card-body-type'>
									<span>Кузов</span>
									<span>{data?.attributes.body}</span>
								</li>
								<li className='car-card-color'>
									<span>Цвет</span>
									<span>{data?.attributes.color}</span>
								</li>
								<li className='car-card-engine'>
									<span>Двигатель</span>
									<span>{data?.attributes.modification}</span>
								</li>
								<li className='car-card-transmissions'>
									<span>Коробка</span>
									<span>{data?.attributes.transmission}</span>
								</li>
								<li className='car-card-drive'>
									<span>Привод </span>
									<span>{data?.attributes.drive}</span>
								</li>
								<div className='car-card-wheel'>
									<span>Руль</span> <span>Левый</span>
								</div>
								<li className='car-card-owner-count'>
									<span>Владельцы</span> <span>3 или более</span>
								</li>
								<li className='car-card-pts'>
									<span>ПТС</span> <span>Дубликат</span>
								</li>
								<li className='car-card-customs'>
									<span>Таможня</span> <span>Растаможен</span>
								</li>
								<li className='car-card-exchange'>
									<span>Обмен</span> <span>Рассмотрю варианты</span>
								</li>
							</ul>
						</div>
						<div className='car-column-right'>
							<div className='image-gallery'>
								<div className='main-image'>
									<Slide data={data}></Slide>
								</div>
								<div className='all-the-others-image'>
									{data &&
										data?.attributes?.photo.data?.map(item => (
											<img
												src={`http://localhost:1337${item.attributes.url}`}
												alt=''
											/>
										))}
								</div>
							</div>
						</div>
					</div>
					<div className='car-vin-report'>
						<div className='car-vin-button'>
							<button>Купить отчет от 100Р</button>
						</div>
					</div>
					<div className='car-owner-comment'>
						<h1>Комментарий продавца</h1>
					</div>
					<div className='car-recommend'>{data?.attributes.desc}</div>
				</div>
				<div className='sidebar-layout'></div>
			</div>
		</div>
	)
}
