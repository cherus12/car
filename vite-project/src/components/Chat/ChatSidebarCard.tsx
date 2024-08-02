import React from 'react'

export const ChatSidebarCard = ({ username, cars, handleClick, chat_id }) => {
	return (
		<div
			className='chat-sidebar-card'
			onClick={() => handleClick({ username, cars, chat_id })}
		>
			<div className='chat-sidebar-card-img'>
				<img
					src='https://vertis-frontend.s3.yandex.net/auto/frontend/chat-logo/icon-166x124.png'
					alt=''
				/>
			</div>
			<div className='chat-sidebar-card-right'>
				<div className='chat-card-title'>{username}</div>
				<div className='chat-card-info'>
					<span className='chat-card-mark'>
						{cars.mark} {cars.model}
					</span>
					<span className='chat-card-price'> {cars.price}</span>
				</div>

				<div className='chat-card-subject'>Здравствуйте</div>
			</div>
		</div>
	)
}
