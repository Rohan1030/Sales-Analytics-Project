"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchSalesData } from "@/lib/api"

interface QuarterlyData {
  quarter: string
  "2022": number
  "2023": number
  "2024": number
}

export function QuarterlyComparisonChart() {
  const [data, setData] = useState<QuarterlyData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [data2022, data2023, data2024] = await Promise.all([
          fetchSalesData(2022),
          fetchSalesData(2023),
          fetchSalesData(2024),
        ])

        // Calculate quarterly totals
        const calculateQuarterly = (monthlyData: any[]) => {
          const quarterly = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 }
          monthlyData.forEach((item) => {
            const month = item.month
            if (["Jan", "Feb", "Mar"].includes(month)) quarterly.Q1 += item.revenue
            else if (["Apr", "May", "Jun"].includes(month)) quarterly.Q2 += item.revenue
            else if (["Jul", "Aug", "Sep"].includes(month)) quarterly.Q3 += item.revenue
            else quarterly.Q4 += item.revenue
          })
          return quarterly
        }

        const q2022 = calculateQuarterly(data2022.monthly_breakdown)
        const q2023 = calculateQuarterly(data2023.monthly_breakdown)
        const q2024 = calculateQuarterly(data2024.monthly_breakdown)

        const quarterlyData: QuarterlyData[] = [
          { quarter: "Q1", "2022": q2022.Q1, "2023": q2023.Q1, "2024": q2024.Q1 },
          { quarter: "Q2", "2022": q2022.Q2, "2023": q2023.Q2, "2024": q2024.Q2 },
          { quarter: "Q3", "2022": q2022.Q3, "2023": q2023.Q3, "2024": q2024.Q3 },
          { quarter: "Q4", "2022": q2022.Q4, "2023": q2023.Q4, "2024": q2024.Q4 },
        ]

        setData(quarterlyData)
      } catch (error) {
        console.error("Error loading quarterly comparison data:", error)
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
          <CardTitle>Quarterly Comparison</CardTitle>
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
        <CardTitle>Quarterly Revenue Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="quarter" className="text-xs fill-muted-foreground" />
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
            <Bar dataKey="2022" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
            <Bar dataKey="2023" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
            <Bar dataKey="2024" fill="hsl(var(--chart-3))" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
