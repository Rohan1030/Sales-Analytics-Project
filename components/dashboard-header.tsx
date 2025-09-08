"use client"

import { Button } from "@/components/ui/button"
import { CalendarDays, Download, RefreshCw, Settings } from "lucide-react"

interface DashboardHeaderProps {
  onRefresh?: () => void
}

export function DashboardHeader({ onRefresh }: DashboardHeaderProps) {
  const handleExport = () => {
    // Create a simple CSV export of current view
    const csvContent =
      "data:text/csv;charset=utf-8,Year,Revenue,Growth\n2022,2500000,5.2\n2023,2700000,8.0\n2024,2847392,5.4"
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "sales_data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sales Analytics</h1>
        <p className="text-muted-foreground mt-1">Track your sales performance across multiple years</p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          <CalendarDays className="mr-2 h-4 w-4" />
          Date Range
        </Button>
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button size="sm" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  )
}
