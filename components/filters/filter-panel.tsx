"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Filter, RotateCcw } from "lucide-react"

export interface FilterState {
  salesThreshold: number | null
  category: string | null
  region: string | null
  year: string | null
  dateRange: { start: string; end: string } | null
}

interface FilterPanelProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

const CATEGORIES = [
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

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [tempThreshold, setTempThreshold] = useState(filters.salesThreshold?.toString() || "")

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilter = (key: keyof FilterState) => {
    updateFilter(key, null)
  }

  const clearAllFilters = () => {
    onFiltersChange({
      salesThreshold: null,
      category: null,
      region: null,
      year: null,
      dateRange: null,
    })
    setTempThreshold("")
  }

  const applyThreshold = () => {
    const threshold = tempThreshold ? Number.parseFloat(tempThreshold) : null
    updateFilter("salesThreshold", threshold)
  }

  const activeFiltersCount = Object.values(filters).filter((value) => value !== null).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Sales Threshold Filter */}
          <div className="space-y-2">
            <Label htmlFor="threshold">Custom Sales Threshold</Label>
            <div className="flex gap-2">
              <Input
                id="threshold"
                type="number"
                placeholder="Enter minimum sales amount"
                value={tempThreshold}
                onChange={(e) => setTempThreshold(e.target.value)}
                className="flex-1"
              />
              <Button onClick={applyThreshold} size="sm">
                Apply
              </Button>
            </div>
            {filters.salesThreshold && (
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  Threshold: ${filters.salesThreshold.toLocaleString()}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => clearFilter("salesThreshold")} />
                </Badge>
              </div>
            )}
          </div>

          {/* Year Filter */}
          <div className="space-y-2">
            <Label>Year</Label>
            <Select
              value={filters.year || "all"}
              onValueChange={(value) => updateFilter("year", value === "all" ? null : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <Label>Product Category</Label>
            <Select
              value={filters.category || "all"}
              onValueChange={(value) => updateFilter("category", value === "all" ? null : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Region Filter */}
          <div className="space-y-2">
            <Label>Region</Label>
            <Select
              value={filters.region || "all"}
              onValueChange={(value) => updateFilter("region", value === "all" ? null : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {REGIONS.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="space-y-2">
              <Label>Active Filters</Label>
              <div className="flex flex-wrap gap-2">
                {filters.year && (
                  <Badge variant="outline">
                    Year: {filters.year}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => clearFilter("year")} />
                  </Badge>
                )}
                {filters.category && (
                  <Badge variant="outline">
                    Category: {filters.category}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => clearFilter("category")} />
                  </Badge>
                )}
                {filters.region && (
                  <Badge variant="outline">
                    Region: {filters.region}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => clearFilter("region")} />
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
