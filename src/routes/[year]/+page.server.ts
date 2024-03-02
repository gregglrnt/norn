import { formatChronicles } from '$lib/date'
import { get } from 'svelte/store'
import { MAXYEAR, MINYEAR, century, setCentury, yearOutOfBounds } from '../../stores/date'
import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { Fact } from '@/types/fact'

export const load: PageServerLoad = async ({ fetch, params }) => {
	const year = parseInt(params.year)
	if (isNaN(year) || yearOutOfBounds(year)) error(404, `Should be a number between ${MINYEAR} and ${MAXYEAR}`)
	const centuryUpdated = setCentury(year)
	let newEvents : Fact[] = [];
	if (centuryUpdated) {
		console.log('century updated', get(century))
		const res = await fetch(`http://localhost:8000/century/${get(century)}`, {
            headers: [[
                "Authorization", env.API_TOKEN || "",
            ]]
        })
		newEvents = await res.json().then(json => formatChronicles(json))
	}


	return {
		newEvents,
		centuryUpdated,
	}
}
