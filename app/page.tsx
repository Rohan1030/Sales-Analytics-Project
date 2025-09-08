"use client"

import { useState, useCallback } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsCards } from "@/components/metrics-cards"
import { RevenueTrendChart } from "@/components/charts/revenue-trend-chart"
import { CategorySalesChart } from "@/components/charts/category-sales-chart"
import { RegionalDistributionChart } from "@/components/charts/regional-distribution-chart"
import { QuarterlyComparisonChart } from "@/components/charts/quarterly-comparison-chart"
import { FilterPanel, type FilterState } from "@/components/filters/filter-panel"
import { MultiTypeChart } from "@/components/charts/multi-type-chart"

export default function DashboardPage() {
  const [filters, setFilters] = useState<FilterState>({
    salesThreshold: null,
    category: null,
    region: null,
    year: null,
    dateRange: null,
  })

  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1)
  }, [])

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [])

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader onRefresh={handleRefresh} />
        <MetricsCards />

        <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="col-span-full">
            <RevenueTrendChart key={`revenue-${refreshKey}`} />
          </div>

          <div className="col-span-full">
            <MultiTypeChart
              year={filters.year ? Number.parseInt(filters.year) : 2024}
              category={filters.category}
              region={filters.region}
              salesThreshold={filters.salesThreshold}
            />
          </div>

          <CategorySalesChart key={`category-${refreshKey}`} />
          <RegionalDistributionChart key={`regional-${refreshKey}`} />

          <div className="col-span-full">
            <QuarterlyComparisonChart key={`quarterly-${refreshKey}`} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
