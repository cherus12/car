import React, { useEffect, useState } from 'react'
import { Add, ArrowDropDown, Close, Search } from '@mui/icons-material'
import './filtersform.scss'
import {
	Button,
	ButtonGroup,
	FormControl,
	MenuItem,
	Select,
	TextField,
} from '@mui/material'
import { FiltersFormModal } from './FiltersFormModal/FiltersFormModal.js'
import useFetch from '../../hooks/useFetch.jsx'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../../slice/filterSlice.js'
import { queryModel } from '../../api/query.js'
import { isOperator } from '@strapi/utils'

export const FIltersForm = () => {
	const [mark, setMark] = useState(null)

	const [markName, setMarkName] = useState(null)

	const [chooseItem, setChooseItem] = useState([])
	const [chooseItemModel, setChooseItemModel] = useState([])

	const [formState, setFormState] = useState({
		mark: null,
		body: null,
		box: null,
		years: [],
		engine: null,
		drive: null,
		volume: [],
		price: [],
		mileage: [],
	})

	const [formType, setFormType] = useState({
		mark: [],
		models: [],
		generation: [],
	})

	const filter = useSelector(state => state.filter.body)
	const dispatch = useDispatch()

	//
	const [price, setPrice] = useState(null)

	const { register, handleSubmit, setValue } = useForm()

	const query = queryModel(chooseItem)

	// console.log(price, 'price')

	const { data, error } = useFetch(
		`http://localhost:1337/api/${mark}?populate=*${
			mark == 'models' ? query : ''
		}`
	)

	// mark == 'models' && chooseItem.length > 0
	// 	? `http://localhost:1337/api/models?populate=*&[filters][marks][title]=${chooseItem}`
	// 	: `http://localhost:1337/api/${mark}?populate=*`

	// const { data, error } = useFetch(
	// 	`http://localhost:1337/api/${mark}?populate=*&${
	// 		mark == 'models' && chooseItem.length > 0
	// 			? `[filters][marks][title]=${chooseItem}`
	// 			: ''
	// 	}`
	// )

	// ${price ? `[filters][price][$gt]=${price}` : ''}

	// console.log(mark, 'mark')

	// console.log(data, 'data')

	// console.log(chooseItem, 'choose itme')

	const handleChange = (item, type) => {
		const updatedMarks = !chooseItem.includes(item)
			? [...chooseItem, item]
			: chooseItem.filter(choose => choose !== item)
		setChooseItem(updatedMarks)
		setValue('mark', updatedMarks.join(','))
		// console.log(item, 'hc item')
		// console.log(type, 'hc mark')
		// setFormType(prev => {
		// 	const update = (prev[type] || []).includes(item)

		// 	return (
		// 		update
		// 			? { ...prev, [type]: [...prev[type], item] }
		// 			: {
		// 					...prev,
		// 					[type]: (prev[type] || []).filter(choose => choose !== item),
		// 			  },
		// 		setValue(type, item)
		// 	)
		// })
	}

	const handleChangeModel = item => {
		const updatedModels = !chooseItemModel.includes(item)
			? [...chooseItemModel, item]
			: chooseItemModel.filter(model => model != item)
		setChooseItemModel(updatedModels)
		setValue('model', updatedModels.join(','))
	}

	const handleWriting = e => {
		setMarkName(e)
	}

	const [openModal, setOpenModal] = useState(null)

	const handleOpen = item => {
		setOpenModal(prev => (prev !== item ? item : ''))
		setMark(item)
	}

	const onSubmit = e => {
		dispatch(setFilter(e))
	}

	const handleRangeChange = (field, value, operator) => {
		setFormState(prevState => {
			if (operator !== undefined) {
				const newArray = [...(prevState[field] || [])]

				const index = newArray.findIndex(item => item.operator == operator)

				if (index !== -1) {
					newArray[index] = { operator, value }
				} else {
					newArray.push({ operator, value })
				}
				return { ...prevState, [field]: newArray }
			} else {
				return { ...prevState, [field]: value }
			}
		})
	}

	// console.log(filter, 'filter')

	useEffect(() => {
		Object.keys(formState).forEach(key => {
			setValue(key, formState[key])
		})
	}, [formState, setValue])

	// console.log(mark, 'mark')

	// console.log(formType, 'formtype')

	// console.log(formState, 'formstate')

	return (
		<form action='' onSubmit={handleSubmit(onSubmit)}>
			<div className='cars-list-filter-border'>
				<div className='cars-list-filter'>
					<div className='cars-list-filter-top'>
						<div className='filter-header'>
							<div className='filter-header-btns'>
								<ButtonGroup variant='outlined' aria-label='Basic button group'>
									<Button>Все</Button>
									<Button>Новые</Button>
									<Button>С пробегом</Button>
								</ButtonGroup>
							</div>
							<div className='filter-header-checkbox'>
								<div className='filter-header-checkbox-item'>
									<input type='checkbox' />
									<p>В кредит</p>
								</div>
								<div className='filter-header-checkbox-item'>
									<input type='checkbox' />
									<p>Без пробега</p>
								</div>
							</div>
						</div>
						<div className='filter-save-search'>
							<Search></Search>
							<p>Сохранить поиск</p>
						</div>
					</div>
					<div className='cars-list-filter-bottom'>
						<div className='filters-form'>
							<div className='filters-form-item'>
								<div className='filters-form-top'>
									<div
										className='filters-form-main'
										onClick={() => handleOpen('marks')}
									>
										<input
											type='text'
											placeholder={'Марка'}
											value={chooseItem.length > 0 ? chooseItem : ''}
											{...register('mark')}
										/>
										{openModal == 'marks' && (
											<FiltersFormModal
												data={data}
												mark={mark}
												handleChange={handleChange}
												handleChangeModel={handleChangeModel}
											></FiltersFormModal>
										)}
									</div>
								</div>
								<div className='filters-form-bottom'>
									<div className='filters-form-bottom-items'>
										<FormControl sx={{ minWidth: 140, m: 0, height: '35px' }}>
											<Select
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												value={formState.body || 'Кузов'}
												sx={{ height: 35 }}
												onChange={e => {
													handleRangeChange('body', e.target.value)
												}}
											>
												<MenuItem value={'Кузов'} sx={{ color: 'black' }}>
													<p>Кузов</p>
												</MenuItem>
												<MenuItem value={'Седан'} sx={{ color: 'black' }}>
													Седан
												</MenuItem>
											</Select>
										</FormControl>
										<FormControl sx={{ minWidth: 140, m: 0, height: '35px' }}>
											<Select
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												value={formState.box || 'Коробка'}
												onChange={e => {
													handleRangeChange('box', e.target.value)
												}}
												sx={{ height: 35 }}
											>
												<MenuItem value={'Коробка'} sx={{ color: 'black' }}>
													<p>Коробка</p>
												</MenuItem>
												<MenuItem
													value={'Автоматическая'}
													sx={{ color: 'black' }}
												>
													Автоматическая
												</MenuItem>
											</Select>
										</FormControl>
									</div>
									<div className='filters-form-bottom-items'>
										<FormControl sx={{ minWidth: 140, m: 0, height: '35px' }}>
											<Select
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												value={formState.years[0] || 'Год от'}
												onChange={e =>
													handleRangeChange('years', e.target.value, 'gte')
												}
												sx={{ height: 35 }}
											>
												<MenuItem value={'Год от'} sx={{ color: 'black' }}>
													<p>Год от</p>
												</MenuItem>
												<MenuItem value={'2024'} sx={{ color: 'black' }}>
													2024
												</MenuItem>
											</Select>
										</FormControl>
										<FormControl sx={{ minWidth: 140, m: 0, height: '35px' }}>
											<Select
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												value={formState.years[1] || 'до'}
												onChange={e =>
													handleRangeChange('years', e.target.value, '$lte')
												}
												sx={{ height: 35 }}
											>
												<MenuItem value={'до'} sx={{ color: 'black' }}>
													<p>до</p>
												</MenuItem>
												<MenuItem value={'2023'} sx={{ color: 'black' }}>
													2023
												</MenuItem>
											</Select>
										</FormControl>
									</div>
								</div>
							</div>
							<div className='filters-form-item'>
								<div className='filters-form-top'>
									<div
										className='filters-form-main'
										onClick={() => handleOpen('models')}
									>
										<input
											type='text'
											placeholder={'Модель'}
											value={chooseItemModel}
											disabled={chooseItem.length < 1}
											{...register('model')}
										/>
										{openModal == 'models' && (
											<FiltersFormModal
												data={data}
												mark={mark}
												handleChange={handleChange}
												handleChangeModel={handleChangeModel}
											></FiltersFormModal>
										)}
									</div>
								</div>
								<div className='filters-form-bottom'>
									<div className='filters-form-bottom-items'>
										<FormControl sx={{ minWidth: 140, m: 0, height: '35px' }}>
											<Select
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												value={formState.engine || 'Двигатель'}
												onChange={e => {
													handleRangeChange('engine', e.target.value)
												}}
												sx={{ height: 35 }}
											>
												<MenuItem value={'Двигатель'} sx={{ color: 'black' }}>
													<p>Двигатель</p>
												</MenuItem>
												<MenuItem value={'Бензин'} sx={{ color: 'black' }}>
													Бензин
												</MenuItem>
											</Select>
										</FormControl>
										<FormControl sx={{ minWidth: 140, m: 0, height: '35px' }}>
											<Select
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												value={formState.drive || 'Привод'}
												onChange={e => {
													handleRangeChange('drive', e.target.value)
												}}
												sx={{ height: 35 }}
											>
												<MenuItem value={'Привод'} sx={{ color: 'black' }}>
													Привод
												</MenuItem>
												<MenuItem value={'Задний'} sx={{ color: 'black' }}>
													Задний
												</MenuItem>
												<MenuItem value={'Передний'} sx={{ color: 'black' }}>
													Передний
												</MenuItem>
											</Select>
										</FormControl>
									</div>
									<div className='filters-form-bottom-items'>
										<input
											className='input-item'
											placeholder='Пробег от, км'
											onChange={e =>
												handleRangeChange('mileage', e.target.value, '$gte')
											}
										/>
										<input
											className='input-item'
											placeholder='до'
											onChange={e =>
												handleRangeChange('mileage', e.target.value, '$lte')
											}
										/>
									</div>
								</div>
							</div>
							<div className='filters-form-item'>
								<div className='filters-form-top'>
									<div
										className='filters-form-main'
										onClick={() => handleOpen('generation')}
									>
										<input
											type='text'
											placeholder={'Поколение'}
											value={markName}
											onChange={e => handleWriting(e.target.value)}
										/>
										{openModal == 'generation' && (
											<FiltersFormModal
												handleChange={handleChange}
											></FiltersFormModal>
										)}
									</div>
								</div>
								<div className='filters-form-bottom'>
									<div className='filters-form-bottom-items'>
										<FormControl
											sx={{ minWidth: 140, m: 0, maxHeight: '35px' }}
										>
											<Select
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												value={formState.volume[0] || 'Объем от, л'}
												onChange={e =>
													handleRangeChange('volume', e.target.value, '$gte')
												}
												sx={{ maxHeight: 35 }}
											>
												<MenuItem value={'Объем от, л'} sx={{ color: 'black' }}>
													<p>Объем от, л</p>
												</MenuItem>
												<MenuItem value={'0.1'} sx={{ color: 'black' }}>
													0.1 л
												</MenuItem>
												<MenuItem value={'0.2'} sx={{ color: 'black' }}>
													0.2 л
												</MenuItem>
											</Select>
										</FormControl>
										<FormControl sx={{ minWidth: 140, m: 0, height: '35px' }}>
											<Select
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												value={formState.volume[1] || 'до'}
												onChange={e =>
													handleRangeChange('volume', e.target.value, '$lte')
												}
												sx={{ height: 35 }}
											>
												<MenuItem value={'до'} sx={{ color: 'black' }}>
													<p>до</p>
												</MenuItem>
												<MenuItem value={'0.1'} sx={{ color: 'black' }}>
													0.1 л
												</MenuItem>
												<MenuItem value={'0.2'} sx={{ color: 'black' }}>
													0.2 л
												</MenuItem>
												=
											</Select>
										</FormControl>
									</div>
									<div className='filters-form-bottom-items'>
										<input
											className='input-item'
											placeholder='Цена от, Р'
											type='number'
											onChange={e =>
												handleRangeChange('price', e.target.value, '$gte')
											}
										/>
										<input
											className='input-item'
											type='number'
											placeholder='до'
											onChange={e =>
												handleRangeChange('price', e.target.value, '$lte')
											}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<Button
						className='btn-loader'
						variant='contained'
						type='submit'
						onClick={handleSubmit(onSubmit)}
					>
						Показать n предложений
					</Button>
					<div className='car-list-additional-info'>
						<div className='car-list-add-info-item'>
							<span>Все параметры</span>
							<ArrowDropDown></ArrowDropDown>
						</div>
						<div className='car-list-add-info-item'>
							<span>Сбросить</span>
							<Close style={{ width: '18px' }}></Close>
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}
