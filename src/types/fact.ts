// import { DateTime } from "luxon"
import type { Country } from "./country"

export type DateWithFormat = {
    value: Date,
    format: "year" | "full",
    year: number
}

export type Fact = {
    date: DateWithFormat,
    centuryId: number,
    coordinates: number[],
    description: string,
    id: number,
    title: string,
    country: Country | null,
    placeName?: string
}