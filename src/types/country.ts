export type Country = {
	id: number
	name: string
	label: string
	flag?: string
}

export const formatCountry = (originalCountry: Country) => {
	if (originalCountry.name === '') return null
	return originalCountry
}
