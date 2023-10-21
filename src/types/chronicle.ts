import type { Country } from "./country"

export type Chronicle = {
    date: Date,
    centuryId: number,
    coordinates: number[],
    description: string,
    id: number,
    title: string,
    country: Country | null
}