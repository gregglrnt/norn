import { goto } from "$app/navigation"
import {page } from "$app/stores";
import { get } from "svelte/store";

export const increaseDate = (amount : -1 | 1 = 1) => {
    const date = get(page).data.year;
    goto((date + amount).toString());
}

export const increaseDecade = (amount : -1 | 1 = 1) => {
    const date = get(page).data.year;
    goto((date + (amount * 10)).toString())
}