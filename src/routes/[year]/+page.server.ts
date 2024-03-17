import { get } from 'svelte/store'
import { MAXYEAR, MINYEAR, century, setCentury, yearOutOfBounds } from '../../stores/date'
import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { type Fact } from '@/types/fact'
import { getEventsBy } from '@/lib/fetch'

export const load: PageServerLoad = async ({ params }) => {
	const year = parseInt(params.year)
	if (isNaN(year) || yearOutOfBounds(year)) error(404, `Should be a number between ${MINYEAR} and ${MAXYEAR}`)
	const centuryUpdated = setCentury(year)
	let newEvents : Fact[] = [];
	if (centuryUpdated) {
		console.log('century updated', get(century));
		newEvents = await getEventsBy({century: get(century)}); 
	}


	return {
		newEvents,
		centuryUpdated,
	}
}
