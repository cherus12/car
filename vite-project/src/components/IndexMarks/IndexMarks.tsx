import React from 'react'
import { Link } from 'react-router-dom'
import { Restore } from '@mui/icons-material'
import { Button } from '@mui/material'
import useFetch from '../../hooks/useFetch.jsx'

export const IndexMarks = () => {
	const { data, error } = useFetch(`http://localhost:1337/api/marks`)

	console.log(data, 'data-marks')

	return (
		<div className='index-marks'>
			<div className='index-marks-items'>
				{data &&
					data.map(item => (
						<Link to={`/cars?mark=${item.attributes.title}`}>
							<div className='index-marks-item'>
								<div className='index-marks-name'>{item.attributes.title}</div>
								<div className='index-marks-count'>72000</div>
							</div>
						</Link>
					))}
			</div>
			<div className='index-marks-button'>
				<div className='restore-btn'>
					<Restore></Restore>
				</div>
				<Link to={'/cars'}>
					<Button variant='contained'>Показать n предложений</Button>
				</Link>
			</div>
		</div>
	)
}
