import { ArrowCircleRight } from '@mui/icons-material'
import React from 'react'

export const SmallArrow = ({ rotate, right }) => {
	return (
		<ArrowCircleRight
			style={{
				color: 'grey',
				position: 'absolute',
				rotate: rotate,
				right: right,
				top: '0',
				cursor: 'pointer',
			}}
		></ArrowCircleRight>
	)
}
