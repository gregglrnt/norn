import { goto } from '$app/navigation'
import { get } from 'svelte/store'
import { setDateFromString, date } from '@/stores/date'

export const navigateDate = (value: string) => {
	setDateFromString(value)
	goto(`/${get(date)}`)
}

export const increaseDate = (value: 1 | -1) => {
	goto(`/${get(date) + value}`)
}
