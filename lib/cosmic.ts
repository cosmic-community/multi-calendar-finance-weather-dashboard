import { createBucketClient } from '@cosmicjs/sdk'
import type {
  CalendarEvent,
  ExpenseCategory,
  Currency,
  LocalizationContent,
  AppSetting,
  CosmicResponse
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Calendar Events API
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'calendar-events' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as CalendarEvent[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.event_date || '').getTime();
      const dateB = new Date(b.metadata?.event_date || '').getTime();
      return dateA - dateB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch calendar events');
  }
}

export async function createCalendarEvent(eventData: Omit<CalendarEvent, 'id' | 'created_at' | 'modified_at'>): Promise<CalendarEvent> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'calendar-events',
      title: eventData.title,
      slug: eventData.slug,
      metadata: eventData.metadata
    });
    
    return response.object as CalendarEvent;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw new Error('Failed to create calendar event');
  }
}

export async function updateCalendarEvent(id: string, updates: Partial<CalendarEvent['metadata']>): Promise<CalendarEvent> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: updates
    });
    
    return response.object as CalendarEvent;
  } catch (error) {
    console.error('Error updating calendar event:', error);
    throw new Error('Failed to update calendar event');
  }
}

export async function deleteCalendarEvent(id: string): Promise<void> {
  try {
    await cosmic.objects.deleteOne(id);
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    throw new Error('Failed to delete calendar event');
  }
}

// Expense Categories API
export async function getExpenseCategories(): Promise<ExpenseCategory[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'expense-categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as ExpenseCategory[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch expense categories');
  }
}

export async function createExpenseCategory(categoryData: Omit<ExpenseCategory, 'id' | 'created_at' | 'modified_at'>): Promise<ExpenseCategory> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'expense-categories',
      title: categoryData.title,
      slug: categoryData.slug,
      metadata: categoryData.metadata
    });
    
    return response.object as ExpenseCategory;
  } catch (error) {
    console.error('Error creating expense category:', error);
    throw new Error('Failed to create expense category');
  }
}

// Currencies API
export async function getCurrencies(): Promise<Currency[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'currencies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Currency[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch currencies');
  }
}

export async function createCurrency(currencyData: Omit<Currency, 'id' | 'created_at' | 'modified_at'>): Promise<Currency> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'currencies',
      title: currencyData.title,
      slug: currencyData.slug,
      metadata: currencyData.metadata
    });
    
    return response.object as Currency;
  } catch (error) {
    console.error('Error creating currency:', error);
    throw new Error('Failed to create currency');
  }
}

// Localization Content API
export async function getLocalizationContent(category?: string): Promise<LocalizationContent[]> {
  try {
    const query: Record<string, any> = { type: 'localization-content' };
    
    if (category) {
      query['metadata.text_category'] = category;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as LocalizationContent[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch localization content');
  }
}

export async function createLocalizationContent(contentData: Omit<LocalizationContent, 'id' | 'created_at' | 'modified_at'>): Promise<LocalizationContent> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'localization-content',
      title: contentData.title,
      slug: contentData.slug,
      metadata: contentData.metadata
    });
    
    return response.object as LocalizationContent;
  } catch (error) {
    console.error('Error creating localization content:', error);
    throw new Error('Failed to create localization content');
  }
}

// App Settings API
export async function getAppSettings(): Promise<AppSetting[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'app-settings' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as AppSetting[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch app settings');
  }
}

export async function getAppSetting(key: string): Promise<AppSetting | null> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'app-settings',
        'metadata.setting_key': key
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects[0] as AppSetting || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch app setting');
  }
}

export async function createAppSetting(settingData: Omit<AppSetting, 'id' | 'created_at' | 'modified_at'>): Promise<AppSetting> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'app-settings',
      title: settingData.title,
      slug: settingData.slug,
      metadata: settingData.metadata
    });
    
    return response.object as AppSetting;
  } catch (error) {
    console.error('Error creating app setting:', error);
    throw new Error('Failed to create app setting');
  }
}

export async function updateAppSetting(id: string, updates: Partial<AppSetting['metadata']>): Promise<AppSetting> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: updates
    });
    
    return response.object as AppSetting;
  } catch (error) {
    console.error('Error updating app setting:', error);
    throw new Error('Failed to update app setting');
  }
}