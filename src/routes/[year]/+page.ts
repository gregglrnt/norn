import { formatChronicles, getDecade } from '$lib/date'
import { get } from 'svelte/store'
import { MAXYEAR, MINYEAR, century, setCentury, yearOutOfBounds } from '../../stores/date'
import type { PageLoad } from './$types'
import { events } from '../../stores/events'
import { error } from '@sveltejs/kit'

export const load: PageLoad = async ({ fetch, params }) => {
	const year = parseInt(params.year)
	if (isNaN(year) || yearOutOfBounds(year)) error(404, `Should be a number between ${MINYEAR} and ${MAXYEAR}`)
	const decade = getDecade(year)
	const centuryUpdated = setCentury(year)
	if (centuryUpdated) {
		console.log('century updated', get(century))
		const res = await fetch(`http://localhost:8000/century/${get(century)}`)
		const newEvents = await res.json().then(json => formatChronicles(json))
		events.set(newEvents)
	}

	return {
		events: get(events)
			.filter((ev) => ev.date.year>= decade && decade + 10 >= ev.date.year)
			.sort((ev) => (ev.date.year === year ? -1 : 1)),
		year,
		decade
	}
}
