'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { getCalendarEvents } from '@/lib/cosmic'
import type { CalendarEvent } from '@/types'

export function RecentEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      try {
        const fetchedEvents = await getCalendarEvents()
        
        // Filter to show only upcoming events
        const now = new Date()
        const upcomingEvents = fetchedEvents
          .filter(event => {
            const eventDate = new Date(event.metadata?.event_date || '')
            return eventDate >= now
          })
          .slice(0, 5) // Show only next 5 events
        
        setEvents(upcomingEvents)
      } catch (error) {
        console.error('Error loading events:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <button className="flex items-center space-x-1 text-primary hover:text-primary/80 text-sm">
          <Plus className="h-4 w-4" />
          <span>Add Event</span>
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No upcoming events</p>
          <p className="text-xs mt-1">Add your first event to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => {
            const eventDate = new Date(event.metadata?.event_date || '')
            const isToday = format(eventDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
            const isTomorrow = format(eventDate, 'yyyy-MM-dd') === format(new Date(Date.now() + 86400000), 'yyyy-MM-dd')
            
            let dateDisplay = format(eventDate, 'MMM d')
            if (isToday) dateDisplay = 'Today'
            else if (isTomorrow) dateDisplay = 'Tomorrow'

            return (
              <div
                key={event.id}
                className="flex items-center space-x-3 p-3 hover:bg-accent rounded-md transition-colors"
              >
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${isToday 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                  }
                `}>
                  {eventDate.getDate()}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {event.metadata?.event_title || event.title}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{dateDisplay}</span>
                    {event.metadata?.start_time && (
                      <>
                        <Clock className="h-3 w-3" />
                        <span>{event.metadata.start_time}</span>
                      </>
                    )}
                  </div>
                  {event.metadata?.calendar_system && (
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                        {event.metadata.calendar_system}
                      </span>
                    </div>
                  )}
                </div>

                {event.metadata?.reminder_enabled && (
                  <div className="text-amber-500">
                    <Clock className="h-4 w-4" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-4 pt-3 border-t">
        <button className="text-sm text-primary hover:text-primary/80 w-full text-center">
          View all events →
        </button>
      </div>
    </div>
  )
}