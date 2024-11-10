import { year, yearOutOfBounds } from "@/stores/date";
import { setPop } from "@/stores/pop";
import { derived } from "svelte/store";


export const nextDecade = derived(year, ($year) => {
    return $year + 10;
})

export const previousDecade = derived(year, ($year) => {
    return $year - 10;
})

export const travel = (to: number) => {
    if (yearOutOfBounds(to)) {
        setPop("error", `Year ${to} is out of bounds sorry :(`)
        return;
    };
    year.set(to);
}