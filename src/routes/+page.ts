import { formatChronicles } from "@/lib/date";
import { type ExpectedEventData } from "@/lib/fetch";
import { century, year } from "@/stores/date";
import { pop, setPop } from "@/stores/pop.js";
import {get} from "svelte/store";


export function load({url}) {
        //TODO: better
        const paramYear = url.searchParams.get('share');
        if(paramYear && parseInt(paramYear)) {
            year.set(parseInt(paramYear));
        }
}