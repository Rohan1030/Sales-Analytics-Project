"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, LineChartIcon, PieChartIcon } from "lucide-react"
import { fetchSalesData } from "@/lib/api"
import type { CategorySales } from "@/lib/types"

type ChartType = "bar" | "line" | "pie"

interface MultiTypeChartProps {
  year: number
  category?: string | null
  region?: string | null
  salesThreshold?: number | null
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function MultiTypeChart({ year, category, region, salesThreshold }: MultiTypeChartProps) {
  const [chartType, setChartType] = useState<ChartType>("bar")
  const [data, setData] = useState<CategorySales[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const salesData = await fetchSalesData(year, category || undefined, region || undefined)

        let filteredData = salesData.category_breakdown

        // Apply sales threshold filter
        if (salesThreshold) {
          filteredData = filteredData.filter((item) => item.revenue >= salesThreshold)
        }

        setData(filteredData)
      } catch (error) {
        console.error("Error loading multi-type chart data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [year, category, region, salesThreshold])

  const renderChart = () => {
    if (loading) {
      return (
        <div className="h-80 flex items-center justify-center">
          <div className="text-muted-foreground">Loading chart data...</div>
        </div>
      )
    }

    if (data.length === 0) {
      return (
        <div className="h-80 flex items-center justify-center">
          <div className="text-muted-foreground">No data matches the current filters</div>
        </div>
      )
    }

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="category"
                className="text-xs fill-muted-foreground"
                angle={-45}
                textAnchor="end"
                height={80}
              />
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
              <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )

      case "line":
        return (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="category"
                className="text-xs fill-muted-foreground"
                angle={-45}
                textAnchor="end"
                height={80}
              />
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
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        )

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, revenue }) => `${category}: $${(revenue / 1000).toFixed(0)}K`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="revenue"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Sales Analysis - {year}</CardTitle>
        <div className="flex items-center gap-1">
          <Button variant={chartType === "bar" ? "default" : "outline"} size="sm" onClick={() => setChartType("bar")}>
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button variant={chartType === "line" ? "default" : "outline"} size="sm" onClick={() => setChartType("line")}>
            <LineChartIcon className="h-4 w-4" />
          </Button>
          <Button variant={chartType === "pie" ? "default" : "outline"} size="sm" onClick={() => setChartType("pie")}>
            <PieChartIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  )
}
