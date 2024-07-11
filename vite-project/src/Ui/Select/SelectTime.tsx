import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'

export const SelectTime = () => {
	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 120, marginTop: '16px' }}>
				<Select
					value={''}
					displayEmpty
					inputProps={{ 'aria-label': 'Without label' }}
				>
					<MenuItem value=''>
						<em>Седан</em>
					</MenuItem>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
			</FormControl>
		</div>
	)
}
