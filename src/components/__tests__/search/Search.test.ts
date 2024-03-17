import Search from "@/components/search/Search.svelte";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/search");

describe("Search", () => {
    it("should render", () => {
        render(Search);
        expect(screen.getByText(/Change the year/)).toBeInTheDocument()
    })

    it("should search on enter", async () => {
        render(Search);
        const input = screen.getByRole("spinbutton")
        fireEvent(input, new KeyboardEvent("keydown", { key: "Enter" }));
        const search = await import("@/lib/search");
        expect(search.search).toHaveBeenCalled();
    })

    it("should search on click", async () => {
        render(Search);
        const button = screen.getByRole("button");
        fireEvent(button, new MouseEvent("click"));
        const search = await import("@/lib/search");
        expect(search.search).toHaveBeenCalled();
    })
})