"use client"

import { useState, useEffect } from "react"
import {
  Bar,
  Line,
  Area,
  Pie,
  ComposedChart,
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Cell
} from "recharts"
import { Filter, BarChart2, LineChart as LineIcon, PieChart as PieIcon, Calendar, Download, MoreHorizontal, BarChart3, BarChart4Icon, BarChart4, LucideBarChart4, SquareKanban } from "lucide-react"

const chartColors = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  muted: "hsl(var(--muted))",
  background: "hsl(var(--background))",
  border: "hsl(var(--border))",
  destructive: "hsl(var(--destructive))",
  pieColors: [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--muted))",
    "hsl(var(--destructive))",
    "hsl(215, 70%, 58%)",
    "hsl(142, 71%, 45%)",
    "hsl(47, 100%, 68%)",
    "hsl(285, 70%, 60%)",
    "hsl(332, 80%, 65%)",
    "hsl(190, 90%, 50%)",
    "hsl(25, 95%, 53%)"
  ]
}

// Initial data - this would typically come from an API
const initialData = [
  { name: "Jan", total: 45000, average: 38000, forecast: 42000 },
  { name: "Feb", total: 63500, average: 52000, forecast: 58000 },
  { name: "Mar", total: 58200, average: 54000, forecast: 62000 },
  { name: "Apr", total: 72800, average: 65000, forecast: 70000 },
  { name: "May", total: 85600, average: 76000, forecast: 82000 },
  { name: "Jun", total: 92400, average: 84000, forecast: 90000 },
  { name: "Jul", total: 105200, average: 95000, forecast: 100000 },
  { name: "Aug", total: 91000, average: 88000, forecast: 95000 },
  { name: "Sep", total: 97500, average: 92000, forecast: 98000 },
  { name: "Oct", total: 110800, average: 102000, forecast: 108000 },
  { name: "Nov", total: 142500, average: 120000, forecast: 135000 },
  { name: "Dec", total: 168000, average: 150000, forecast: 160000 },
]

const dataPeriods = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" }
]

const chartTypes = [
  { value: "bar", label: "Bar", icon: BarChart2 },
  { value: "line", label: "Line", icon: LineIcon },
  { value: "area", label: "Area", icon: BarChart3 },
  { value: "composed", label: "Area", icon: SquareKanban },
]

const metrics = [
  { value: "total", label: "Total Revenue" },
  { value: "average", label: "Average Revenue" },
  { value: "forecast", label: "Forecast" },
]

export function DashboardChart() {
  const [mounted, setMounted] = useState(false)
  const [chartType, setChartType] = useState("bar")
  const [dataPeriod, setDataPeriod] = useState("monthly")
  const [data, setData] = useState(initialData)
  const [selectedMetrics, setSelectedMetrics] = useState(["total"])
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter data based on period
  useEffect(() => {
    if (dataPeriod === "quarterly") {
      // Group by quarters
      const quarterlyData = [
        { name: "Q1", total: 0, average: 0, forecast: 0 },
        { name: "Q2", total: 0, average: 0, forecast: 0 },
        { name: "Q3", total: 0, average: 0, forecast: 0 },
        { name: "Q4", total: 0, average: 0, forecast: 0 },
      ]

      initialData.forEach((month, index) => {
        const quarter = Math.floor(index / 3)
        quarterlyData[quarter].total += month.total
        quarterlyData[quarter].average += month.average
        quarterlyData[quarter].forecast += month.forecast
      })

      // Calculate averages for quarterly data
      quarterlyData.forEach(quarter => {
        quarter.average = quarter.average / 3
        quarter.forecast = quarter.forecast / 3
      })

      setData(quarterlyData)
    } else if (dataPeriod === "yearly") {
      // Yearly aggregation
      const yearlyTotal = initialData.reduce((acc, month) => acc + month.total, 0)
      const yearlyAverage = initialData.reduce((acc, month) => acc + month.average, 0) / 12
      const yearlyForecast = initialData.reduce((acc, month) => acc + month.forecast, 0) / 12
      
      setData([{ name: "2025", total: yearlyTotal, average: yearlyAverage, forecast: yearlyForecast }])
    } else {
      // Default monthly
      setData(initialData)
    }
  }, [dataPeriod])

  // Toggle metrics selection
  const toggleMetric = (metric:any) => {
    if (selectedMetrics.includes(metric)) {
      if (selectedMetrics.length > 1) {
        setSelectedMetrics(selectedMetrics.filter(m => m !== metric))
      }
    } else {
      setSelectedMetrics([...selectedMetrics, metric])
    }
  }

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen)
  }

  // const formatCurrency = (value:any) => {
  //   return new Intl.NumberFormat('en-ZA', {
  //     style: 'currency',
  //     currency: 'ZAR',
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 0
  //   }).format(value)
  // }
  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  // Custom tooltip that appears above the bars
  const CustomTooltip = ({ active, payload, label }:any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-4 shadow-lg border border-border rounded-lg text-foreground">
          <p className="font-bold mb-2">{label}</p>
          {payload.map((entry:any, index:any) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="font-medium">{entry.name}: </span>
              <span>{formatCurrency(entry.value)}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  // Render the appropriate chart based on the selected chart type
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip 
              content={<CustomTooltip />}
              wrapperStyle={{ zIndex: 1000, pointerEvents: "none" }}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Legend wrapperStyle={{ bottom: 0 }} />
            {selectedMetrics.includes("total") && 
              <Bar name="Total Revenue" dataKey="total" fill={chartColors.primary} radius={[4, 4, 0, 0]} />
            }
            {selectedMetrics.includes("average") && 
              <Bar name="Average Revenue" dataKey="average" fill={chartColors.secondary} radius={[4, 4, 0, 0]} />
            }
            {selectedMetrics.includes("forecast") && 
              <Bar name="Forecast" dataKey="forecast" fill={chartColors.accent} radius={[4, 4, 0, 0]} />
            }
          </BarChart>
        )
      
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip 
              content={<CustomTooltip />}
              wrapperStyle={{ zIndex: 1000 }}
            />
            <Legend wrapperStyle={{ bottom: 0 }} />
            {selectedMetrics.includes("total") && 
              <Line name="Total Revenue" type="monotone" dataKey="total" stroke="#1e40af" strokeWidth={3} dot={{ r: 4, fill: "#1e40af", strokeWidth: 0 }}   
              activeDot={{ r: 6, fill: "#1e40af", stroke: "#ffffff", strokeWidth: 2 }}  />
            }
            {selectedMetrics.includes("average") && 
              <Line name="Average Revenue" type="monotone" dataKey="average" stroke="#9333ea" strokeWidth={3} dot={{ r: 4, fill: "#9333ea", strokeWidth: 0 }} activeDot={{ r: 6, fill: "#9333ea", stroke: "#ffffff", strokeWidth: 2 }}  />
            }
            {selectedMetrics.includes("forecast") && 
              <Line name="Forecast" type="monotone" dataKey="forecast" stroke="#059669" strokeWidth={3} dot={{ r: 4, fill: "#059669", strokeWidth: 0 }}  activeDot={{ r: 6, fill: "#059669", stroke: "#ffffff", strokeWidth: 2 }}  />
            }
          </LineChart>
        )
      
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip 
              content={<CustomTooltip />}
              wrapperStyle={{ zIndex: 1000 }}
            />
            <Legend wrapperStyle={{ bottom: 0 }} />
            {selectedMetrics.includes("total") && 
              <Area name="Total Revenue" type="monotone" dataKey="total" stroke={chartColors.primary} fill={`${chartColors.primary}40`} />
            }
            {selectedMetrics.includes("average") && 
              <Area name="Average Revenue" type="monotone" dataKey="average" stroke={chartColors.secondary} fill={`${chartColors.secondary}40`} />
            }
            {selectedMetrics.includes("forecast") && 
              <Area name="Forecast" type="monotone" dataKey="forecast" stroke={chartColors.accent} fill={`${chartColors.accent}40`} />
            }
          </AreaChart>
        )
      
      case 'composed':
        return (
          <ComposedChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip 
              content={<CustomTooltip />}
              wrapperStyle={{ zIndex: 1000 }}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Legend wrapperStyle={{ bottom: 0 }} />
            {selectedMetrics.includes("total") && 
              <Bar name="Total Revenue" dataKey="total" fill={chartColors.primary} radius={[4, 4, 0, 0]} />
            }
            {selectedMetrics.includes("average") && 
              <Line name="Average Revenue" type="monotone" dataKey="average" stroke={chartColors.secondary} strokeWidth={2} dot={{ r: 4 }} />
            }
            {selectedMetrics.includes("forecast") && 
              <Area name="Forecast" type="monotone" dataKey="forecast" stroke={chartColors.accent} fill={`${chartColors.accent}30`} />
            }
          </ComposedChart>
        )
      
      default:
        return null
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[400px] w-full bg-muted/20 rounded-md">
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  return (
    <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
      {/* Chart Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold">Revenue Analytics</h3>
        <div className="flex flex-wrap items-center gap-2">
          {/* Chart Type Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {chartTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setChartType(type.value)}
                className={`flex items-center justify-center p-2 rounded-md transition-colors ${
                  chartType === type.value 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
                }`}
                title={type.label}
              >
                <type.icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          {/* Filter Toggle Button */}
          <button 
            onClick={toggleFilters}
            className={`flex items-center gap-1 p-2 rounded-md ${
              isFiltersOpen 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <Filter className="h-4 w-4" />
            <span className="text-sm hidden sm:inline">Filters</span>
          </button>

          {/* Period Selector */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Calendar className="h-4 w-4 ml-2 text-muted-foreground" />
            <select 
              value={dataPeriod}
              onChange={(e) => setDataPeriod(e.target.value)}
              className="bg-transparent text-sm border-none focus:ring-0 py-1 pl-1 pr-6"
            >
              {dataPeriods.map((period) => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      {isFiltersOpen && (
        <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
          <h4 className="font-medium text-sm mb-3">Metrics</h4>
          <div className="flex flex-wrap gap-2">
            {metrics.map((metric) => (
              <button
                key={metric.value}
                onClick={() => toggleMetric(metric.value)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedMetrics.includes(metric.value)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted-foreground/20"
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart() || <div>No data available</div>}
        </ResponsiveContainer>
      </div>
    </div>
  )
}