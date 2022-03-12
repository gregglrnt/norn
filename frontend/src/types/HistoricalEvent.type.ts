import { Country } from "./Country.type";

export interface HistoricalEvent {
    id : number,
    name: string,
    date: number,
    coordinates: string,
    // will be updated to type HTML
    description: string,
    // will be updated to type Country
    country: Country,
  }
  