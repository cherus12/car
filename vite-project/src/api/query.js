export const buildQueryString = filter => {
	const query = []

	for (let item in filter) {
		if (
			filter[item] !== null &&
			filter[item] !== undefined &&
			filter[item] !== ''
		) {
			if (!Array.isArray(filter[item])) {
				const markArray = filter[item].split(',')
				markArray.forEach(i => query.push(`&[filters][${item}][$in]=${i}`))
			} else {
				filter[item].forEach(x =>
					query.push(`&[filters][${item}][${x.operator}]=${x.value}`)
				)
			}
		}
	}

	return query.join('')
}

export const queryModel = chooseItems => {
	const query = []

	for (let item of chooseItems) {
		query.push(`&[filters][marks][title][$in]=${item}`)
	}

	return query.join('')
}

export const queryCarAdd = () => {
	const query = []
}
