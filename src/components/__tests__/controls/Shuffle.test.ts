import Shuffle from "@/components/controls/Shuffle.svelte";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";

vi.mock("$app/navigation")

describe("Shuffle", () => {
    it("should render", () => {
     render(Shuffle);
     const shuffle = screen.getByRole("button");
     expect(shuffle).toBeInTheDocument();
     expect(shuffle).toHaveClass("control", "shuffle")  
    })
    
    it("should shuffle on click", async () => {
        render(Shuffle);
        const navigation = await import("$app/navigation");
        fireEvent(screen.getByRole("button"), new MouseEvent("click"));
        expect(navigation.goto).toHaveBeenCalled();
    })
})