//TODO: move into Data Model

import { formatChronicles } from "./date"

export type ExpectedCountryData = {
    id: number
    name: string
    label: string
    flag?: string
}

export type ExpectedEventData = {
	date: string
	coordinates: string
	title: string
	description: string
	id: number
	centuryId: number
    placeName ?: string
	country: ExpectedCountryData
}[]

// export const getEventsByCentury = async (century: number) => {
//     if(!century) return [];
//     return events;
// }