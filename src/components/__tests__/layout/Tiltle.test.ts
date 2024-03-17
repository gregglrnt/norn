import Tiltle from "@/components/layout/Tiltle.svelte";
import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";

describe("Tiltle", () => {
    it("should render by default", () => {
        render(Tiltle);
        expect(screen.getByRole("heading", {level: 2})).toBeInTheDocument()
    })

    it("should render with level", () => {
        render(Tiltle, {level: 5});
        expect(screen.getByRole("heading", {level: 5})).toBeInTheDocument()
    })
})