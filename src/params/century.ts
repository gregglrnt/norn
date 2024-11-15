import { yearOutOfBounds } from "@/stores/date";

export function match(value) {
    const integer = parseInt(value);
    if(isNaN(integer)) return false;
    const year = integer * 100;
    return !yearOutOfBounds(year);
}