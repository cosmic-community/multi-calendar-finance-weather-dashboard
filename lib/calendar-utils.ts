import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { format as formatJalali, addDays as addDaysJalali } from 'date-fns-jalali';
import type { CalendarSystem, ConvertedDate } from '@/types';

// Calendar conversion utilities
export function convertDate(date: Date): ConvertedDate {
  // Gregorian date
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1;
  const gregorianDay = date.getDate();

  // Basic Solar (Jalali) conversion - simplified for demo
  const jalaliYear = gregorianYear - 621;
  const jalaliMonth = gregorianMonth;
  const jalaliDay = gregorianDay;

  // Basic Lunar (Hijri) conversion - simplified for demo
  const hijriYear = Math.floor((gregorianYear - 622) * 1.030684);
  const hijriMonth = gregorianMonth;
  const hijriDay = gregorianDay;

  return {
    gregorian: {
      year: gregorianYear,
      month: gregorianMonth,
      day: gregorianDay,
      formatted: format(date, 'yyyy/MM/dd')
    },
    solar: {
      year: jalaliYear,
      month: jalaliMonth,
      day: jalaliDay,
      formatted: formatJalali(date, 'yyyy/MM/dd')
    },
    lunar: {
      year: hijriYear,
      month: hijriMonth,
      day: hijriDay,
      formatted: `${hijriYear}/${hijriMonth.toString().padStart(2, '0')}/${hijriDay.toString().padStart(2, '0')}`
    }
  };
}

export function formatDateForCalendarSystem(date: Date, calendarSystem: CalendarSystem): string {
  const converted = convertDate(date);
  
  switch (calendarSystem) {
    case 'gregorian':
      return converted.gregorian.formatted;
    case 'solar':
      return converted.solar.formatted;
    case 'lunar':
      return converted.lunar.formatted;
    default:
      return converted.gregorian.formatted;
  }
}

// Generate calendar month view
export function generateCalendarMonth(date: Date, calendarSystem: CalendarSystem = 'gregorian') {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push({
      date: new Date(day),
      isCurrentMonth: day.getMonth() === date.getMonth(),
      isToday: format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
      formatted: formatDateForCalendarSystem(day, calendarSystem)
    });
    day = addDays(day, 1);
  }

  return days;
}

// Calendar system names
export const calendarSystemNames = {
  gregorian: {
    en: 'Gregorian',
    fa: 'میلادی',
    ps: 'میلادي'
  },
  solar: {
    en: 'Solar (Jalali)',
    fa: 'خورشیدی (جلالی)',
    ps: 'لمریز (جلالي)'
  },
  lunar: {
    en: 'Lunar (Hijri)',
    fa: 'قمری (هجری)',
    ps: 'سپوږمیز (هجري)'
  }
};

// Month names for different calendar systems
export const monthNames = {
  gregorian: {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    fa: ['ژانویه', 'فوریه', 'مارس', 'آپریل', 'مه', 'ژوئن', 'ژوئیه', 'آگوست', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'],
    ps: ['جنوري', 'فبروري', 'مارچ', 'اپریل', 'مۍ', 'جون', 'جولای', 'اګست', 'سپتمبر', 'اکتوبر', 'نومبر', 'دسمبر']
  },
  solar: {
    en: ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand'],
    fa: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
    ps: ['وری', 'غویی', 'غبرګولی', 'چنګاښ', 'زمری', 'وږی', 'تله', 'لړم', 'لیندۍ', 'مرغومی', 'سلواغه', 'کب']
  },
  lunar: {
    en: ['Muharram', 'Safar', 'Rabi al-awwal', 'Rabi al-thani', 'Jumada al-awwal', 'Jumada al-thani', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qidah', 'Dhu al-Hijjah'],
    fa: ['محرم', 'صفر', 'ربیع الاول', 'ربیع الثانی', 'جمادی الاول', 'جمادی الثانی', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذی القعده', 'ذی الحجه'],
    ps: ['محرم', 'صفر', 'ربیع الاول', 'ربیع الثاني', 'جمادي الاولی', 'جمادي الثانیه', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذوالقعده', 'ذوالحجه']
  }
};

// Day names
export const dayNames = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  fa: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
  ps: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه']
};

// Utility functions for date manipulation
export function getCurrentDateForSystem(calendarSystem: CalendarSystem): string {
  const now = new Date();
  return formatDateForCalendarSystem(now, calendarSystem);
}

export function parseDate(dateString: string, calendarSystem: CalendarSystem): Date {
  // Simplified parsing - in a real app, you'd use proper calendar libraries
  const parts = dateString.split('/');
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[2]);

  switch (calendarSystem) {
    case 'gregorian':
      return new Date(year, month, day);
    case 'solar':
      // Convert Jalali to Gregorian - simplified
      return new Date(year + 621, month, day);
    case 'lunar':
      // Convert Hijri to Gregorian - simplified
      return new Date(Math.floor(year / 1.030684) + 622, month, day);
    default:
      return new Date(year, month, day);
  }
}