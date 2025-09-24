'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Wallet, Plus } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { getExpenseCategories } from '@/lib/cosmic'
import type { ExpenseCategory, Expense, ExpensesSummary as ExpensesSummaryType } from '@/types'

export function ExpensesSummary() {
  const [categories, setCategories] = useState<ExpenseCategory[]>([])
  const [expenses] = useState<Expense[]>([]) // Mock data for demo
  const [summary, setSummary] = useState<ExpensesSummaryType>({
    daily: 0,
    weekly: 0,
    monthly: 0,
    byCategory: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedCategories = await getExpenseCategories()
        setCategories(fetchedCategories)
        
        // Generate mock summary data for demo
        const mockSummary: ExpensesSummaryType = {
          daily: 125.50,
          weekly: 780.25,
          monthly: 3250.75,
          byCategory: [
            { category: 'Food', amount: 1200, percentage: 37 },
            { category: 'Transport', amount: 850, percentage: 26 },
            { category: 'Entertainment', amount: 600, percentage: 18 },
            { category: 'Shopping', amount: 400, percentage: 12 },
            { category: 'Other', amount: 200.75, percentage: 7 }
          ]
        }
        setSummary(mockSummary)
      } catch (error) {
        console.error('Error loading expenses data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const chartData = summary.byCategory.map((item, index) => ({
    ...item,
    color: [`#3b82f6`, `#ef4444`, `#f59e0b`, `#10b981`, `#8b5cf6`][index] || '#6b7280'
  }))

  const weeklyData = [
    { day: 'Mon', amount: 120 },
    { day: 'Tue', amount: 95 },
    { day: 'Wed', amount: 180 },
    { day: 'Thu', amount: 75 },
    { day: 'Fri', amount: 140 },
    { day: 'Sat', amount: 85 },
    { day: 'Sun', amount: 85 }
  ]

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Expenses Overview</h2>
        <button className="flex items-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Daily</p>
              <p className="text-2xl font-bold">${summary.daily.toFixed(2)}</p>
            </div>
            <Wallet className="h-8 w-8 text-blue-500" />
          </div>
          <div className="flex items-center space-x-1 mt-2 text-sm">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-500">+12%</span>
            <span className="text-muted-foreground">vs yesterday</span>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Weekly</p>
              <p className="text-2xl font-bold">${summary.weekly.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
          <div className="flex items-center space-x-1 mt-2 text-sm">
            <TrendingDown className="h-3 w-3 text-red-500" />
            <span className="text-red-500">-5%</span>
            <span className="text-muted-foreground">vs last week</span>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Monthly</p>
              <p className="text-2xl font-bold">${summary.monthly.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
          <div className="flex items-center space-x-1 mt-2 text-sm">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-500">+8%</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown (Pie Chart) */}
        <div>
          <h3 className="text-lg font-medium mb-4">Spending by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {chartData.map((item, index) => (
              <div key={item.category} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.category}: {item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend (Bar Chart) */}
        <div>
          <h3 className="text-lg font-medium mb-4">Weekly Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip formatter={(value: number) => `$${value}`} />
                <Bar 
                  dataKey="amount" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}