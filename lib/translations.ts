import type { Language } from '@/types';

// Translation keys and fallback text
const translations = {
  // Navigation
  dashboard: {
    en: 'Dashboard',
    fa: 'داشبورد',
    ps: 'ډېشبورډ'
  },
  calendar: {
    en: 'Calendar',
    fa: 'تقویم',
    ps: 'جنتری'
  },
  expenses: {
    en: 'Expenses',
    fa: 'هزینه‌ها',
    ps: 'لګښتونه'
  },
  weather: {
    en: 'Weather',
    fa: 'آب و هوا',
    ps: 'هوا'
  },
  currencies: {
    en: 'Currencies',
    fa: 'ارزها',
    ps: 'اسعارو'
  },
  converter: {
    en: 'Date Converter',
    fa: 'تبدیل تاریخ',
    ps: 'نېټه بدلونکی'
  },
  settings: {
    en: 'Settings',
    fa: 'تنظیمات',
    ps: 'تنظیمات'
  },

  // Calendar
  today: {
    en: 'Today',
    fa: 'امروز',
    ps: 'نن'
  },
  addEvent: {
    en: 'Add Event',
    fa: 'افزودن رویداد',
    ps: 'پېښه ورګډول'
  },
  eventTitle: {
    en: 'Event Title',
    fa: 'عنوان رویداد',
    ps: 'د پېښې سرلیک'
  },
  description: {
    en: 'Description',
    fa: 'توضیحات',
    ps: 'تشریح'
  },
  allDay: {
    en: 'All Day',
    fa: 'تمام روز',
    ps: 'ټوله ورځ'
  },
  startTime: {
    en: 'Start Time',
    fa: 'زمان شروع',
    ps: 'د پیل وخت'
  },
  endTime: {
    en: 'End Time',
    fa: 'زمان پایان',
    ps: 'د پای وخت'
  },
  repeat: {
    en: 'Repeat',
    fa: 'تکرار',
    ps: 'تکرارول'
  },
  reminder: {
    en: 'Reminder',
    fa: 'یادآوری',
    ps: 'یادونه'
  },

  // Expenses
  addExpense: {
    en: 'Add Expense',
    fa: 'افزودن هزینه',
    ps: 'لګښت ورګډول'
  },
  amount: {
    en: 'Amount',
    fa: 'مبلغ',
    ps: 'اندازه'
  },
  category: {
    en: 'Category',
    fa: 'دسته‌بندی',
    ps: 'کټګورۍ'
  },
  daily: {
    en: 'Daily',
    fa: 'روزانه',
    ps: 'ورځنۍ'
  },
  weekly: {
    en: 'Weekly',
    fa: 'هفتگی',
    ps: 'اوونیز'
  },
  monthly: {
    en: 'Monthly',
    fa: 'ماهانه',
    ps: 'میاشتنۍ'
  },
  total: {
    en: 'Total',
    fa: 'مجموع',
    ps: 'ټول'
  },

  // Weather
  currentWeather: {
    en: 'Current Weather',
    fa: 'آب و هوای فعلی',
    ps: 'اوسنۍ هوا'
  },
  forecast: {
    en: 'Forecast',
    fa: 'پیش‌بینی',
    ps: 'وړاندوینه'
  },
  humidity: {
    en: 'Humidity',
    fa: 'رطوبت',
    ps: 'لندبل'
  },
  windSpeed: {
    en: 'Wind Speed',
    fa: 'سرعت باد',
    ps: 'د بادونو سرعت'
  },
  pressure: {
    en: 'Pressure',
    fa: 'فشار',
    ps: 'فشار'
  },
  visibility: {
    en: 'Visibility',
    fa: 'دید',
    ps: 'لیدنه'
  },
  uvIndex: {
    en: 'UV Index',
    fa: 'شاخص UV',
    ps: 'د UV شاخص'
  },

  // Currency
  exchangeRates: {
    en: 'Exchange Rates',
    fa: 'نرخ ارز',
    ps: 'د تبادلې نرخونه'
  },
  cryptocurrencies: {
    en: 'Cryptocurrencies',
    fa: 'ارزهای دیجیتال',
    ps: 'کریپټو اسعارو'
  },
  priceChange: {
    en: '24h Change',
    fa: 'تغییر ۲۴ ساعته',
    ps: 'د ۲۴ ساعتونو بدلون'
  },

  // Date Converter
  convertDate: {
    en: 'Convert Date',
    fa: 'تبدیل تاریخ',
    ps: 'نېټه بدلول'
  },
  selectDate: {
    en: 'Select Date',
    fa: 'انتخاب تاریخ',
    ps: 'نېټه غوره کول'
  },
  gregorianDate: {
    en: 'Gregorian Date',
    fa: 'تاریخ میلادی',
    ps: 'میلادي نېټه'
  },
  solarDate: {
    en: 'Solar Date',
    fa: 'تاریخ خورشیدی',
    ps: 'لمریز نېټه'
  },
  lunarDate: {
    en: 'Lunar Date',
    fa: 'تاریخ قمری',
    ps: 'سپوږمیز نېټه'
  },

  // Settings
  language: {
    en: 'Language',
    fa: 'زبان',
    ps: 'ژبه'
  },
  calendarSystem: {
    en: 'Calendar System',
    fa: 'سیستم تقویم',
    ps: 'د جنتری سیسټم'
  },
  theme: {
    en: 'Theme',
    fa: 'تم',
    ps: 'ډول'
  },
  lightMode: {
    en: 'Light Mode',
    fa: 'حالت روشن',
    ps: 'روښانه حالت'
  },
  darkMode: {
    en: 'Dark Mode',
    fa: 'حالت تیره',
    ps: 'تیاره حالت'
  },
  systemMode: {
    en: 'System',
    fa: 'سیستم',
    ps: 'سیسټم'
  },
  notifications: {
    en: 'Notifications',
    fa: 'اعلان‌ها',
    ps: 'اطلاعیې'
  },
  location: {
    en: 'Location',
    fa: 'موقعیت',
    ps: 'موقعیت'
  },
  defaultCurrency: {
    en: 'Default Currency',
    fa: 'ارز پیش‌فرض',
    ps: 'اصلي اسعارو'
  },

  // Common
  save: {
    en: 'Save',
    fa: 'ذخیره',
    ps: 'خوندي کول'
  },
  cancel: {
    en: 'Cancel',
    fa: 'لغو',
    ps: 'منسوخول'
  },
  edit: {
    en: 'Edit',
    fa: 'ویرایش',
    ps: 'سمول'
  },
  delete: {
    en: 'Delete',
    fa: 'حذف',
    ps: 'ړنګول'
  },
  add: {
    en: 'Add',
    fa: 'افزودن',
    ps: 'ورګډول'
  },
  search: {
    en: 'Search',
    fa: 'جستجو',
    ps: 'پلټنه'
  },
  loading: {
    en: 'Loading...',
    fa: 'در حال بارگذاری...',
    ps: 'رابرسېږي...'
  },
  error: {
    en: 'Error',
    fa: 'خطا',
    ps: 'تېروتنه'
  },
  noData: {
    en: 'No data available',
    fa: 'داده‌ای موجود نیست',
    ps: 'هیڅ معلومات شتون نلري'
  },

  // Language names
  english: {
    en: 'English',
    fa: 'انگلیسی',
    ps: 'انګلیسي'
  },
  persian: {
    en: 'Persian',
    fa: 'فارسی',
    ps: 'فارسي'
  },
  pashto: {
    en: 'Pashto',
    fa: 'پشتو',
    ps: 'پښتو'
  }
};

export function t(key: keyof typeof translations, language: Language = 'en'): string {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation not found for key: ${key}`);
    return key;
  }

  return translation[language] || translation.en || key;
}

export function getCurrentDirection(language: Language): 'ltr' | 'rtl' {
  return language === 'fa' || language === 'ps' ? 'rtl' : 'ltr';
}

export function getLanguageClass(language: Language): string {
  switch (language) {
    case 'fa':
      return 'persian-font rtl';
    case 'ps':
      return 'pashto-font rtl';
    default:
      return 'ltr';
  }
}

export { translations };