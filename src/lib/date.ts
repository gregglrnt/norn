import type { DateWithFormat, Fact } from '@/types/fact'
import { formatCountry } from '@/types/country'
import { DateTime } from 'luxon'
import type { ExpectedEventData } from './fetch'

export const getDecade = (date: number): number => {
	return Math.floor(date / 10) * 10
}

const formatDate  = (value: string) : DateWithFormat => {
	const isISO = isNaN(Number(value));
	if(isISO) return {
		value: DateTime.fromISO(value).toJSDate(),
		format: "full",
		year: parseInt(value)
	}
	return {
		value: DateTime.fromObject({year: parseInt(value)}).toJSDate(),
		format: "year",
		year: parseInt(value)
	}
}

export const formatChronicles = (data: ExpectedEventData) => {
	const res: Fact[] = []
	try {
		for (const element of data) {
			res.push({
				date: formatDate(element.date),
				coordinates: coordinatesToLatLon(element.coordinates),
				title: element.title,
				description: element.description,
				id: element.id,
				centuryId: element.centuryId,
				placeName: element.placeName,
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
