import { isSearchOpen } from "@/interact/commands"
import { MAXYEAR, MINYEAR, year, yearOutOfBounds } from "@/stores/date"
import { setPop } from "@/stores/pop"

export const search = (value: number) => {
    const cleanValue = Number(value)
    if (Number.isNaN(cleanValue) || !cleanValue) return //TODO: implement error
    if(yearOutOfBounds(cleanValue)) {
        setPop("error", `Please choose a year between ${MINYEAR} and ${MAXYEAR}`);
        return;
    }
    year.set(cleanValue);
	isSearchOpen.set(false)
}