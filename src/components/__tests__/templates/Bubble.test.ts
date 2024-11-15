import Bubble from "@/components/templates/Bubble.svelte";
import { render, screen } from "@testing-library/svelte/svelte5";
import { describe, expect, it } from "vitest";

describe("Bubble", () => {
    it("should render", () => {
        render(Bubble);
        expect(screen.getByTestId("bubble")).toBeInTheDocument()
    })
})