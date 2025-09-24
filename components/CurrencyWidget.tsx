'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'
import { getCurrencyRates, formatCurrencyValue, formatPriceChange, getPriceChangeColor, getPriceChangeIcon, getCurrencyFlag } from '@/lib/currency'
import type { CurrencyRate } from '@/types'

export function CurrencyWidget() {
  const [currencies, setCurrencies] = useState<CurrencyRate[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showCrypto, setShowCrypto] = useState(true)

  useEffect(() => {
    loadCurrencies()
  }, [])

  async function loadCurrencies() {
    try {
      setLoading(true)
      const rates = await getCurrencyRates()
      setCurrencies(rates)
    } catch (error) {
      console.error('Error loading currencies:', error)
    } finally {
      setLoading(false)
    }
  }

  async function refreshRates() {
    try {
      setRefreshing(true)
      const rates = await getCurrencyRates()
      setCurrencies(rates)
    } catch (error) {
      console.error('Error refreshing rates:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const displayedCurrencies = currencies.filter(currency => 
    showCrypto ? currency.isCrypto : !currency.isCrypto
  )

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
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
        <h2 className="text-xl font-semibold">
          {showCrypto ? 'Cryptocurrencies' : 'Exchange Rates'}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={refreshRates}
            disabled={refreshing}
            className="p-1 hover:bg-accent rounded"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Toggle */}
      <div className="flex mb-4">
        <button
          onClick={() => setShowCrypto(false)}
          className={`px-3 py-1 text-sm rounded-l-md border ${
            !showCrypto 
              ? 'bg-primary text-primary-foreground border-primary' 
              : 'bg-background border-border hover:bg-accent'
          }`}
        >
          Fiat
        </button>
        <button
          onClick={() => setShowCrypto(true)}
          className={`px-3 py-1 text-sm rounded-r-md border-l-0 border ${
            showCrypto 
              ? 'bg-primary text-primary-foreground border-primary' 
              : 'bg-background border-border hover:bg-accent'
          }`}
        >
          Crypto
        </button>
      </div>

      {/* Currency List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {displayedCurrencies.map((currency) => (
          <div
            key={currency.code}
            className="flex items-center justify-between p-3 hover:bg-accent rounded-md transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">
                {getCurrencyFlag(currency.code)}
              </span>
              <div>
                <div className="font-medium text-sm">{currency.code}</div>
                <div className="text-xs text-muted-foreground">
                  {currency.name}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-medium text-sm">
                {currency.isCrypto 
                  ? formatCurrencyValue(currency.rate, { ...currency, symbol: '$' })
                  : formatCurrencyValue(currency.rate, currency)
                }
              </div>
              <div className={`text-xs flex items-center space-x-1 ${getPriceChangeColor(currency.change24h)}`}>
                <span>{getPriceChangeIcon(currency.change24h)}</span>
                <span>{formatPriceChange(currency.change24h)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Last Updated */}
      <div className="text-xs text-muted-foreground mt-4 pt-3 border-t">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  )
}