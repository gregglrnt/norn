import TimeLine from "@/components/search/TimeLine.svelte";
import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";

describe("Timeline", () => {
    it("should render", () => {
        render(TimeLine)
        expect(screen.getByRole("slider")).toBeInTheDocument()
    })
})