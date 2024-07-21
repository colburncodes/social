import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi
} from "vitest";
import PricingPage from "~/src/pages/pricing/index.page";
import React from "react";


// Mock Blitz.js authorize function
vi.mock('@blitzjs/auth', () => {
    return {
        resolver: {
            authorize: vi.fn(() => true),
        },
        AuthServerPlugin: vi.fn(), // Mock AuthServerPlugin if necessary
    };
});

// Mock Layout component
vi.mock('~/src/core/layouts/layout', () => {
    return {
        default: ( { children }) => <div>{children}</div>
    }
})

describe("Pricing component, when user is not authenticated", () => {

    it("renders without crashing", () => {
        // @ts-ignore
        render(<PricingPage/>);
        const heading = screen.getByRole('heading', { name: /Simple, transparent pricing/i })
        expect(heading).toBeInTheDocument()

        const text = screen.getByText(/Unlock all features including unlimited posts/i)
        expect(text).toBeInTheDocument()
    })
})