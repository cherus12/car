import React, { useEffect, useState } from 'react'
import { Add, ArrowDropDown, Close, Search } from '@mui/icons-material'
import './filtersform.scss'
import {
	Button,
	ButtonGroup,
	FormControl,
	MenuItem,
	Select,
	styled,
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
import { CustomFormControl } from '../../Ui/Form/FormControl.js'

export const FIltersForm = () => {
	const [mark, setMark] = useState(null)

	const [markName, setMarkName] = useState(null)

	const [chooseItem, setChooseItem] = useState([])
	const [chooseItemModel, setChooseItemModel] = useState([])

	const [formState, setFormState] = useState({
		mark: null,
		body: null,
		box: null,
		year_of_release: [],
		engine: null,
		drive: null,
		volume: [],
		price: [],
		mileage: [],
	})

	const filter = useSelector(state => state.filter.body)
	const dispatch = useDispatch()

	const { register, handleSubmit, setValue } = useForm()

	const query = queryModel(chooseItem)

	const { data, error } = useFetch(
		`http://localhost:1337/api/${mark}?populate=*${
			mark == 'models' ? query : ''
		}`
	)

	const handleChange = (item, type) => {
		const updatedMarks = !chooseItem.includes(item)
			? [...chooseItem, item]
			: chooseItem.filter(choose => choose !== item)
		setChooseItem(updatedMarks)
		setValue('mark', updatedMarks.join(','))
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

	useEffect(() => {
		Object.keys(formState).forEach(key => {
			setValue(key, formState[key])
		})
	}, [formState, setValue])

	const CustomizedMenuItem = styled(MenuItem)`
		color: black;

		&:hover {
			background-color: #0c78ed;
			color: white;
		}
	`

	console.log(formState, 'formstate')

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
										<CustomFormControl
											formState={formState.body}
											type={'body'}
											initialState={'Кузов'}
											handleRangeChange={handleRangeChange}
										>
											<CustomizedMenuItem value='Седан'>
												Седан
											</CustomizedMenuItem>
											<CustomizedMenuItem value='Прямой'>
												Прямой
											</CustomizedMenuItem>
										</CustomFormControl>
										<CustomFormControl
											formState={formState.box}
											type={'box'}
											initialState={'Коробка'}
											handleRangeChange={handleRangeChange}
										>
											<CustomizedMenuItem value='box'>Да</CustomizedMenuItem>
										</CustomFormControl>
									</div>
									<div className='filters-form-bottom-items'>
										<CustomFormControl
											formState={formState.year_of_release[0]}
											type={'year_of_release'}
											initialState={'Год от'}
											handleRangeChange={handleRangeChange}
											operator={'$gte'}
										>
											<CustomizedMenuItem value='2024'>2024</CustomizedMenuItem>
											<CustomizedMenuItem value='2025'>2025</CustomizedMenuItem>
										</CustomFormControl>
										<CustomFormControl
											formState={formState.year_of_release[1]}
											type={'year_of_release'}
											initialState={'Год до'}
											handleRangeChange={handleRangeChange}
											operator={'$lte'}
										>
											<CustomizedMenuItem value='2024'>1000</CustomizedMenuItem>
											<CustomizedMenuItem value='2024'>2024</CustomizedMenuItem>
											<CustomizedMenuItem value='2025'>2025</CustomizedMenuItem>
										</CustomFormControl>
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
										<CustomFormControl
											formState={formState.engine}
											type={'engine'}
											initialState={'Двигатель'}
											handleRangeChange={handleRangeChange}
										>
											<CustomizedMenuItem value='Бензин'>
												Бензин
											</CustomizedMenuItem>
											<CustomizedMenuItem value='Дизель'>
												Дизель
											</CustomizedMenuItem>
											<CustomizedMenuItem value='Электро'>
												Электро
											</CustomizedMenuItem>
										</CustomFormControl>

										<CustomFormControl
											formState={formState.drive}
											type={'drive'}
											initialState={'Привод'}
											handleRangeChange={handleRangeChange}
										>
											<CustomizedMenuItem value='Задний'>
												Задний
											</CustomizedMenuItem>
											<CustomizedMenuItem value='Передний'>
												Передний
											</CustomizedMenuItem>
											<CustomizedMenuItem value='Полный'>
												Полный
											</CustomizedMenuItem>
										</CustomFormControl>
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
										<CustomFormControl
											formState={formState.volume[0]}
											type={'volume'}
											initialState={'Объем от, л'}
											handleRangeChange={handleRangeChange}
											operator={'$gte'}
										>
											<CustomizedMenuItem value='0.1'>0.1</CustomizedMenuItem>
											<CustomizedMenuItem value='0.2'>0.2</CustomizedMenuItem>
											<CustomizedMenuItem value='0.3'>0.3</CustomizedMenuItem>
										</CustomFormControl>

										<CustomFormControl
											formState={formState.volume[1]}
											type={'volume'}
											initialState={'Объем до, л'}
											handleRangeChange={handleRangeChange}
											operator={'$lte'}
										>
											<CustomizedMenuItem value='0.1'>0.1</CustomizedMenuItem>
											<CustomizedMenuItem value='0.2'>0.2</CustomizedMenuItem>
											<CustomizedMenuItem value='0.3'>0.3</CustomizedMenuItem>
										</CustomFormControl>
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
