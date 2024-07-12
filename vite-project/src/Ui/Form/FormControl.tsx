import { FormControl, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'

export const CustomFormControl = ({
	children,
	handleRangeChange,
	formState,
	type,
	initialState,
	operator,
}) => {
	const [value, setValue] = useState(null)

	const handleChange = e => {
		handleRangeChange(type, e.target.value, operator)
		setValue(e.target.value)
	}

	return (
		<FormControl
			sx={{ minWidth: 140, m: 0, maxHeight: '35px', color: 'black' }}
		>
			<Select
				displayEmpty
				inputProps={{ 'aria-label': 'Without label', color: 'black' }}
				value={value ? value : initialState}
				onChange={handleChange}
				sx={{ maxHeight: 35 }}
			>
				<MenuItem value={initialState}>
					<em>{initialState}</em>
				</MenuItem>
				{children}
			</Select>
		</FormControl>
	)
}
