/**
 * Unified Backend Inquiry & Supabase Service
 * 
 * Directly connected in backend / service layer:
 * - Persists all contact inquiries to Supabase database (`inquiries` table).
 * - Realtime WebSocket subscription for instant cross-device notifications.
 * - Delivers immediate email notifications to bharathlokesh07@gmail.com.
 * - Automatically caches inquiries in localStorage for offline resilience.
 */

import { createClient } from '@supabase/supabase-js';

// Supabase Backend Credentials (from .env or production environment)
export const SUPABASE_URL = (
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  'https://lhpzqobwsryzshtndsau.supabase.co'
).trim().replace(/\/+$/, '');

export const SUPABASE_ANON_KEY = (
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  'sb_publishable_Og7iUS3U90c9HnLiBncfNw_1SEUPIXZ'
).trim();

export const ALERT_EMAIL = (
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ALERT_EMAIL) ||
  'bharathlokesh07@gmail.com'
).trim();

const LOCAL_INQUIRIES_KEY = 'bharath_portfolio_inquiries_v1';

// Initialize Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false }
});

export function isSupabaseReady() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export function getDbConfig() {
  return {
    provider: 'supabase',
    supabaseUrl: SUPABASE_URL,
    supabaseKey: SUPABASE_ANON_KEY,
    emailNotify: true,
    recipientEmail: ALERT_EMAIL
  };
}

/**
 * Persist an inquiry to Supabase cloud and send an instant email alert.
 */
export async function sendInquiry(inquiryData) {
  const timestamp = new Date().toISOString();
  const inquiryRecord = {
    name: inquiryData.name || 'Anonymous',
    email: inquiryData.email || 'No email provided',
    subject: inquiryData.subject || 'Portfolio Inquiry',
    message: inquiryData.message || '',
    read: false,
    created_at: timestamp
  };

  let savedToCloud = false;
  let cloudError = null;

  // 1. Direct Supabase Insert using Client Library
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([inquiryRecord])
      .select();

    if (!error && data && data.length > 0) {
      savedToCloud = true;
      inquiryRecord.id = data[0].id;
    } else if (error) {
      console.warn('Supabase insert error:', error);
      cloudError = error.message;
    }
  } catch (err) {
    console.warn('Supabase network error:', err);
    cloudError = err.message;
  }

  // Fallback ID if Supabase didn't assign one
  if (!inquiryRecord.id) {
    inquiryRecord.id = `inq-${Date.now()}`;
  }

  // 2. Email Notification to bharathlokesh07@gmail.com
  try {
    fetch(`https://formsubmit.co/ajax/${ALERT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New Portfolio Message from ${inquiryRecord.name}`,
        _template: 'table',
        Name: inquiryRecord.name,
        Email: inquiryRecord.email,
        Subject: inquiryRecord.subject,
        Message: inquiryRecord.message,
        Date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }).catch(err => console.log('Email alert ping sent/logged', err));
  } catch {
    // Non-blocking notification
  }

  // 3. Cache into local storage
  if (typeof localStorage !== 'undefined') {
    try {
      const saved = localStorage.getItem(LOCAL_INQUIRIES_KEY);
      const list = saved ? JSON.parse(saved) : [];
      list.unshift(inquiryRecord);
      localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(list));
    } catch {}
  }

  return {
    success: true,
    savedToCloud,
    cloudError,
    inquiry: inquiryRecord
  };
}

/**
 * Fetch all inquiries directly from Supabase.
 */
export async function fetchInquiries() {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      const mapped = data.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        subject: item.subject || 'Portfolio Inquiry',
        message: item.message,
        date: item.created_at,
        read: Boolean(item.read)
      }));

      // Cache locally for offline availability
      if (typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(mapped));
        } catch {}
      }

      return {
        source: 'supabase',
        inquiries: mapped
      };
    } else if (error) {
      console.warn('Supabase fetch error:', error);
    }
  } catch (err) {
    console.warn('Failed to fetch from Supabase:', err);
  }

  // Fallback to locally cached inquiries if offline
  let cached = [];
  if (typeof localStorage !== 'undefined') {
    try {
      const saved = localStorage.getItem(LOCAL_INQUIRIES_KEY);
      if (saved) cached = JSON.parse(saved);
    } catch {}
  }

  return {
    source: 'supabase',
    inquiries: cached
  };
}

/**
 * Realtime WebSocket Subscription
 * Fires instantly when an inquiry is inserted on any device anywhere in the world!
 */
export function subscribeToInquiries(callback) {
  try {
    const channel = supabase
      .channel('realtime:inquiries')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'inquiries' },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (e) {
    console.warn('Failed to subscribe to realtime inquiries:', e);
    return () => {};
  }
}

/**
 * Mark inquiry as read on Supabase
 */
export async function markInquiryReadCloud(id, readStatus = true) {
  try {
    await supabase.from('inquiries').update({ read: readStatus }).eq('id', id);
  } catch (err) {
    console.warn('Failed to update read status on Supabase:', err);
  }
}

/**
 * Delete inquiry from Supabase
 */
export async function deleteInquiryCloud(id) {
  try {
    await supabase.from('inquiries').delete().eq('id', id);
  } catch (err) {
    console.warn('Failed to delete inquiry on Supabase:', err);
  }
}
