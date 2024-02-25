import type { DateTime } from "luxon"
import type { Country } from "./country"

export type Fact = {
    date: DateTime,
    centuryId: number,
    coordinates: number[],
    description: string,
    id: number,
    title: string,
    country: Country | null
}