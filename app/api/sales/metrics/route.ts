import { NextResponse } from "next/server"
import { getAllYearsData } from "@/lib/mock-data"

export async function GET() {
  try {
    const allData = getAllYearsData()

    // Calculate combined metrics across all years
    const combinedMetrics = {
      total_revenue_all_years: 0,
      total_units_all_years: 0,
      year_over_year_growth: [] as Array<{ year: number; growth: number }>,
      top_categories: [] as Array<{ category: string; revenue: number }>,
      top_regions: [] as Array<{ region: string; revenue: number }>,
    }

    // Aggregate data
    const categoryTotals = new Map<string, number>()
    const regionTotals = new Map<string, number>()
    let previousYearRevenue = 0

    Object.entries(allData).forEach(([year, data]) => {
      const yearNum = Number.parseInt(year)
      combinedMetrics.total_revenue_all_years += data.metrics.total_revenue
      combinedMetrics.total_units_all_years += data.metrics.total_units

      // Calculate year-over-year growth
      if (previousYearRevenue > 0) {
        const growth = ((data.metrics.total_revenue - previousYearRevenue) / previousYearRevenue) * 100
        combinedMetrics.year_over_year_growth.push({
          year: yearNum,
          growth: Math.round(growth * 100) / 100,
        })
      }
      previousYearRevenue = data.metrics.total_revenue

      // Aggregate categories and regions
      data.category_breakdown.forEach((cat) => {
        const existing = categoryTotals.get(cat.category) || 0
        categoryTotals.set(cat.category, existing + cat.revenue)
      })

      data.regional_breakdown.forEach((region) => {
        const existing = regionTotals.get(region.region) || 0
        regionTotals.set(region.region, existing + region.revenue)
      })
    })

    // Get top categories and regions
    combinedMetrics.top_categories = Array.from(categoryTotals.entries())
      .map(([category, revenue]) => ({ category, revenue: Math.round(revenue * 100) / 100 }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)

    combinedMetrics.top_regions = Array.from(regionTotals.entries())
      .map(([region, revenue]) => ({ region, revenue: Math.round(revenue * 100) / 100 }))
      .sort((a, b) => b.revenue - a.revenue)

    // Round totals
    combinedMetrics.total_revenue_all_years = Math.round(combinedMetrics.total_revenue_all_years * 100) / 100

    return NextResponse.json(combinedMetrics)
  } catch (error) {
    console.error("Error fetching metrics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
