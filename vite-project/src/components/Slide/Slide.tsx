import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ArrowBack } from '@mui/icons-material'

export const SampleNextArrow = props => {
	const { className, style, onClick } = props
	return (
		<ArrowBack
			sx={{
				position: 'absolute',
				color: 'white',
				zIndex: '2',
				right: '0',
				top: '50%',
				rotate: '180deg',
			}}
			onClick={onClick}
		></ArrowBack>
	)
}

export const SamplePrevArrow = props => {
	const { className, style, onClick } = props
	return (
		<ArrowBack
			sx={{
				position: 'absolute',
				color: 'white',
				zIndex: '2',
				top: '50%',
			}}
			onClick={onClick}
		></ArrowBack>
	)
}

export const Slide = ({ data }) => {
	const settings = {
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		adaptiveHeight: true,
		variableWidth: true,
		nextArrow: <SampleNextArrow></SampleNextArrow>,
		prevArrow: <SamplePrevArrow></SamplePrevArrow>,
	}

	return (
		<div className='slider-container'>
			<Slider {...settings}>
				{data &&
					data.attributes.photo.data.map(item => (
						<div>
							<img src={`http://localhost:1337${item.attributes.url}`} alt='' />
						</div>
					))}
			</Slider>
		</div>
	)
}
