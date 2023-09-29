import { get } from "svelte/store";
import type { LayoutLoad } from "./$types";
import { date } from "@/stores/date";
import { goto } from "$app/navigation";

export const load : LayoutLoad = () => {
    if(get(date) === undefined) {
        date.set(1515);
        goto(`/${get(date)}`)
    }
}