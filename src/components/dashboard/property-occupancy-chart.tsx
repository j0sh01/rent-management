"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { PieChartIcon } from "lucide-react"

interface PropertyOccupancyChartProps {
  data: {
    occupied: number
    vacant: number
  }
}

export function PropertyOccupancyChart({ data }: PropertyOccupancyChartProps) {
  const chartData = [
    { name: "Occupied", value: data.occupied },
    { name: "Vacant", value: data.vacant },
  ]

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))"]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">Status</span>
              <span className="font-bold text-sm">{payload[0].name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">Count</span>
              <span className="font-bold text-sm">{payload[0].value}</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <PieChartIcon className="mr-2 h-5 w-5 text-primary" />
          Property Occupancy
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
