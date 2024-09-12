import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BlockExplorer } from ".";
import { useRollupContext } from "../../../context/useRollupContext";

// Mock the useRollupContext hook
jest.mock("../../../context/useRollupContext", () => ({
  useRollupContext: jest.fn(),
}));

// Mock the window.open function
const mockOpen = jest.fn();
window.open = mockOpen;

describe("BlockExplorer", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock the useRollupContext hook to return a sample rollup object
    (useRollupContext as jest.Mock).mockReturnValue({
      rollup: {
        urls: {
          l2: {
            explorer: "https://example-explorer.com",
          },
        },
      },
    });
  });

  it("renders correctly", () => {
    render(<BlockExplorer />);

    expect(screen.getByText("Explorer")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search by address / tx hash / block")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("opens explorer URL when search input is empty", () => {
    render(<BlockExplorer />);

    const searchButton = screen.getByRole("button", { name: "Search" });
    fireEvent.click(searchButton);

    expect(mockOpen).toHaveBeenCalledWith(
      "https://example-explorer.com",
      "_blank"
    );
  });

  it("opens search results URL when search input is not empty", () => {
    render(<BlockExplorer />);

    const input = screen.getByPlaceholderText(
      "Search by address / tx hash / block"
    );
    fireEvent.change(input, { target: { value: "test-search" } });

    const searchButton = screen.getByRole("button", { name: "Search" });
    fireEvent.click(searchButton);

    expect(mockOpen).toHaveBeenCalledWith(
      "https://example-explorer.com/search-results?q=test-search",
      "_blank"
    );
  });

  it("updates search input value when typing", () => {
    render(<BlockExplorer />);

    const input = screen.getByPlaceholderText(
      "Search by address / tx hash / block"
    );
    fireEvent.change(input, { target: { value: "test-input" } });

    expect(input).toHaveValue("test-input");
  });
});
