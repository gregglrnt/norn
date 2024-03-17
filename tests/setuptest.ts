import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("@/stores/date", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@/stores/date")>();
    return {
        ...actual,
        year: {
            subscribe: vi.fn,
            set: vi.fn,
            update: vi.fn
        },
    }
})