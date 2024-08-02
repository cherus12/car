import { io } from 'socket.io-client'

import React, { useEffect } from 'react'

export const useSocketQuery = () => {
	const socket = io('http://localhost:1337')

	useEffect(() => {
		socket.on('connect', () => {
			console.log(socket.connected)
		})

		return () => {
			socket.disconnect()
		}
	}, [])

	const sendMessage = message => {
		socket.emit('sendMessage', message)
	}

	return { sendMessage }
}
