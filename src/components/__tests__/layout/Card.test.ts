import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/svelte/svelte5"
import Card from "@/components/layout/Card.svelte";
import { MockFact } from "../../../../tests/mocks";

vi.mock("./Tiltle.svelte")
vi.mock("../ui/Date.svelte");
vi.mock("../templates/Bubble.svelte")
vi.mock('@/interact/earth')

describe("Card", () => {
    it("should render", () => {
        render(Card, {
            props: {
                fact: MockFact,
                position: 1,
                total: 1
            }
        })
        expect(screen.getByText(MockFact.description)).toBeInTheDocument();
        expect(screen.getByText(MockFact.title)).toBeInTheDocument()    
    })
  })