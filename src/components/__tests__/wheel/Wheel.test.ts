import Wheel from "@/components/wheel/Wheel.svelte";
import { isSearchOpen } from "@/interact/commands";
import { render, screen } from "@testing-library/svelte/svelte5";
import { writable } from "svelte/store";
import { describe, expect, it, vi } from "vitest";


describe("Wheel", () => {
    it("should render", () => {
        isSearchOpen.set(true);
        render(Wheel);
        expect(screen.getByText(/Bored of this ?/)).toBeInTheDocument()   
    })
})