import type { SalesResponse } from "./types"

export async function fetchSalesData(year?: number, category?: string, region?: string): Promise<SalesResponse> {
  const params = new URLSearchParams()
  if (year) params.append("year", year.toString())
  if (category) params.append("category", category)
  if (region) params.append("region", region)

  const response = await fetch(`/api/sales?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch sales data: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchSalesMetrics() {
  const response = await fetch("/api/sales/metrics")

  if (!response.ok) {
    throw new Error(`Failed to fetch sales metrics: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchAllYearsSummary() {
  const response = await fetch("/api/sales")

  if (!response.ok) {
    throw new Error(`Failed to fetch years summary: ${response.statusText}`)
  }

  return response.json()
}
