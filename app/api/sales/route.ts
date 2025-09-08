import { type NextRequest, NextResponse } from "next/server"
import { getAllYearsData } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get("year")
    const category = searchParams.get("category")
    const region = searchParams.get("region")

    const allData = getAllYearsData()

    // If year is specified, return data for that year
    if (year) {
      const yearNum = Number.parseInt(year)
      if (yearNum < 2022 || yearNum > 2024) {
        return NextResponse.json({ error: "Year must be between 2022 and 2024" }, { status: 400 })
      }

      let yearData = allData[yearNum]

      // Apply filters if provided
      if (category || region) {
        const filteredData = yearData.data.filter((item) => {
          const categoryMatch = !category || item.product_category.toLowerCase().includes(category.toLowerCase())
          const regionMatch = !region || item.region.toLowerCase().includes(region.toLowerCase())
          return categoryMatch && regionMatch
        })

        // Recalculate metrics for filtered data
        const totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0)
        const totalUnits = filteredData.reduce((sum, item) => sum + item.units_sold, 0)

        yearData = {
          ...yearData,
          data: filteredData,
          metrics: {
            ...yearData.metrics,
            total_revenue: Math.round(totalRevenue * 100) / 100,
            total_units: totalUnits,
            average_order_value: Math.round((totalRevenue / filteredData.length) * 100) / 100,
          },
        }
      }

      return NextResponse.json(yearData)
    }

    // Return summary data for all years
    const summary = Object.entries(allData).map(([year, data]) => ({
      year: Number.parseInt(year),
      total_revenue: data.metrics.total_revenue,
      total_units: data.metrics.total_units,
      growth_rate: data.metrics.growth_rate,
    }))

    return NextResponse.json({ summary, years_available: [2022, 2023, 2024] })
  } catch (error) {
    console.error("Error fetching sales data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
