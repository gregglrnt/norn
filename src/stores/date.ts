import { page } from '$app/stores';
import { derived, get, writable } from 'svelte/store'

type CalendarType = string;

export const century = writable<number>()

export const calendarType = writable<CalendarType>("gregory")

export const setCentury = (newDate: number): boolean => {
	const newCentury = Math.ceil(newDate / 100)
	const isNewCentury = newCentury !== get(century)
	if (isNewCentury) century.set(newCentury)
	return isNewCentury
}

export const yearOutOfBounds = (year: number): boolean => {
	return year <= MINYEAR || year >= MAXYEAR
}

export const MINYEAR = -800
export const MAXYEAR = new Date().getFullYear()

const formatDate = (date: Date, options?: { year?: boolean, day?: boolean, month?: boolean }) => {
    const dateFormat = new Intl.DateTimeFormat("en", {
        calendar: get(calendarType), //TODO: implement switcher 
        day: options?.day ? "numeric" : undefined,
        month: options?.month ? "long" : undefined,
        year: options?.year ? "numeric" : undefined,
    })
    return dateFormat.format(date);
}

export const year = derived([page, calendarType], () => {
    const date = new Date("01/01/1999");
    date.setUTCFullYear(get(page).data.year.toString());
    return formatDate(date, { year: true });
}
)


export const getFullDate = (date: Date) => {
    return formatDate(date, { year: true, day: true, month: true })
}
