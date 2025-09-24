import type { CurrencyRate } from '@/types';

// Mock currency data - in production, you'd use real APIs like CoinGecko, ExchangeRatesAPI
export async function getCurrencyRates(): Promise<CurrencyRate[]> {
  try {
    // Mock API call for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return getMockCurrencyRates();
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    return getMockCurrencyRates();
  }
}

function getMockCurrencyRates(): CurrencyRate[] {
  return [
    {
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      rate: 1.00,
      change24h: 0.0,
      isCrypto: false
    },
    {
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
      rate: 0.85,
      change24h: -0.5,
      isCrypto: false
    },
    {
      code: 'GBP',
      name: 'British Pound',
      symbol: '£',
      rate: 0.73,
      change24h: 0.2,
      isCrypto: false
    },
    {
      code: 'JPY',
      name: 'Japanese Yen',
      symbol: '¥',
      rate: 149.50,
      change24h: -1.2,
      isCrypto: false
    },
    {
      code: 'IRR',
      name: 'Iranian Rial',
      symbol: '﷼',
      rate: 42000.0,
      change24h: 0.8,
      isCrypto: false
    },
    {
      code: 'AFN',
      name: 'Afghan Afghani',
      symbol: '؋',
      rate: 70.0,
      change24h: -0.3,
      isCrypto: false
    },
    {
      code: 'BTC',
      name: 'Bitcoin',
      symbol: '₿',
      rate: 43500.0,
      change24h: 2.5,
      isCrypto: true
    },
    {
      code: 'ETH',
      name: 'Ethereum',
      symbol: 'Ξ',
      rate: 2650.0,
      change24h: 1.8,
      isCrypto: true
    },
    {
      code: 'ADA',
      name: 'Cardano',
      symbol: '₳',
      rate: 0.48,
      change24h: -3.2,
      isCrypto: true
    },
    {
      code: 'DOT',
      name: 'Polkadot',
      symbol: 'DOT',
      rate: 6.25,
      change24h: 4.1,
      isCrypto: true
    }
  ];
}

export function formatCurrencyValue(amount: number, currency: CurrencyRate): string {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: currency.isCrypto ? 2 : 2,
    maximumFractionDigits: currency.isCrypto ? 8 : 2,
  }).format(amount);

  return `${currency.symbol}${formatted}`;
}

export function formatPriceChange(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

export function getPriceChangeColor(change: number): string {
  if (change > 0) return 'text-green-600';
  if (change < 0) return 'text-red-600';
  return 'text-gray-600';
}

export function getPriceChangeIcon(change: number): string {
  if (change > 0) return '▲';
  if (change < 0) return '▼';
  return '●';
}

// Convert between currencies (simplified conversion)
export function convertCurrency(
  amount: number,
  fromCurrency: CurrencyRate,
  toCurrency: CurrencyRate
): number {
  // Convert to USD first (base currency)
  const usdAmount = amount / fromCurrency.rate;
  
  // Convert from USD to target currency
  return usdAmount * toCurrency.rate;
}

export function getCurrencyFlag(currencyCode: string): string {
  const flagMap: Record<string, string> = {
    USD: '🇺🇸',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    JPY: '🇯🇵',
    IRR: '🇮🇷',
    AFN: '🇦🇫',
    CAD: '🇨🇦',
    AUD: '🇦🇺',
    CHF: '🇨🇭',
    CNY: '🇨🇳',
    INR: '🇮🇳',
    KRW: '🇰🇷',
    BRL: '🇧🇷',
    MXN: '🇲🇽',
    // Crypto currencies don't have flags
    BTC: '₿',
    ETH: 'Ξ',
    ADA: '₳',
    DOT: '●',
    LTC: 'Ł',
    XRP: 'X'
  };

  return flagMap[currencyCode] || '🌐';
}