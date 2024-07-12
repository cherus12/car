import React, { useEffect, useState } from 'react'
import './carslist.scss'
import {
	ButtonGroup,
	Checkbox,
	FormControl,
	FormHelperText,
	MenuItem,
	Select,
} from '@mui/material'
import Button from '@mui/material/Button'
import {
	ArrowBack,
	ArrowCircleRight,
	ArrowDownward,
	ArrowDropDown,
	Close,
	Search,
} from '@mui/icons-material'
import { FIltersForm } from '../../components/FIltersForm/FIltersForm'
import { CarsCard } from '../../components/CarsCard/CarsCard'
import useFetch from '../../hooks/useFetch.jsx'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { buildQueryString } from '../../api/query.js'
import { ListingFilter } from '../../components/ListingFilter/ListingFilter.js'
import { SmallArrow } from '../../Ui/Arrow/SmallArrow.js'

export const CarsList = () => {
	const [page, setPage] = useState(1)
	// const [isFetching, setIsFetching] = useState(true)
	const [allData, setAllData] = useState([])

	const location = useLocation().search
	let mark = location.split('=')
	// const hasMark = mark.length > 1

	const filter = useSelector(state => state.filter.body)

	const d = Object.entries(filter).filter(
		item =>
			typeof item[1] == 'string' ||
			typeof item[1] == 'number' ||
			Array.isArray(item[1])
	)

	// console.log(y, 'filter')

	// if (Object.entries(filter)) {
	// 	console.log(Object.entries(filter), 'есть')
	// } else {
	// 	console.log('нет')
	// }

	const queryToString = buildQueryString(filter)

	const { data, error, reFetch, isLoading, totalCount } = useFetch(
		`http://localhost:1337/api/cars?populate=*${queryToString}&pagination[page]=${page}&pagination[pageSize]=10`
	)

	// console.log(data, 'data-list')

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)

		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, [totalCount, allData, page])

	const scrollHandler = async e => {
		const scrollHeight = e.target.documentElement.scrollHeight
		const scrollTop = e.target.documentElement.scrollTop
		const innerHeight = window.innerHeight

		if (
			scrollTop + innerHeight >= scrollHeight - 50 &&
			allData.length < totalCount &&
			page < Math.round(totalCount / 10) + 1
		) {
			setPage(prevPage => prevPage + 1)
		}
	}

	useEffect(() => {
		if (!data) return

		setAllData(prev => (d.length > 0 ? data : [...prev, ...data]))
	}, [data])

	return (
		<div className='cars-list'>
			<div className='cars-list__container'>
				<div className='cars-list-title'>
					<h1>Купить {mark[1]}</h1>
				</div>

				<FIltersForm></FIltersForm>

				<div className='filter-price'>
					<ul>
						<li>до 50 000$</li>
						<li>до 50 000$</li>
						<li>до 50 000$</li>
						<li>до 50 000$</li>
					</ul>
					<SmallArrow rotate='180deg' right='20px'></SmallArrow>
					<SmallArrow right='0'></SmallArrow>
				</div>

				<ListingFilter></ListingFilter>

				<div className='listing-cars-cards'>
					{allData &&
						allData?.map(item => (
							<Link to={`/car/${item.id}`} state={item}>
								<CarsCard item={item?.attributes}></CarsCard>
							</Link>
						))}
				</div>
			</div>
		</div>
	)
}
