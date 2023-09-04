const checkWindow = () => {
	return typeof window !== 'undefined'
}

export const fetchLocalStorageData = (key: string) => {
	if (checkWindow()) {
		const item = localStorage.getItem(key)

		return item ? JSON.parse(item) : undefined
	}
	return undefined
}

export const setLocalStorageData = (key: string, value: string | Object) => {
	if (checkWindow()) {
		localStorage.setItem(key, JSON.stringify(value))
	} else {
		throw ['Window not accessible']
	}
}

export const removeLocalStorageData = (key: string) => {
	if (checkWindow()) {
		localStorage.removeItem(key)
	} else {
		throw ['Window not accessible']
	}
}
