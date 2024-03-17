import Help from "@/components/ui/Help.svelte";
import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";

describe("Help",() => {
    it("should render", () => {
        render(Help);
        expect(screen.getByTestId("help")).toBeInTheDocument()   
    })
})