import { Country } from "@/types/country";
import { DateWithFormat, Fact } from "@/types/fact";

export const MockDateWithFormat: DateWithFormat = {
    value: new Date(), format: "full", year: 2024
}

export const MockCountry: Country = {
    id: 1,
    name: "country",
    label: "Country Name"
}

export const MockFact: Fact = {
    date: MockDateWithFormat,
    centuryId: 21,
    coordinates: [0, 0],
    description: "Random event",
    id: 0,
    title: "Random event title",
    country: MockCountry,
}
