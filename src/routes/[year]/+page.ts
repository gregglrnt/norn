import { events } from "@/stores/events";
import type { PageLoad } from "./$types";
import { get } from "svelte/store";
import { getDecade } from "@/lib/date";

export const load : PageLoad = ({data, params}) => {
    const {centuryUpdated, newEvents} = data;
    if(centuryUpdated) {
        events.set(newEvents);
    }
    const currentYear= Number(params.year);
    const currentEvents = get(events).filter((event) => {
        return event.date.getFullYear() < currentYear + 10 && event.date.getFullYear() > currentYear - 10
    }).sort()

    return {
        events: currentEvents,
        decade: getDecade(Number(params.year)),
        year: Number(params.year),
    }
}