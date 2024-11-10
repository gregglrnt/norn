import Music from "@/components/ui/Music.svelte";
import { render, screen } from "@testing-library/svelte/svelte5";
import { describe, expect, it } from "vitest";

describe("Music", () => {
    it("should render", () => {
        render(Music);
        expect(screen.getByRole("button")).toBeInTheDocument()
    })
})