import Like from "@/components/controls/Like.svelte";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";

describe("Like", () => {
    it("should render", () => {
        render(Like);
        expect(screen.getByRole("button")).toBeInTheDocument()
    })
    it("should display like or unlike when we click", async () => {
        render(Like);
        expect(screen.getByText(/Like this year/)).toBeInTheDocument()
        const button = screen.getByRole("button");
        await fireEvent(button, new MouseEvent("click"));
        expect(screen.getByText(/Unlike this year/)).toBeInTheDocument()
    })
})