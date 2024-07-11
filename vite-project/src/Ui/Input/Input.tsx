import React from 'react'

export const Input = ({ title, placeholder, register, set, value }) => {
	const handleChange = e => {
		set(e.target.value)
		register.onChange(e)
	}

	return (
		<div className='offer-input'>
			<div className='text-offer'>
				<div className='text-placeholder'>{title}</div>
				<div className='text-input'>
					<input
						type='text'
						placeholder={placeholder}
						value={value}
						{...register}
						onChange={handleChange}
					></input>
				</div>
			</div>
		</div>
	)
}
