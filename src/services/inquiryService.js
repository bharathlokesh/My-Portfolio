/**
 * Unified Backend Inquiry & Supabase Service
 * 
 * Directly connected in backend / service layer:
 * - Persists all contact inquiries to Supabase database (`inquiries` table).
 * - Delivers immediate email notifications to bharathlokesh07@gmail.com.
 * - Automatically caches inquiries in localStorage for offline viewing.
 */

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

  // 1. Direct Supabase Insert
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(inquiryRecord)
    });

    if (res.ok) {
      const data = await res.json();
      savedToCloud = true;
      inquiryRecord.id = data[0]?.id || `supa-${Date.now()}`;
    } else {
      const errText = await res.text();
      console.warn('Supabase insert failed:', errText);
      cloudError = `Supabase HTTP ${res.status}: ${errText}`;
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
    const res = await fetch(`${SUPABASE_URL}/rest/v1/inquiries?select=*&order=created_at.desc`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      const items = Array.isArray(data) ? data : (data && typeof data === 'object' ? [data] : []);
      const mapped = items.map(item => ({
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
    } else {
      const errText = await res.text();
      console.warn('Supabase fetch failed HTTP', res.status, errText);
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
 * Mark inquiry as read on Supabase
 */
export async function markInquiryReadCloud(id, readStatus = true) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/inquiries?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ read: readStatus })
    });
  } catch (err) {
    console.warn('Failed to update read status on Supabase', err);
  }
}

/**
 * Delete inquiry from Supabase
 */
export async function deleteInquiryCloud(id) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/inquiries?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
  } catch (err) {
    console.warn('Failed to delete inquiry on Supabase', err);
  }
}
