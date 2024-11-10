import { derived, type Readable } from "svelte/store";
import { year } from "./date";

type Era = "early-antiquity" | "antiquity" |"dark-ages" | "middle-ages" | "renaissance" | "classical" | "industrial" | "atomic";

export const era: Readable<Era> = derived(year, ($year) => {
    if ($year > -100 && $year < 476) return "antiquity"
    if($year > 476 && $year < 700) return "dark-ages"
    if ($year > 700 && $year < 1453) return "middle-ages"
    if ($year > 1453 && $year < 1600) return "renaissance"
    if ($year > 1600 && $year < 1789) return "classical"
    if ($year > 1789 && $year < 1945) return "industrial"
    if ($year > 1945 && $year < 3000) return "atomic"
    return "early-antiquity";
});