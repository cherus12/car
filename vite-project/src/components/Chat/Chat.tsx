import React, { useEffect, useState } from 'react'
import './chat.scss'
import { Close } from '@mui/icons-material'
import useFetch from '../../hooks/useFetch.jsx'
import axios from 'axios'
import { ChatSidebar } from './ChatSidebar.tsx'
import { ChatRight } from './ChatRight.tsx'
import { io } from 'socket.io-client'
import { useSocketQuery } from '../../hooks/useSocketQuery.tsx'

export const Chat = ({ setIsOpen }) => {
	const [currentChat, setCurrentChat] = useState()

	useSocketQuery()

	const user = JSON.parse(localStorage.getItem('user'))

	const [data, setData] = useState()

	useEffect(() => {
		const fetch = async () => {
			const res = await axios.get(`
				http://localhost:1337/api/chats?populate=*
				&[filters][$or][0][car_buyer][$eq]=${user.id}
				&[filters][$or][1][car_seller][$eq]=${user.id}
				`)
			setData(res.data)
		}

		fetch()
	}, [])

	const handleClick = data => {
		setCurrentChat(data)
	}

	return (
		<div className='chat-wrapper'>
			<ChatSidebar
				data={data}
				setIsOpen={setIsOpen}
				handleClick={handleClick}
			></ChatSidebar>
			<ChatRight
				currentChat={currentChat}
				chat_id={currentChat?.chat_id}
			></ChatRight>
		</div>
	)
}
