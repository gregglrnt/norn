import WheelButton from "@/components/ui/WheelButton.svelte";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/interact/commands");

describe("WheelButton", () => {
    it("should render", () => {
        render(WheelButton);
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it("should switch searchopen", async () => {
        render(WheelButton);
        const searchOpen = await import("@/interact/commands");
        await fireEvent(screen.getByRole("button"), new MouseEvent("click"));
        expect(searchOpen.toggleWheel).toHaveBeenCalled();
    })
})