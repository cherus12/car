import React, { useEffect, useState } from 'react'
import './car.scss'
import { ArrowBack, Message, Photo } from '@mui/icons-material'
import axios from 'axios'
import useFetch from '../../hooks/useFetch.jsx'
import { useLocation } from 'react-router-dom'
import { Slide } from '../../components/Slide/Slide.js'
import { Chat } from '../../components/Chat/Chat.tsx'

export const Car = () => {
	const data = useLocation().state

	const [isOpen, setIsOpen] = useState(false)

	const handleClick = () => {
		setIsOpen(prev => !prev)
	}

	console.log(data, 'car-data?')

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
						<div className='car-vin-title'>
							<h1>История автомобиля</h1>
						</div>
						<div className='car-vin-id'>XTA*********</div>
						<div className='car-vin-info'>
							<div className='car-vin-info-item'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									className='IconWithLock__icon-QPoKJ'
								>
									<path
										fill='currentColor'
										fill-rule='evenodd'
										d='M16 7c0-2-1.293-4-4-4-2.708 0-4 2-4 4s1.5 5 4 5 4-3 4-5m1.376 8.702a9.3 9.3 0 0 1 2.397 2.458l.227.34V21H4v-2.5l.227-.34a9.34 9.34 0 0 1 13.149-2.458'
										clip-rule='evenodd'
									></path>
								</svg>
								<div className='car-vin-info__item'>
									<div className='car-vin-info__item-title'>
										Владельцы по ПТС
									</div>
									<div className='car-vin-info__item-desc'>
										4 владельца по ПТС
									</div>
								</div>
							</div>
							<div className='car-vin-info-item'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									className='IconWithLock__icon-QPoKJ'
								>
									<path
										fill='currentColor'
										fill-rule='evenodd'
										d='M16 7c0-2-1.293-4-4-4-2.708 0-4 2-4 4s1.5 5 4 5 4-3 4-5m1.376 8.702a9.3 9.3 0 0 1 2.397 2.458l.227.34V21H4v-2.5l.227-.34a9.34 9.34 0 0 1 13.149-2.458'
										clip-rule='evenodd'
									></path>
								</svg>
								<div className='car-vin-info__item'>
									<div className='car-vin-info__item-title'>
										Владельцы по ПТС
									</div>
									<div className='car-vin-info__item-desc'>
										4 владельца по ПТС
									</div>
								</div>
							</div>
							<div className='car-vin-info-item'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									className='IconWithLock__icon-QPoKJ'
								>
									<path
										fill='currentColor'
										fill-rule='evenodd'
										d='M16 7c0-2-1.293-4-4-4-2.708 0-4 2-4 4s1.5 5 4 5 4-3 4-5m1.376 8.702a9.3 9.3 0 0 1 2.397 2.458l.227.34V21H4v-2.5l.227-.34a9.34 9.34 0 0 1 13.149-2.458'
										clip-rule='evenodd'
									></path>
								</svg>
								<div className='car-vin-info__item'>
									<div className='car-vin-info__item-title'>
										Владельцы по ПТС
									</div>
									<div className='car-vin-info__item-desc'>
										4 владельца по ПТС
									</div>
								</div>
							</div>
							<div className='car-vin-info-item'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									className='IconWithLock__icon-QPoKJ'
								>
									<path
										fill='currentColor'
										fill-rule='evenodd'
										d='M16 7c0-2-1.293-4-4-4-2.708 0-4 2-4 4s1.5 5 4 5 4-3 4-5m1.376 8.702a9.3 9.3 0 0 1 2.397 2.458l.227.34V21H4v-2.5l.227-.34a9.34 9.34 0 0 1 13.149-2.458'
										clip-rule='evenodd'
									></path>
								</svg>
								<div className='car-vin-info__item'>
									<div className='car-vin-info__item-title'>
										Владельцы по ПТС
									</div>
									<div className='car-vin-info__item-desc'>
										4 владельца по ПТС
									</div>
								</div>
							</div>

							<div className='car-vin-info-item'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									className='IconWithLock__icon-QPoKJ'
								>
									<path
										fill='currentColor'
										fill-rule='evenodd'
										d='M16 7c0-2-1.293-4-4-4-2.708 0-4 2-4 4s1.5 5 4 5 4-3 4-5m1.376 8.702a9.3 9.3 0 0 1 2.397 2.458l.227.34V21H4v-2.5l.227-.34a9.34 9.34 0 0 1 13.149-2.458'
										clip-rule='evenodd'
									></path>
								</svg>
								<div className='car-vin-info__item'>
									<div className='car-vin-info__item-title'>
										Владельцы по ПТС
									</div>
									<div className='car-vin-info__item-desc'>
										4 владельца по ПТС
									</div>
								</div>
							</div>
							<div className='car-vin-info-item'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									className='IconWithLock__icon-QPoKJ'
								>
									<path
										fill='currentColor'
										fill-rule='evenodd'
										d='M16 7c0-2-1.293-4-4-4-2.708 0-4 2-4 4s1.5 5 4 5 4-3 4-5m1.376 8.702a9.3 9.3 0 0 1 2.397 2.458l.227.34V21H4v-2.5l.227-.34a9.34 9.34 0 0 1 13.149-2.458'
										clip-rule='evenodd'
									></path>
								</svg>
								<div className='car-vin-info__item'>
									<div className='car-vin-info__item-title'>
										Владельцы по ПТС
									</div>
									<div className='car-vin-info__item-desc'>
										4 владельца по ПТС
									</div>
								</div>
							</div>
						</div>
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
