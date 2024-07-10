import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'

export default function ButtonsGroup() {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				'& > *': {
					m: 1,
				},
			}}
		>
			<div
				style={{
					display: 'flex',
					width: '100%',
					justifyContent: 'space-between',
				}}
			>
				<ButtonGroup variant='outlined' aria-label='Basic button group'>
					<Button>Все</Button>
					<Button>Новые</Button>
					<Button>С пробегом</Button>
				</ButtonGroup>
				<ButtonGroup variant='outlined' aria-label='Basic button group'>
					<Button>Марки</Button>
					<Button>Помощник</Button>
				</ButtonGroup>
			</div>
		</Box>
	)
}
