# Multi-Calendar Finance & Weather Dashboard

![App Preview](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=300&fit=crop&auto=format)

A comprehensive web-based calendar and productivity dashboard that brings together multiple calendar systems (Solar, Lunar, Gregorian), multi-language support, financial tracking, weather forecasting, and event management. Built for users in Iran, Afghanistan, and other Persian/Pashto-speaking regions.

## ✨ Features

- **Multi-Calendar System**: Support for Solar (Jalali), Lunar (Hijri), and Gregorian calendars with seamless switching
- **Multi-Language Support**: Full localization in Persian (Farsi), Pashto, and English with RTL layout support
- **Date Converter Tool**: Interactive conversion between Hijri ↔ Gregorian, Jalali ↔ Gregorian, and Jalali ↔ Hijri
- **Event Management**: Create, edit, and delete reminders with repeat intervals and notifications
- **Weather Forecast**: 7-day weather forecast with detailed metrics and location-based data
- **Expense Tracking**: Daily expense recorder with categorization and visual analytics
- **Currency Tracker**: Live exchange rates and real-time cryptocurrency prices
- **Dark/Light Theme**: System-wide theme toggle with smooth transitions
- **Settings Panel**: Comprehensive configuration for language, calendar type, and preferences
- **Responsive Design**: Optimized for all screen sizes and devices

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68d3c74de4b13704227fab11&clone_repository=68d3d01ae4b13704227fabaf)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Solar, Lunar & Gregorian Calendar App with Multi-language & Advanced Features (Flutter Project Description) A comprehensive mobile calendar application developed using Flutter, supporting multiple calendar systems, languages, financial tracking, weather, reminders, and more. Core Features: Calendar Systems Support for Solar (Persian/Jalali) calendar. Support for Lunar (Hijri) calendar. Support for Gregorian (Western) calendar. Seamless switching between calendar types. Accurate date conversion between Solar, Lunar, and Gregorian systems. Multi-language Support Full localization in: Persian (Farsi) Pashto English RTL (Right-to-Left) layout support for Persian and Pashto. Dynamic language switching within the app. Date Converter Tool Interactive date converter between: Hijri ↔ Gregorian Jalali ↔ Gregorian Jalali ↔ Hijri Copy result to clipboard. Share converted dates. Reminder & Events Create, edit, and delete reminders/events. Set daily, weekly, or custom repeat intervals. Notifications for upcoming events. Support for both Gregorian and Hijri event dates. 7-Day Weather Forecast Detailed 7-day weather forecast. Current temperature, humidity, wind speed, UV index, pressure, visibility. Hourly and daily weather breakdown. Location-based weather using GPS. Weather icons and trend graphs. Daily Expense Tracker Record daily expenses in local currency. Categorize expenses (e.g., food, transport, bills). View daily, weekly, and monthly summaries. Visual charts (bar/pie) for spending analysis. Export data as CSV or JSON. Backup & Restore: Save expense data locally or to cloud (optional). Export/import backup files (e.g., to Google Drive or local storage). Currency & Cryptocurrency Tracker Live exchange rates for major fiat currencies (USD, EUR, GBP, etc.). Real-time prices for cryptocurrencies (Bitcoin, Ethereum, etc.). Price change indicators (▲ for increase, ▼ for decrease). Favorite currencies/cryptos list. Refresh interval settings. Dark Mode System-wide Dark/Light theme toggle. Option to follow system theme or set manually. Smooth theme transitions. Settings Panel Language selection. Default calendar type. Notification preferences. Theme (dark/light). Backup & restore options. Currency selection. Location settings for weather. Auto-update intervals. Platform Built with Flutter for iOS and Android. Responsive UI for all screen sizes. Offline support for core features (calendar, expenses, reminders). Technical Stack (Flutter) State Management: Provider / Bloc / Riverpod (choose one) Localization: flutter_localizations + custom arb files Calendar Logic: jalaali_js, hijri, or custom conversion algorithms Weather API: OpenWeatherMap, WeatherAPI, or similar Currency/Crypto API: CoinGecko, exchangerateapi, etc. Persistence: shared_preferences, hive, or sqflite for local data Notifications: flutter_local_notifications Backup: File I/O + optional Firebase/Google Drive integration This app combines productivity, finance, and lifestyle tools into a single, user-friendly interface with full multi-language and RTL support, ideal for users in Iran, Afghanistan, and other Persian/Pashto-speaking regions."

### Code Generation Prompt

> Solar, Lunar & Gregorian Calendar App with Multi-language & Advanced Features (Flutter Project Description) A comprehensive mobile calendar application developed using Flutter, supporting multiple calendar systems, languages, financial tracking, weather, reminders, and more.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Cosmic CMS**: Headless content management
- **React Hook Form**: Form handling and validation
- **Recharts**: Data visualization library
- **Date-fns**: Date manipulation and formatting
- **Lucide React**: Modern icon library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Bun package manager
- Cosmic account and bucket

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   OPENWEATHERMAP_API_KEY=your-weather-api-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Calendar Events
```typescript
const events = await cosmic.objects
  .find({ type: 'calendar-events' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Creating Expense Categories
```typescript
await cosmic.objects.insertOne({
  type: 'expense-categories',
  title: 'Food & Dining',
  metadata: {
    category_name: 'Food & Dining',
    category_icon: '🍽️',
    color: '#FF6B35',
    active: true
  }
});
```

### Managing Localization Content
```typescript
const translations = await cosmic.objects
  .find({ 
    type: 'localization-content',
    'metadata.text_category': 'ui'
  })
  .props(['title', 'metadata']);
```

## 🌐 Cosmic CMS Integration

This application integrates with your Cosmic bucket's content structure:

- **Calendar Events**: Manage events across different calendar systems with reminder settings
- **Expense Categories**: Organize spending categories with icons and colors for visual charts
- **Currencies**: Track both traditional currencies and cryptocurrencies with regional defaults
- **Localization Content**: Multi-language content management for Persian, Pashto, and English
- **App Settings**: Global application configuration and user preferences

The content model supports the complex requirements of a multi-calendar, multi-language application with financial and weather features.

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your repository to Netlify  
2. Add environment variables in site settings
3. Deploy with automatic builds

### Environment Variables for Production
Set these variables in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY` 
- `COSMIC_WRITE_KEY`
- `OPENWEATHERMAP_API_KEY`

<!-- README_END -->