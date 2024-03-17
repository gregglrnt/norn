import Play from "@/components/controls/Play.svelte";
import { playHistory, playing } from "@/interact/play";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { get } from "svelte/store";
import { describe, expect, it } from "vitest";

describe("Play", () => {
    it("should render", () => {
        render(Play);
        expect(screen.getByRole("button")).toBeInTheDocument();
    })
    it("should start play when click", () => {
        render(Play);
        fireEvent(screen.getByRole("button"), new MouseEvent("click"));
        expect(get(playing)).toBeTruthy();
    })

    it("should stop play when click", async () => {
        playHistory();
        render(Play);
        await fireEvent(screen.getByRole("button"), new MouseEvent("click"));
        expect(get(playing)).toBeFalsy();
    })
})