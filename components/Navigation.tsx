'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Calendar, 
  Home, 
  Wallet, 
  CloudSun, 
  DollarSign, 
  ArrowRightLeft, 
  Settings,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Expenses', href: '/expenses', icon: Wallet },
  { name: 'Weather', href: '/weather', icon: CloudSun },
  { name: 'Currencies', href: '/currencies', icon: DollarSign },
  { name: 'Date Converter', href: '/converter', icon: ArrowRightLeft },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card border border-border rounded-md"
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <nav className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-card border-r border-border
        transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        flex flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-primary" />
            <div>
              <h1 className="font-bold text-lg">Multi-Calendar</h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6 px-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium
                  transition-colors duration-200
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* Theme Toggle */}
        <div className="p-4 border-t border-border">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 lg:hidden bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}