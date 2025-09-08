import type { SalesData, SalesResponse, MonthlySales, CategorySales, RegionalSales, SalesMetrics } from "./types"

const PRODUCT_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports & Outdoors",
  "Books & Media",
  "Health & Beauty",
  "Automotive",
  "Toys & Games",
]

const REGIONS = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East & Africa"]

const CUSTOMER_SEGMENTS = ["Enterprise", "SMB", "Consumer", "Government"]

const SALES_REPS = [
  "John Smith",
  "Sarah Johnson",
  "Mike Chen",
  "Emily Davis",
  "Robert Wilson",
  "Lisa Anderson",
  "David Brown",
  "Jennifer Lee",
]

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function generateRandomSalesData(year: number, count = 1000): SalesData[] {
  const data: SalesData[] = []

  for (let i = 0; i < count; i++) {
    const month = Math.floor(Math.random() * 12) + 1
    const day = Math.floor(Math.random() * 28) + 1
    const date = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`

    // Seasonal variations - higher sales in Q4
    const seasonalMultiplier = month >= 10 ? 1.4 : month <= 2 ? 0.8 : 1.0

    // Year-over-year growth
    const yearMultiplier = year === 2024 ? 1.15 : year === 2023 ? 1.08 : 1.0

    const baseRevenue = (Math.random() * 50000 + 5000) * seasonalMultiplier * yearMultiplier
    const units = Math.floor(Math.random() * 100) + 1
    const profitMargin = Math.random() * 0.4 + 0.1 // 10-50% profit margin

    data.push({
      id: `${year}-${i.toString().padStart(4, "0")}`,
      date,
      year,
      month,
      quarter: Math.ceil(month / 3),
      revenue: Math.round(baseRevenue * 100) / 100,
      units_sold: units,
      product_category: PRODUCT_CATEGORIES[Math.floor(Math.random() * PRODUCT_CATEGORIES.length)],
      region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
      customer_segment: CUSTOMER_SEGMENTS[Math.floor(Math.random() * CUSTOMER_SEGMENTS.length)],
      sales_rep: SALES_REPS[Math.floor(Math.random() * SALES_REPS.length)],
      profit_margin: Math.round(profitMargin * 1000) / 1000,
    })
  }

  return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

function calculateMetrics(data: SalesData[]): SalesMetrics {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)
  const totalUnits = data.reduce((sum, item) => sum + item.units_sold, 0)
  const averageOrderValue = totalRevenue / data.length

  return {
    total_revenue: Math.round(totalRevenue * 100) / 100,
    total_units: totalUnits,
    average_order_value: Math.round(averageOrderValue * 100) / 100,
    conversion_rate: Math.round((Math.random() * 5 + 2) * 100) / 100, // 2-7%
    growth_rate: Math.round((Math.random() * 20 + 5) * 100) / 100, // 5-25%
  }
}

function calculateMonthlyBreakdown(data: SalesData[]): MonthlySales[] {
  const monthlyData = new Map<string, { revenue: number; units: number; profit: number }>()

  data.forEach((item) => {
    const key = `${item.year}-${item.month.toString().padStart(2, "0")}`
    const existing = monthlyData.get(key) || { revenue: 0, units: 0, profit: 0 }

    monthlyData.set(key, {
      revenue: existing.revenue + item.revenue,
      units: existing.units + item.units_sold,
      profit: existing.profit + item.revenue * item.profit_margin,
    })
  })

  return Array.from(monthlyData.entries())
    .map(([key, values]) => {
      const [year, month] = key.split("-")

      return {
        month: monthNames[Number.parseInt(month) - 1],
        year: Number.parseInt(year),
        revenue: Math.round(values.revenue * 100) / 100,
        units_sold: values.units,
        profit: Math.round(values.profit * 100) / 100,
      }
    })
    .sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year
      return monthNames.indexOf(a.month) - monthNames.indexOf(b.month)
    })
}

function calculateCategoryBreakdown(data: SalesData[]): CategorySales[] {
  const categoryData = new Map<string, { revenue: number; units: number }>()

  data.forEach((item) => {
    const existing = categoryData.get(item.product_category) || { revenue: 0, units: 0 }
    categoryData.set(item.product_category, {
      revenue: existing.revenue + item.revenue,
      units: existing.units + item.units_sold,
    })
  })

  return Array.from(categoryData.entries())
    .map(([category, values]) => ({
      category,
      revenue: Math.round(values.revenue * 100) / 100,
      units_sold: values.units,
      growth_rate: Math.round((Math.random() * 30 - 5) * 100) / 100, // -5% to 25%
    }))
    .sort((a, b) => b.revenue - a.revenue)
}

function calculateRegionalBreakdown(data: SalesData[]): RegionalSales[] {
  const regionalData = new Map<string, number>()

  data.forEach((item) => {
    const existing = regionalData.get(item.region) || 0
    regionalData.set(item.region, existing + item.revenue)
  })

  const totalRevenue = Array.from(regionalData.values()).reduce((sum, revenue) => sum + revenue, 0)

  return Array.from(regionalData.entries())
    .map(([region, revenue]) => ({
      region,
      revenue: Math.round(revenue * 100) / 100,
      market_share: Math.round((revenue / totalRevenue) * 10000) / 100, // percentage with 2 decimals
    }))
    .sort((a, b) => b.revenue - a.revenue)
}

export function generateSalesDataForYear(year: number): SalesResponse {
  const data = generateRandomSalesData(year, 1200)

  return {
    data,
    metrics: calculateMetrics(data),
    monthly_breakdown: calculateMonthlyBreakdown(data),
    category_breakdown: calculateCategoryBreakdown(data),
    regional_breakdown: calculateRegionalBreakdown(data),
  }
}

// Pre-generate data for all years
export const SALES_DATA_2022 = generateSalesDataForYear(2022)
export const SALES_DATA_2023 = generateSalesDataForYear(2023)
export const SALES_DATA_2024 = generateSalesDataForYear(2024)

export function getAllYearsData(): Record<number, SalesResponse> {
  return {
    2022: SALES_DATA_2022,
    2023: SALES_DATA_2023,
    2024: SALES_DATA_2024,
  }
}
