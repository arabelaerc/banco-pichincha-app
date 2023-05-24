import {describe, test} from 'vitest';
import {render} from '@testing-library/react';
import { Header } from '../components/Header'
import { Table } from '../components/Table'

describe("Header test", () => {
    test("should show logo all the time", async () => {
      const { getByAltText } = await render(<Header />)
      const image = getByAltText('Banco Pichincha logo')
      expect(image).toBeTruthy()
    })
})

describe("Table test", () => {
  test("return a table head", () => {
    const { getByRole } = render(<Table />)
    const table_head = getByRole('head-table')
    expect(table_head).toBeTruthy()
  });
  
  test("return a table row", () => {
    const { getByRole } = render(<Table />)
    const table_product = getByRole('product-row')
    expect(table_product).toBeTruthy()
  });
});