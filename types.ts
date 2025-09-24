// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Calendar Events
interface CalendarEvent extends CosmicObject {
  type: 'calendar-events';
  metadata: {
    event_title: string;
    description?: string;
    calendar_system: 'gregorian' | 'solar' | 'lunar';
    event_date: string;
    all_day?: boolean;
    start_time?: string;
    end_time?: string;
    repeat_interval?: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    reminder_enabled?: boolean;
    reminder_minutes?: number;
  };
}

// Expense Categories
interface ExpenseCategory extends CosmicObject {
  type: 'expense-categories';
  metadata: {
    category_name: string;
    category_icon?: string;
    description?: string;
    color?: string;
    active?: boolean;
  };
}

// Currencies
interface Currency extends CosmicObject {
  type: 'currencies';
  metadata: {
    currency_name: string;
    currency_code: string;
    currency_symbol: string;
    is_crypto?: boolean;
    default_region?: 'global' | 'iran' | 'afghanistan' | 'usa' | 'europe';
    active?: boolean;
  };
}

// Localization Content
interface LocalizationContent extends CosmicObject {
  type: 'localization-content';
  metadata: {
    text_key: string;
    english_text: string;
    persian_text?: string;
    pashto_text?: string;
    text_category?: 'ui' | 'navigation' | 'messages' | 'calendar' | 'weather' | 'expenses';
  };
}

// App Settings
interface AppSetting extends CosmicObject {
  type: 'app-settings';
  metadata: {
    setting_key: string;
    setting_name: string;
    setting_value: string;
    setting_type: 'string' | 'boolean' | 'number' | 'json';
    category?: 'general' | 'calendar' | 'notifications' | 'weather' | 'currency' | 'theme';
    description?: string;
  };
}

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Application state types
type Language = 'en' | 'fa' | 'ps';
type CalendarSystem = 'gregorian' | 'solar' | 'lunar';
type Theme = 'light' | 'dark' | 'system';

interface UserPreferences {
  language: Language;
  calendarSystem: CalendarSystem;
  theme: Theme;
  defaultCurrency: string;
  weatherLocation?: string;
  notifications: boolean;
}

// Weather API types
interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    uvIndex: number;
    pressure: number;
    visibility: number;
    condition: string;
    icon: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
  }>;
}

// Currency API types
interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  change24h: number;
  isCrypto: boolean;
}

// Expense tracking types
interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  currency: string;
}

interface ExpensesSummary {
  daily: number;
  weekly: number;
  monthly: number;
  byCategory: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}

// Date conversion types
interface ConvertedDate {
  gregorian: {
    year: number;
    month: number;
    day: number;
    formatted: string;
  };
  solar: {
    year: number;
    month: number;
    day: number;
    formatted: string;
  };
  lunar: {
    year: number;
    month: number;
    day: number;
    formatted: string;
  };
}

// Component props types
interface CalendarViewProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  calendarSystem: CalendarSystem;
  events: CalendarEvent[];
  language: Language;
}

interface WeatherWidgetProps {
  location: string;
  language: Language;
}

interface ExpenseTrackerProps {
  categories: ExpenseCategory[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  language: Language;
}

interface CurrencyTrackerProps {
  currencies: Currency[];
  language: Language;
}

interface DateConverterProps {
  language: Language;
}

// Form types
interface EventFormData {
  title: string;
  description: string;
  calendarSystem: CalendarSystem;
  date: string;
  allDay: boolean;
  startTime: string;
  endTime: string;
  repeatInterval: string;
  reminderEnabled: boolean;
  reminderMinutes: number;
}

interface ExpenseFormData {
  amount: number;
  category: string;
  description: string;
  date: string;
  currency: string;
}

interface SettingsFormData {
  language: Language;
  calendarSystem: CalendarSystem;
  theme: Theme;
  defaultCurrency: string;
  weatherLocation: string;
  notifications: boolean;
}

// Utility types
type OptionalMetadata<T> = Partial<T['metadata']>;
type CreateEventData = Omit<CalendarEvent, 'id' | 'created_at' | 'modified_at'>;
type UpdateEventData = Partial<CreateEventData>;

// Type guards
function isCalendarEvent(obj: CosmicObject): obj is CalendarEvent {
  return obj.type === 'calendar-events';
}

function isExpenseCategory(obj: CosmicObject): obj is ExpenseCategory {
  return obj.type === 'expense-categories';
}

function isCurrency(obj: CosmicObject): obj is Currency {
  return obj.type === 'currencies';
}

function isLocalizationContent(obj: CosmicObject): obj is LocalizationContent {
  return obj.type === 'localization-content';
}

function isAppSetting(obj: CosmicObject): obj is AppSetting {
  return obj.type === 'app-settings';
}

export type {
  CosmicObject,
  CalendarEvent,
  ExpenseCategory,
  Currency,
  LocalizationContent,
  AppSetting,
  CosmicResponse,
  Language,
  CalendarSystem,
  Theme,
  UserPreferences,
  WeatherData,
  CurrencyRate,
  Expense,
  ExpensesSummary,
  ConvertedDate,
  CalendarViewProps,
  WeatherWidgetProps,
  ExpenseTrackerProps,
  CurrencyTrackerProps,
  DateConverterProps,
  EventFormData,
  ExpenseFormData,
  SettingsFormData,
  OptionalMetadata,
  CreateEventData,
  UpdateEventData,
};

export {
  isCalendarEvent,
  isExpenseCategory,
  isCurrency,
  isLocalizationContent,
  isAppSetting,
};