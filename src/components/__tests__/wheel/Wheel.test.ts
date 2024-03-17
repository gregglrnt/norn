import Wheel from "@/components/wheel/Wheel.svelte";
import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";

describe("Wheel", () => {
    it("should render", () => {
        render(Wheel);
        expect(screen.getByText(/Bored of this ?/)).toBeInTheDocument()   
    })
})