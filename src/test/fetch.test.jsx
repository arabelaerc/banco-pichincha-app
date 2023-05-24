//import Home from "../pages/Home";
//import React from "react";
import { Table } from '../components/Table'
import { vi, describe, beforeEach, afterEach } from "vitest";
import { render,screen, waitFor } from "@testing-library/react";

const listResponse = [
    {
        id: "trj-crd",
        name: "Tarjetas de credito",
        description: "Tarjeta de consumo bajo la modalidad de credito",
        logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        date_release: "2023-02-01T00:00:00.000+00:00",
        date_revision: "2024-02-01T00:00:00.000+00:00"
    },
    {
        id: "trj-dbt",
        name: "Tarjetas de credito",
        description: "Tarjeta de consumo bajo la modalidad de debito",
        logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        date_release: "2023-02-01T00:00:00.000+00:00",
        date_revision: "2024-02-01T00:00:00.000+00:00"
    },
    {
        id: "trj-xyz",
        name: "Tarjetas de xyz",
        description: "Tarjeta de consumo bajo la modalidad de xyAz",
        logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        date_release: "2023-02-01T00:00:00.000+00:00",
        date_revision: "2024-02-01T00:00:00.000+00:00"
    }
]

function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("Home", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    fetch.mockResolvedValue(createFetchResponse(listResponse));
  });
  afterEach(() => {
    global.fetch.mockReset();
  });

  test("Fetch test", async () => {
    render(<Table />)
    await waitFor(() => screen.getByRole("product-row"))
    expect(screen.getAllByRole("product-row")[0].childNodes.length).toBe(listResponse.length)
  })
});
