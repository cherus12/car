import React from 'react'
import './chat.scss'
import { Close } from '@mui/icons-material'

export const Chat = ({ setIsOpen }) => {
	return (
		<div className='chat-wrapper'>
			<div className='chat-sidebar'>
				<div className='chat-sidebar-container'>
					<div className='chat-sidebar-top'>
						<div
							className='chat-sidebar-title'
							onClick={() => setIsOpen(false)}
						>
							<Close className='btn-close'></Close>
							<h1>Сообщения</h1>
						</div>
					</div>
					<div className='chat-sidebar-bottom'>
						<div className='chat-sidebar-card'>
							<div className='chat-sidebar-card-img'>
								<img
									src='	https://vertis-frontend.s3.yandex.net/auto/frontend/chat-logo/icon-166x124.png'
									alt=''
								/>
							</div>
							<div className='chat-sidebar-card-right'>
								<div className='chat-card-title'>Авто.ру</div>
								<div className='chat-card-subject'>Чат с поддержкой</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='chat-right'>
				<div className='chat-right-head'>
					<div className='chat-right-head-title'>TRUST.CARS</div>
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
						<div className='chat-right-pinned-car-price'>1 111 111 P</div>
						<div className='chat-right-pinned-car-link-title'>
							<a href='#'>BMW M3 VI (G80)</a>
						</div>
					</div>
				</div>
				<div className='chat'>
					<div className='messages'></div>
					<div className='chat-input'>
						<div className='chat-border'>
							<div className='chat-icons'></div>
							<div className='chat-input-text'>
								<textarea
									className='chat-input-textarea'
									placeholder='Написать сообщение'
								></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
