'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { format, addMonths, subMonths } from 'date-fns'
import { generateCalendarMonth, formatDateForCalendarSystem } from '@/lib/calendar-utils'
import { getCalendarEvents } from '@/lib/cosmic'
import type { CalendarEvent, CalendarSystem } from '@/types'

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [calendarSystem, setCalendarSystem] = useState<CalendarSystem>('gregorian')
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      try {
        const fetchedEvents = await getCalendarEvents()
        setEvents(fetchedEvents)
      } catch (error) {
        console.error('Error loading events:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const calendarDays = generateCalendarMonth(currentDate, calendarSystem)
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(direction === 'prev' 
      ? subMonths(currentDate, 1) 
      : addMonths(currentDate, 1)
    )
  }

  const hasEvent = (date: Date) => {
    if (!events || events.length === 0) return false
    
    const dateString = format(date, 'yyyy-MM-dd')
    return events.some(event => {
      const eventDate = new Date(event.metadata?.event_date || '')
      return format(eventDate, 'yyyy-MM-dd') === dateString
    })
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Calendar</h2>
        <div className="flex items-center space-x-2">
          <select
            value={calendarSystem}
            onChange={(e) => setCalendarSystem(e.target.value as CalendarSystem)}
            className="text-sm border border-border rounded px-2 py-1 bg-background"
          >
            <option value="gregorian">Gregorian</option>
            <option value="solar">Solar (Jalali)</option>
            <option value="lunar">Lunar (Hijri)</option>
          </select>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-1 hover:bg-accent rounded"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <h3 className="font-medium">
          {format(currentDate, 'MMMM yyyy')}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-1 hover:bg-accent rounded"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid mb-4">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(day.date)}
            className={`
              calendar-day relative
              ${day.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}
              ${day.isToday ? 'bg-accent font-semibold' : ''}
              ${format(selectedDate, 'yyyy-MM-dd') === format(day.date, 'yyyy-MM-dd') 
                ? 'bg-primary text-primary-foreground' : ''}
            `}
          >
            {day.date.getDate()}
            {hasEvent(day.date) && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Selected Date Info */}
      <div className="text-sm text-muted-foreground border-t pt-3">
        <p>Selected: {formatDateForCalendarSystem(selectedDate, calendarSystem)}</p>
        {loading ? (
          <p className="mt-1">Loading events...</p>
        ) : (
          <p className="mt-1">
            {events.length} events total
          </p>
        )}
      </div>
    </div>
  )
}