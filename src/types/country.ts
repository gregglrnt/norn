export type Country = {
	id: number
	name: string
	flag?: string
}

export const formatCountry = (originalCountry: { id: number; name: string; flag?: string }) => {
	if (originalCountry.name === 'N/A') return null
	return originalCountry
}
