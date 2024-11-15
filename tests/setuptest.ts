import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock('@/render/rendering', () => ({
    renderUniverse: vi.fn(),
    resize: vi.fn(),
    addEventsToPinSphere: vi.fn(),
    focusOnPinSphere: vi.fn(),
}));

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