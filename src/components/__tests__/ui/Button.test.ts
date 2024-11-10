import Button from "@/components/ui/Button.svelte";
import { render, screen } from "@testing-library/svelte/svelte5";
import { describe, expect, it } from "vitest";

describe("Button", () => {
    it("should render with default props", () => {
        render(Button);
        expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("should adapt to primary class", () => {
        render(Button, {primary: true});
        expect(screen.getByRole("button")).toHaveClass("primary");
    })

    it("should accept any other class", () => {
        const classes = "hello world";
        render(Button, {class: classes});
        expect(screen.getByRole("button")).toHaveClass(...classes.split(" "))
    })  

    it("should be disabled if needed", () => {
        render(Button, {disabled: true});
        expect(screen.getByRole("button")).toHaveAttribute("disabled");
    })

})