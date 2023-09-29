import { formatChronicles, getDecade } from '$lib/date'
import { get } from 'svelte/store'
import { century, setDateFromString } from '../../stores/date'
import type { PageLoad } from './$types'
import { events } from '../../stores/events'

export const load: PageLoad = async ({ fetch, params }) => {
	const centuryUpdated = setDateFromString(params.year)
	const decade = getDecade(parseInt(params.year))
	if (centuryUpdated) {
		const newEvents = await fetch(`http://localhost:8000/century/${get(century)}`)
			.then((data) => data.json())
			.then((json) => formatChronicles(json))
		events.set(newEvents)
	}

	return {
		events: get(events).filter(
			(ev) => ev.date.getFullYear() >= decade && decade + 10 >= ev.date.getFullYear()
		),
		decade
	}
}
