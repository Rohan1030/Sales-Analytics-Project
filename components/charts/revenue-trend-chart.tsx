"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchSalesData } from "@/lib/api"
import type { MonthlySales } from "@/lib/types"

interface RevenueTrendData {
  month: string
  "2022": number
  "2023": number
  "2024": number
}

export function RevenueTrendChart() {
  const [data, setData] = useState<RevenueTrendData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [data2022, data2023, data2024] = await Promise.all([
          fetchSalesData(2022),
          fetchSalesData(2023),
          fetchSalesData(2024),
        ])

        // Combine monthly data from all years
        const monthlyMap = new Map<string, RevenueTrendData>()

        const processYearData = (yearData: MonthlySales[], year: string) => {
          yearData.forEach((item) => {
            const key = item.month
            const existing = monthlyMap.get(key) || { month: key, "2022": 0, "2023": 0, "2024": 0 }
            existing[year as keyof RevenueTrendData] = item.revenue
            monthlyMap.set(key, existing)
          })
        }

        processYearData(data2022.monthly_breakdown, "2022")
        processYearData(data2023.monthly_breakdown, "2023")
        processYearData(data2024.monthly_breakdown, "2024")

        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const sortedData = Array.from(monthlyMap.values()).sort(
          (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month),
        )

        setData(sortedData)
      } catch (error) {
        console.error("Error loading revenue trend data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-muted-foreground">Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trends (2022-2024)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
            <YAxis
              className="text-xs fill-muted-foreground"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
              labelClassName="text-foreground"
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="2022" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="2023" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="2024" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
