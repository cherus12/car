import { ArrowBack } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const Characteristic = ({
	title,
	current,
	type,
	handleClick,
	data,
	registerName,
	handleCharacteristicForm,
}) => {
	const [chooseItem, setChooseItem] = useState(null)

	const handleCharacteristic = (type, value) => {
		setChooseItem(value)
		handleCharacteristicForm(type, value)
	}

	useEffect(() => {
		if (data) {
			handleCharacteristic(type, data[type][0])
		}
	}, [data])

	return (
		<div
			className={`__characteristic ${current == type ? 'active' : ''}`}
			onClick={() => handleClick(type)}
		>
			<div className='characteristic-top'>
				<div className='characteristic-left'>{title || 'da'}</div>
				<div className='characteristic-right'>
					<input
						type='text'
						value={chooseItem ? chooseItem : data && data[type][0]}
					/>
					<ArrowBack className='arrow-down'></ArrowBack>
				</div>
			</div>
			<div className='characteristic-bottom'>
				{/* <ul> */}
				{data && data[type] && data[type]?.length > 0
					? data[type]?.map(item => (
							<li
								className='characteristic-button'
								onClick={() => handleCharacteristic(type, item)}
							>
								<span>{item || ''}</span>
							</li>
					  ))
					: ''}
				{/* </ul> */}
			</div>
		</div>
	)
}
