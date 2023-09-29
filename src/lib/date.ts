import type { Chronicle } from '@/types/chronicle'

export const getDecade = (date: number): number => {
	return Math.floor(date / 10) * 10
}
type ExpectedDataFromApi = {
	date: string
	coordinates: string
	title: string
	description: string
	id: number
	centuryId: number
}[]

export const formatChronicles = (data: ExpectedDataFromApi) => {
	const res: Chronicle[] = []
	try {
		for (const element of data) {
			console.log(element)
			res.push({
				date: new Date(element.date),
				coordinates: coordinatesToLatLon(element.coordinates),
				title: element.title,
				description: element.description,
				id: element.id,
				centuryId: element.centuryId
			})
		}
	} catch (e) {
		console.error(e)
		return []
	}
	return res
}

export const coordinatesToLatLon = (coordinateString: string): [number, number] => {
	const coordinates = coordinateString.split(',')
	return [parseInt(coordinates[0]), parseInt(coordinates[1])]
}

export const formatDateToHTMLDateTime = (date: Date) => {
	return (
		date.getFullYear() +
		'-' +
		date.getMonth().toString().padStart(2, '0') +
		'-' +
		date.getDay().toString().padStart(2, '0')
	)
}
