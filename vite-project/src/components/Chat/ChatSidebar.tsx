import { Close } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { ChatSidebarCard } from './ChatSidebarCard'

export const ChatSidebar = ({ setIsOpen, data, handleClick }) => {
	const [result, setResult] = useState([])

	const userId = JSON.parse(localStorage.getItem('user')).id

	useEffect(() => {
		if (data) {
			const processData = data.data.map(item => {
				const [firstUser, secondUser] = item.attributes.users.data
				return {
					username:
						firstUser.id === userId
							? secondUser.attributes.username
							: firstUser.attributes.username,
					cars: item.attributes.cars.data,
					chat_id: item.id,
				}
			})

			setResult(processData)
		}
	}, [data])

	console.log(result, 'result')

	console.log(data, 'data-sidebar')

	return (
		<div className='chat-sidebar'>
			<div className='chat-sidebar-container'>
				<div className='chat-sidebar-top'>
					<div className='chat-sidebar-title' onClick={() => setIsOpen(false)}>
						<Close className='btn-close'></Close>
						<h1>Сообщения</h1>
					</div>
				</div>
				<div className='chat-sidebar-bottom'>
					{result &&
						result?.map(item => {
							const username = item.username
							const cars = item.cars[0].attributes
							const chat_id = item.chat_id

							return (
								<ChatSidebarCard
									key={item.id}
									username={username}
									cars={cars}
									chat_id={chat_id}
									handleClick={handleClick}
								/>
							)
						})}
				</div>
			</div>
		</div>
	)
}
