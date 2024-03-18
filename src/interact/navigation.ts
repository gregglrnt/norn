import { goto } from "$app/navigation"
import { year, yearOutOfBounds } from "@/stores/date";
import { setPop } from "@/stores/pop";
import { derived } from "svelte/store";

const lazyGoTo = (destination: string) => {
    setTimeout(() => {
        goto(destination)
    }, 200)
}

export const nextDecade = derived(year, ($year) => {
    return $year + 10;
})

export const previousDecade = derived(year, ($year) => {
    return $year - 10;
})

export const travel = (year: number) => {
    if (yearOutOfBounds(year)) {
        setPop("error", `Year ${year} is out of bounds sorry :(`)
        return;
    };
    lazyGoTo(year.toString())
}