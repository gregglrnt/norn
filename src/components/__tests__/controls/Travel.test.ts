import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import Travel from "@/components/controls/Travel.svelte";

vi.mock("@/interact/navigation");

describe("Travel", () => {
    it("should render as backward", async () => {
        render(Travel, {type: "backward"});
        const navigation = await import("@/interact/navigation");
        const button = screen.getByRole("button");
        expect(button).toHaveClass("backward");
        fireEvent(button, new MouseEvent("click"));
        expect(navigation.increaseDecade).toHaveBeenCalledWith(-1);
    })

    it("should render as forward", async () => {
        render(Travel, {type: "forward"});
        const navigation = await import("@/interact/navigation");
        const button = screen.getByRole("button");
        expect(button).toHaveClass("forward");
        fireEvent(button, new MouseEvent("click"));
        expect(navigation.increaseDecade).toHaveBeenCalledWith(1);
    })
})