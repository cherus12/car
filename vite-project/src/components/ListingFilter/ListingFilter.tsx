import { FormControl, MenuItem, Select, styled } from '@mui/material'
import React, { useState } from 'react'

export const ListingFilter = () => {
	const [sort, setSort] = useState<string>('')
	const [date, setDate] = useState<string>('')

	const CustomizedMenuItem = styled(MenuItem)`
		color: black;
	`

	const handleChangeSort = e => {
		setSort(e.target.value)
	}

	const handleChangeDate = e => {
		setDate(e.target.value)
	}

	return (
		<div className='listing-filter'>
			<div className='filters-form-bottom-items'>
				<FormControl sx={{ m: 1, width: 160, color: 'black' }}>
					<Select
						value={sort}
						displayEmpty
						onChange={handleChangeSort}
						inputProps={{
							'aria-label': 'Without label',
							color: 'black',
							overflow: 'hidden',
						}}
					>
						<CustomizedMenuItem value=''>
							<em>Сортировка</em>
						</CustomizedMenuItem>
						<CustomizedMenuItem value={'years_of_release'}>
							<em>По дате размещения</em>
						</CustomizedMenuItem>
						<CustomizedMenuItem value={'321'}>
							<em>По возрастанию цены</em>
						</CustomizedMenuItem>
						<CustomizedMenuItem value={'По убыванию цены'}>
							<em>По убыванию цены</em>
						</CustomizedMenuItem>
						<CustomizedMenuItem value={'По году:новее'}>
							<em>По году:новее</em>
						</CustomizedMenuItem>
						<CustomizedMenuItem value={'По году:старше'}>
							<em>По году:старше</em>
						</CustomizedMenuItem>
						<CustomizedMenuItem value={'mileage'}>
							<em>По пробегу</em>
						</CustomizedMenuItem>
					</Select>
				</FormControl>
				<FormControl
					sx={{ m: 1, width: 160 }}
					className='listing-filter__form-control'
				>
					<Select
						value={date}
						displayEmpty
						onChange={handleChangeDate}
						inputProps={{ 'aria-label': 'Without label', overflow: 'hidden' }}
					>
						<CustomizedMenuItem value=''>
							<em>Время размещения</em>
						</CustomizedMenuItem>
						<CustomizedMenuItem value={'years_of_release'}>
							<em>За все время</em>
						</CustomizedMenuItem>
						<CustomizedMenuItem value={'321'}>
							<em>За сутки</em>
						</CustomizedMenuItem>
						<CustomizedMenuItem value={'По убыванию цены'}>
							<em>За 2 дня</em>
						</CustomizedMenuItem>
						<CustomizedMenuItem value={'По году:новее'}>
							<em>За 3 дня</em>
						</CustomizedMenuItem>
						<CustomizedMenuItem value={'По году:старше'}>
							<em>За неделю</em>
						</CustomizedMenuItem>
						<CustomizedMenuItem value={'mileage'}>
							<em>За 2 недели</em>
						</CustomizedMenuItem>
						<CustomizedMenuItem value={'mileage'}>
							<em>За 3 недели</em>
						</CustomizedMenuItem>
						<CustomizedMenuItem value={'mileage'}>
							<em>За месяц</em>
						</CustomizedMenuItem>
					</Select>
				</FormControl>
			</div>
			<div className='show-discounts'>
				<input type='checkbox' />
				<p>Показать скидки</p>
			</div>
		</div>
	)
}
