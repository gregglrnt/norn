import Shuffle from "@/components/controls/Shuffle.svelte";
import { fireEvent, render, screen } from "@testing-library/svelte/svelte5";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/stores/date");

describe("Shuffle", () => {
    it("should render", () => {
     render(Shuffle);
     const shuffle = screen.getByRole("button");
     expect(shuffle).toBeInTheDocument();
     expect(shuffle).toHaveClass("control", "shuffle")  
    })
    
    it("should shuffle on click", async () => {
        render(Shuffle);
        fireEvent(screen.getByRole("button"), new MouseEvent("click"));
        //TODO: fix with mock

    })
})