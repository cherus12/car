import React from 'react'
import './home.scss'
import ButtonsGroup from '../../components/ButtonsGroup/ButtonsGroup'
import { MarkLogo } from '../../components/MarkLogo/MarkLogo'
import { Button } from '@mui/material'
import { Restore } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { IndexMarks } from '../../components/IndexMarks/IndexMarks'

export const Home = () => {
	return (
		<div className='main'>
			<div className='main__container'>
				<h1 className='main-title'>Легковые автомобили</h1>
				<div className='buttons-group'>
					<ButtonsGroup></ButtonsGroup>
				</div>
				<MarkLogo></MarkLogo>
				<IndexMarks></IndexMarks>

				<div className='recommendations'>
					<img
						src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' fill='none'%3E%3Crect width='22' height='22' fill='%23000' rx='6'/%3E%3Cpath fill='%23CF0' d='M15.716 9.429A8.39 8.39 0 0 1 9.43 3.143a8.39 8.39 0 0 1-6.285 6.286 8.39 8.39 0 0 1 6.285 6.285 8.39 8.39 0 0 1 6.286-6.285m3.143 6.285a4.19 4.19 0 0 1-3.143-3.143 4.19 4.19 0 0 1-3.143 3.143 4.19 4.19 0 0 1 3.143 3.143 4.19 4.19 0 0 1 3.143-3.143'/%3E%3C/svg%3E"
						alt=''
					/>
					<h1>Рекомендации</h1>
				</div>
			</div>
		</div>
	)
}
