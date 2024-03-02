import type { Fact } from '@/types/fact'
import { formatCountry } from '@/types/country'
import { DateTime } from 'luxon'

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
	country: {
		id: number
		name: string
		flag?: string
	}
}[]

export const formatChronicles = (data: ExpectedDataFromApi) => {
	const res: Fact[] = []
	try {
		for (const element of data) {
			res.push({
				date: DateTime.fromISO(element.date).toJSDate(),
				coordinates: coordinatesToLatLon(element.coordinates),
				title: element.title,
				description: element.description,
				id: element.id,
				centuryId: element.centuryId,
				country: formatCountry(element.country)
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
