import CalendarSwitcher from "@/components/wheel/CalendarSwitcher.svelte";
import { calendarType } from "@/stores/date";
import { fireEvent, render, screen } from "@testing-library/svelte/svelte5";
import { get } from "svelte/store";
import { describe, expect, it } from "vitest";

describe("Calendar Switcher", () => {
    it("should render", () => {
        render(CalendarSwitcher);
        expect(screen.getByRole("combobox")).toBeInTheDocument()
    })

    it("should switch", () => {
        render(CalendarSwitcher);
        const select = screen.getByRole("combobox") as HTMLSelectElement;
        fireEvent.change(select, {target: {value: "buddhist"}});
        expect(get(calendarType)).toBe("buddhist")
    })
})