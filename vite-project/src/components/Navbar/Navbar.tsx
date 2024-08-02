import React from 'react'
import './navbar.scss'

export const Navbar = () => {
	return (
		<div className='navbar'>
			<div className='navbar__container'>
				<ul className='navbar-links'>
					<li className='navbar-link'>
						<a href=''>Легковые</a>
					</li>
					<li className='navbar-link'>
						<a href=''>Коммерческие</a>
					</li>
					<li className='navbar-link'>
						<a href=''>Электро</a>
					</li>
					<li className='navbar-link'>
						<a href=''>Китайские</a>
					</li>
					<li className='navbar-link'>
						<a href=''>Мото</a>
					</li>
					<li className='navbar-link'>
						<a href=''>Отчеты</a>
					</li>
					<li className='navbar-link'>
						<a href=''>Выкуп</a>
					</li>
					<li className='navbar-link'>
						<a href=''>Кредиты</a>
					</li>
					<li className='navbar-link close'>
						<a href=''>Оценка авто</a>
					</li>
					<li className='navbar-link close'>
						<a href=''>Страховки</a>
					</li>
					<li className='navbar-link close'>
						<a href=''>Гараж</a>
					</li>
					<li className='navbar-link close'>
						<a href=''>Журнал</a>
					</li>
					<li className='navbar-link close'>
						<a href=''>Для бизнеса</a>
					</li>
				</ul>
			</div>
		</div>
	)
}
