import { BarChart3, Home, TrendingUp, Users, Settings, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Overview", href: "/", icon: Home, current: true },
  { name: "Sales Trends", href: "/trends", icon: TrendingUp, current: false },
  { name: "Analytics", href: "/analytics", icon: BarChart3, current: false },
  { name: "Customers", href: "/customers", icon: Users, current: false },
  { name: "Filters", href: "/filters", icon: Filter, current: false },
  { name: "Settings", href: "/settings", icon: Settings, current: false },
]

export function Sidebar() {
  return (
    <div className="flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-sidebar-primary" />
          <span className="text-xl font-bold text-sidebar-foreground">SalesHub</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                item.current
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </a>
          )
        })}
      </nav>
    </div>
  )
}
