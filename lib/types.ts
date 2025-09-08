export interface SalesData {
  id: string
  date: string
  year: number
  month: number
  quarter: number
  revenue: number
  units_sold: number
  product_category: string
  region: string
  customer_segment: string
  sales_rep: string
  profit_margin: number
}

export interface MonthlySales {
  month: string
  year: number
  revenue: number
  units_sold: number
  profit: number
}

export interface CategorySales {
  category: string
  revenue: number
  units_sold: number
  growth_rate: number
}

export interface RegionalSales {
  region: string
  revenue: number
  market_share: number
}

export interface SalesMetrics {
  total_revenue: number
  total_units: number
  average_order_value: number
  conversion_rate: number
  growth_rate: number
}

export interface SalesResponse {
  data: SalesData[]
  metrics: SalesMetrics
  monthly_breakdown: MonthlySales[]
  category_breakdown: CategorySales[]
  regional_breakdown: RegionalSales[]
}
