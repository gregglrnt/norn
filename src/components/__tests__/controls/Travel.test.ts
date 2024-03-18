import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Travel from "@/components/controls/Travel.svelte";

describe("Travel", () => {
    it("should render as backward", async () => {
        render(Travel, {type: "backward"});
        const button = screen.getByRole("button");
        expect(button).toHaveClass("backward");
    })

    it("should render as forward", async () => {
        render(Travel, {type: "forward"});
        const button = screen.getByRole("button");
        expect(button).toHaveClass("forward");
    })
})