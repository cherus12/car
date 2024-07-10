import React from 'react'

export const CarsCard = ({ item }) => {
	const photoURL = item?.photo?.data[0].attributes?.url || `/uploads/btw.jpg`

	return (
		<div className='listing-cars-card'>
			<div className='listing-cars-card-left'>
				<img src={`http://localhost:1337${photoURL}`} alt='' />
			</div>
			<div className='listing-cars-card-right'>
				<div className='listing-cars-card-right-first'>
					<div className='car-title'>
						<h3>
							{item?.mark || 'BMW'} {item?.modification || 'da'}{' '}
							{item?.model || '0'}
						</h3>
					</div>
					<div className='car-info'>
						<div className='car-info-left'>
							<div className='car-info-item'>{item?.model || '0'}</div>
							<div className='car-info-item'>{item?.transmission || '0'}</div>
							<div className='car-info-item'>{item?.body || '0'}</div>
						</div>
						<div className='car-info-right'>
							<div className='car-info-item'>{item?.drive || '0'}</div>
							<div className='car-info-item'>{item?.color || '0'}</div>
						</div>
					</div>
					<div className='car-tags'></div>
					<div className='car-additional-info'>
						<div>Безопасная сделка</div>
						<div>Отчет Авто.ру</div>
					</div>
				</div>
				<div className='listing-cars-card-right-second'>
					<div className='car-price'>{item?.price || '0'} ₽</div>
					<div className='car-second-info'>
						<div className='car-year'>{item?.year_of_release || '0'}</div>
						<div className='car-mileage'>{item?.mileage || '0'} km</div>
					</div>
				</div>
			</div>
		</div>
	)
}
