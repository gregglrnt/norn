import { page } from '$app/stores';
import { derived, get, writable } from 'svelte/store'
import { DateTime } from "luxon"

export type CalendarType = "iso8601" | "persian" | "islamic" | "japanese" | "coptic" | "chinese" | "buddhist" | "indian" | "hebrew";

export const century = writable<number>()

export const calendarType = writable<CalendarType>("iso8601")

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

const formatDate = (d: DateTime) => {
    return d.reconfigure({ outputCalendar: get(calendarType), locale: "en-us" })
}

export const year = derived([page, calendarType], () => {
    const date = DateTime.local(get(page).data.year, 2, 1)
    return getYear(date);
}
)

export const getYear = (date: DateTime) => {
    const formattedDate = formatDate(date);
    if (get(calendarType) === "iso8601" && formattedDate.year < 0) {
        const year = `${formattedDate.year}`
        return year
    }
    return formattedDate.toLocaleString({ year: "numeric" });
}


export const getFullDate = (date: Date) => {
    const formattedDate = formatDate(DateTime.fromJSDate(date));
    return formattedDate.toLocaleString({ month: "long", day: "2-digit" }) + `, ${getYear(formattedDate)}`
}
