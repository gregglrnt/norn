import LikedYears from "@/components/wheel/LikedYears.svelte";
import { render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";


vi.mock("@/interact/user", async(importOriginal) => {
    return {
        ...await importOriginal<typeof import("@/interact/user")>(),
        getFavoriteYears: () => ["1001", "1002","1003"]
    }
} )

describe("Liked years", () => {
    it("should render", () => {
        render(LikedYears);
        expect(screen.getByText(/Go back to your favorite years/)).toBeInTheDocument()
    })

    it("should display all my favorite years", async () => {
        render(LikedYears);
        const user = await import("@/interact/user");
        for(const year of user.getFavoriteYears()) {
            expect(screen.getByText(year)).toBeInTheDocument();
        }
    })
})