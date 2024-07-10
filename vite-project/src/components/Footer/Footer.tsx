import React from 'react'
import './footer.scss'

export const Footer = () => {
	return (
		<div className='footer'>
			<div className='footer__container'>
				<div className='footer-city'>
					<a href=''>Moscow</a>
					<a href=''>Moscow</a>
					<a href=''>Moscow</a>
					<a href=''>Moscow</a>
					<a href=''>Moscow</a>
				</div>

				<div className='footer-area'>
					<a href=''>Краснодарская Область</a>
				</div>

				<div className='footer-about'>
					<div className='footer-about-left'>
						Авто.ру Москва — один из самых посещаемых автомобильных сайтов в
						российском интернете
					</div>
					<div className='footer-about-right'>
						Мы предлагаем большой выбор легковых автомобилей, грузового и
						коммерческого транспорта, мототехники, спецтехники и многих других
						видов транспортных средств
					</div>
				</div>
			</div>
		</div>
	)
}
