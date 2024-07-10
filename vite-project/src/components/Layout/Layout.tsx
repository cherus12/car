import React from 'react'
import './layout.scss'
import Header from '../Header/Header.tsx'
import { Navbar } from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export const Layout = ({ children }) => {
	return (
		<div className='app'>
			<Header></Header>
			<Navbar></Navbar>
			<Outlet></Outlet>
			<Footer></Footer>
		</div>
	)
}
