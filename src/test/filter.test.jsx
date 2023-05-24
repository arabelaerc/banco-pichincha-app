import { Searcher } from "../components/Searcher"
import { Table } from '../components/Table'
import { describe, test, expect } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

describe("Searcher test", () => {
  beforeEach(() => {
    render(<Table />);
  });

  test("Filter test", async () => {
    render(<Searcher />)
    const contentInput = screen.getByTestId("input-search");
    fireEvent.change(contentInput, {
      target: { value: "tar" }
    });

    expect(screen.getAllByRole("product-row")[0].childNodes.length).toBe(3);
  });
});
