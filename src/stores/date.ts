import { error } from '@sveltejs/kit'
import { writable, get, derived } from 'svelte/store'

export const date = writable<number>()

export const century = derived(date, ($date) => Math.ceil($date / 100))

export const setDateFromString = (value: string) => {
	let centuryUpdated = false
	const previousCentury = get(century)
	const newDate = parseInt(value)
	if (isNaN(newDate)) throw error(400, { message: 'Should be a number' })
	date.set(newDate)
	if (get(century) !== previousCentury) {
		centuryUpdated = true
	}
	return centuryUpdated
}

export const setCentury = (newDate: string) => {
	return Math.ceil(parseInt(newDate) / 100)
}
