import { derived, type Readable } from "svelte/store";
import { year } from "./date";

type Era = "early-antiquity" | "antiquity" |"dark-ages" | "middle-ages" | "renaissance" | "classical" | "industrial" | "atomic";

export const era: Readable<Era> = derived(year, ($year) => {
    const y = $year
    if (y > -100 && y < 476) return "antiquity"
    if(y > 476 && y < 700) return "dark-ages"
    if (y > 700 && y < 1453) return "middle-ages"
    if (y > 1453 && y < 1600) return "renaissance"
    if (y > 1600 && y < 1789) return "classical"
    if (y > 1789 && y < 1945) return "industrial"
    if (y > 1945 && y < 3000) return "atomic"
    return "early-antiquity";
});