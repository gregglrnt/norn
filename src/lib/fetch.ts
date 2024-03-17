import { env } from "$env/dynamic/private";
import { formatChronicles } from "./date";

type EventsParams = {
    century?: number,
    //TODO: implement filters
}

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

async function request<Type>(path: string, method: string = "GET") : Promise<Type> {
    const res = await fetch(`${env.BACK_URL}/${path}}`, {
            headers: [[
                "Authorization", env.API_TOKEN,
            ]],
            method: method,
        })
    return res.json();
}

export const getEventsBy = async (params: EventsParams) => {
    const events = request<ExpectedEventData>(`events/${params.century || ''}`).then(json => formatChronicles(json))
    return events;
}