import Toast from "@/components/ui/Toast.svelte";
import { pop } from "@/stores/pop";
import { render, screen } from "@testing-library/svelte";
import { tick } from "svelte";
import { describe, expect, it } from "vitest";

describe("Toast", () => {
    it("should render", () => {
        render(Toast);
        expect(screen.getByTestId("toast-container")).toBeInTheDocument();
    })

    it("should display message when new pop is set", async () => {
        const mockError = "Oulala!"
        render(Toast);
        pop.set({status: "error", message: mockError})
        await tick();
        expect(screen.getByText(mockError)).toBeInTheDocument()
    })

    it("should have correct class depending on status", async () => {
        const mockSuccess = "Yay!";
        render(Toast);
        pop.set({status: "success", message: mockSuccess});
        await tick();
        expect(screen.getByText(mockSuccess)).toHaveClass("success")

    })
})