import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface DashboardCardProps {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: DashboardCardProps) {
  return (
    <div className={cn("c-stat-card", className)}>
      <div className="c-stat-card__body">
        <div className="flex items-center justify-between">
          <div className="c-stat-card__content">
            <p className="c-stat-card__label">{title}</p>
            <p className="c-stat-card__value">{value}</p>
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
            {trend && (
              <div className={cn(
                "c-stat-card__trend",
                trend.isPositive ? "c-stat-card__trend--positive" : "c-stat-card__trend--negative"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}%
                <span className="ml-1 text-sm text-gray-500">vs 지난달</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className="c-stat-card__icon">
              <div className="rounded-full bg-blue-50 p-3">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 