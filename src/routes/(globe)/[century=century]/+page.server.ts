import { formatChronicles } from "@/lib/date";
import { type ExpectedEventData } from "@/lib/fetch";
import { century, year } from "@/stores/date";
import { pop, setPop } from "@/stores/pop.js";
import {get} from "svelte/store";


export async function load({fetch, params}) {
    const data = await fetch(`/events/${params.century}`);
	const events = await data.json() as ExpectedEventData;
    return {
        events: formatChronicles(events),
    }
}