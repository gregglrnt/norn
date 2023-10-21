import { get, writable } from 'svelte/store'

export const century = writable<number>()

export const setCentury = (newDate: number): boolean => {
	const newCentury = Math.ceil(newDate / 100)
	const isNewCentury = newCentury !== get(century)
	if (isNewCentury) century.set(newCentury)
	return isNewCentury
}

export const yearOutOfBounds = (year: number): boolean => {
	return year <= MINYEAR || year >= MAXYEAR
}

export const MINYEAR = -3000
export const MAXYEAR = new Date().getFullYear()
