import Stack from "@/components/layout/Stack.svelte";
import { render } from "@testing-library/svelte";
import { describe, it } from "vitest";

//TODO: improve this 
describe("Stack", () => {
    it("should render", () => {
        render(Stack, { props: { cards: [] } });
    })
})