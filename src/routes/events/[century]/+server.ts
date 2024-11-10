import { env } from "$env/dynamic/private";
import { formatChronicles } from "@/lib/date";
import type { ExpectedEventData } from "@/lib/fetch";
import { century } from "@/stores/date";
import { setPop } from "@/stores/pop";
import { json } from "@sveltejs/kit";
import { get } from "svelte/store";

export async function GET({params}) {
    try {
        const data = await fetch(`${env.BACK_URL}/events/${params.century}}`, {headers: [['Authorization', env.API_TOKEN]]});
        const events = await data.json();
        return json(events);
    } catch (err) {
        console.error("ERROR", err)
        setPop('error', 'Error while fetching');
    }
}

