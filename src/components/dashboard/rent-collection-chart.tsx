"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { formatCurrency } from "../../lib/demo-data"
import { BarChart3 } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface RentCollectionChartProps {
  data: { month: string; amount: number }[]
}

export function RentCollectionChart({ data }: RentCollectionChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">Month</span>
              <span className="font-bold text-sm">{label}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">Amount</span>
              <span className="font-bold text-sm">{formatCurrency(payload[0].value)}</span>
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
          <BarChart3 className="mr-2 h-5 w-5 text-primary" />
          Rent Collection Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} className="fill-primary" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
