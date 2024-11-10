import Like from "@/components/controls/Like.svelte";
import { render, screen } from "@testing-library/svelte/svelte5";
import { describe, expect, it } from "vitest";

//TODO: FIXME

describe("Like", () => {
    it("should render", () => {
        render(Like);
        expect(screen.getByRole("button")).toBeInTheDocument()
    })
})