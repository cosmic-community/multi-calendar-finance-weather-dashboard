'use client'

import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import type { Theme } from '@/types'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const themes: { value: Theme; label: string; icon: React.ComponentType<any> }[] = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ]

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-muted-foreground">Theme:</span>
      <div className="flex items-center border border-border rounded-md">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          const isActive = theme === themeOption.value

          return (
            <button
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className={`
                flex items-center justify-center p-2 text-xs
                ${isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent hover:text-accent-foreground'
                }
                ${themeOption.value === 'light' ? 'rounded-l' : ''}
                ${themeOption.value === 'system' ? 'rounded-r' : ''}
              `}
              title={themeOption.label}
            >
              <Icon className="h-4 w-4" />
            </button>
          )
        })}
      </div>
    </div>
  )
}