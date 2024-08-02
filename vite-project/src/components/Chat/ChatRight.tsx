import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const ChatRight = ({ currentChat, chat_id }) => {
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])
	const token = localStorage.getItem('token')
	const user = JSON.parse(localStorage.getItem('user'))
	const socket = io('http://localhost:1337')

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetch = async () => {
			const res = await axios.get(`http://localhost:1337/api/chats/${chat_id}`)

			setMessages(res.data.data.attributes.messages)
		}

		if (chat_id) {
			fetch()
			setIsLoading(false)
		}
	}, [chat_id, isLoading])

	useEffect(() => {
		socket.on('recvMsg', newMessages => {
			setMessages(prev => [...prev, newMessages])
		})

		return () => {
			socket.off('recvMsg')
		}
	}, [socket])

	const handleSendMessage = async () => {
		try {
			const res = await axios.get(
				`http://localhost:1337/api/chats/${currentChat?.chat_id}`
			)

			const messages = res.data.data.attributes.messages
			const newMessage = {
				username: user.username,
				userId: user.id,
				message,
				timestamp: new Date().toISOString(),
			}

			await axios.put(
				`http://localhost:1337/api/chats/${currentChat?.chat_id}`,
				{
					data: {
						messages: [...messages, newMessage],
					},
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			setMessage('')
			setMessages(prev => [...prev, newMessage])
			socket.emit('sendMessage', newMessage)
			setIsLoading(true)
		} catch (err) {
			console.log(err, 'handleSendMessage ERROR')
		}
	}

	console.log(messages, 'messages')

	return (
		<div className='chat-right'>
			<div className='chat-right-head'>
				<div className='chat-right-head-title'>{currentChat?.username}</div>
				<div className='chat-right-head-status'>Был(а) в 14:31</div>
			</div>
			<div className='chat-right-pinned-car'>
				<div className='chat-right-pinned-car-image'>
					<img
						src='	https://avatars.mds.yandex.net/get-autoru-vos/2023653/43ffb895a8313598c0a8f3eef6e52762/1200x900n'
						alt=''
					/>
				</div>
				<div className='chat-right-pinned-car-info'>
					<div className='chat-right-pinned-car-price'>
						{currentChat?.cars.price}
					</div>
					<div className='chat-right-pinned-car-link-title'>
						<a href=''>
							{currentChat?.cars.mark} {currentChat?.cars.model}
						</a>
					</div>
				</div>
			</div>
			<div className='chat'>
				<div className='messages'>
					{messages &&
						messages?.map(item => (
							<div className={`message-user`}>
								<div className='message-user-info'>
									<div className='message-user-photo'>1</div>
									<div className='message-user-name'>{item?.username}</div>
								</div>
								<div className='message-user-text'>{item?.message}</div>
							</div>
						))}
				</div>
				<div className='chat-input'>
					<div className='chat-border'>
						<div className='chat-icons'></div>
						<div className='chat-input-text'>
							<textarea
								className='chat-input-textarea'
								value={message}
								onChange={e => setMessage(e.target.value)}
								placeholder='Написать сообщение'
							></textarea>
							<button className='chat-text-button' onClick={handleSendMessage}>
								Отправить
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
