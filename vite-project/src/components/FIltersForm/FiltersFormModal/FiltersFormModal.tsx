import React from 'react'
import './filters-form-modal.scss'

export const FiltersFormModal = ({
	handleChange,
	data,
	handleChangeModel,
	mark,
}) => {
	return (
		<div className='filters-form-modal'>
			{data &&
				data.map(item => (
					<div
						onClick={() => {
							mark == 'models'
								? handleChangeModel(`${item.attributes.title}`)
								: handleChange(`${item.attributes.title}`)
							// handleChange(`${item.attributes.title}`, mark)
						}}
						key={item.attributes.id}
					>
						{item.attributes.title}
					</div>
				))}
		</div>
	)
}
