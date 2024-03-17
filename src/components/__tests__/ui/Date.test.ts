import Date from "@/components/ui/Date.svelte";
import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { MockDateWithFormat } from "../../../../tests/mocks";
import { getFullDate } from "@/stores/date";

describe("Date", () => {
    it("should render when provided a full date", () => {
        render(Date, {src: MockDateWithFormat})
        const dateFormatted = getFullDate(MockDateWithFormat.value);
        expect(screen.getByText(dateFormatted.day)).toBeInTheDocument()
        expect(screen.getByText(dateFormatted.year)).toBeInTheDocument()
    })

    it("should render classnames", () => {
        const className = "test"
        render(Date, {src: MockDateWithFormat, class: className});
        expect(screen.getByTestId("date")).toBeInTheDocument()
    })
})