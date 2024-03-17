import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/svelte"
import Card from "@/components/layout/Card.svelte";
import { MockFact } from "../../../../tests/mocks";

describe("Card", () => {
    it("should render", () => {
        render(Card, {
            props: {
                fact: MockFact
            }
        })
        expect(screen.getByText(MockFact.description)).toBeInTheDocument();
        expect(screen.getByText(MockFact.title)).toBeInTheDocument()    
    })
  })