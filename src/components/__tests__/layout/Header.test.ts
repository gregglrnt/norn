import Header from "@/components/layout/Header.svelte";
import { render, screen } from "@testing-library/svelte/svelte5";
import {  describe, expect, it} from "vitest";
describe("Header", () => {
    it("should render", () => {
        render(Header);
        expect(screen.getByRole("heading", {level: 1})).toBeInTheDocument()
    })
})