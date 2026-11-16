/**
 * Unified Inquiry & Database Service
 * Handles storing contact form inquiries in real-time cloud databases (Supabase / Firebase)
 * and forwards instant email alerts to bharathlokesh07@gmail.com.
 */

const DB_CONFIG_KEY = 'bharath_portfolio_db_config_v1';

// Default Supabase project endpoints (fallback if .env is missing or dev server was not restarted)
const DEFAULT_SUPABASE_URL = 'https://lhpzqobwsryzshtndsau.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_Og7iUS3U90c9HnLiBncfNw_1SEUPIXZ';

function isPlaceholder(val) {
  if (!val || typeof val !== 'string') return true;
  const s = val.trim();
  return !s || s.includes('your-project-ref') || s.includes('your-anon') || s.includes('your-actual');
}

// Default configuration from environment (.env) or localStorage
export function getDbConfig() {
  const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};

  // Reject placeholder values baked in from earlier server starts
  const envUrl = (!isPlaceholder(env.VITE_SUPABASE_URL) ? env.VITE_SUPABASE_URL : DEFAULT_SUPABASE_URL).trim();
  const envKey = (!isPlaceholder(env.VITE_SUPABASE_ANON_KEY) ? env.VITE_SUPABASE_ANON_KEY : DEFAULT_SUPABASE_KEY).trim();

  const envConfig = {
    provider: env.VITE_DB_PROVIDER || 'supabase', // 'supabase' | 'firebase' | 'local'
    supabaseUrl: envUrl,
    supabaseKey: envKey,
    firebaseUrl: (env.VITE_FIREBASE_DB_URL || '').trim(),
    emailNotify: true,
    recipientEmail: (env.VITE_ALERT_EMAIL || 'bharathlokesh07@gmail.com').trim()
  };

  if (typeof localStorage !== 'undefined') {
    try {
      const saved = localStorage.getItem(DB_CONFIG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Discard stale placeholders or empty values from previous local storage saves
        const validSavedUrl = !isPlaceholder(parsed.supabaseUrl) ? parsed.supabaseUrl.trim() : '';
        const validSavedKey = !isPlaceholder(parsed.supabaseKey) ? parsed.supabaseKey.trim() : '';

        const merged = {
          provider: parsed.provider && parsed.provider !== 'local' ? parsed.provider : envConfig.provider,
          supabaseUrl: validSavedUrl || envConfig.supabaseUrl,
          supabaseKey: validSavedKey || envConfig.supabaseKey,
          firebaseUrl: parsed.firebaseUrl || envConfig.firebaseUrl,
          emailNotify: parsed.emailNotify !== undefined ? parsed.emailNotify : envConfig.emailNotify,
          recipientEmail: parsed.recipientEmail || envConfig.recipientEmail
        };

        // Self-heal: Overwrite old stale localStorage cache with active Supabase credentials
        if (!validSavedUrl || !validSavedKey || parsed.provider === 'local') {
          try {
            localStorage.setItem(DB_CONFIG_KEY, JSON.stringify(merged));
          } catch {}
        }

        return merged;
      }
    } catch (e) {
      console.warn('Failed to read db config from storage', e);
    }
  }

  return envConfig;
}

export function saveDbConfig(config) {
  if (typeof localStorage === 'undefined') return false;
  try {
    localStorage.setItem(DB_CONFIG_KEY, JSON.stringify(config));
    return true;
  } catch (e) {
    console.error('Failed to save db config', e);
    return false;
  }
}

export function isSupabaseReady(config = getDbConfig()) {
  if (!config?.supabaseUrl || !config?.supabaseKey) return false;
  if (isPlaceholder(config.supabaseUrl) || isPlaceholder(config.supabaseKey)) return false;
  return (config.supabaseUrl.startsWith('https://') || config.supabaseUrl.startsWith('http://')) && config.supabaseKey.length > 15;
}

export function isFirebaseReady(config = getDbConfig()) {
  if (!config?.firebaseUrl) return false;
  const url = config.firebaseUrl.trim();
  if (url.includes('your-project-default-rtdb')) return false;
  return url.startsWith('https://') || url.startsWith('http://');
}

/**
 * Send an inquiry:
 * 1. Attempts to persist to Cloud Database (Supabase or Firebase).
 * 2. Transmits an email notification via FormSubmit to ensure the admin is notified immediately.
 * 3. Falls back to local storage if offline or not yet configured.
 */
export async function sendInquiry(inquiryData) {
  const config = getDbConfig();
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

  // 1. Try Supabase if configured with real credentials
  if (isSupabaseReady(config)) {
    try {
      const cleanUrl = config.supabaseUrl.replace(/\/+$/, '');
      const res = await fetch(`${cleanUrl}/rest/v1/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': config.supabaseKey,
          'Authorization': `Bearer ${config.supabaseKey}`,
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
  }

  // 2. Try Firebase Realtime Database if configured and not yet saved
  if (!savedToCloud && isFirebaseReady(config)) {
    try {
      const cleanUrl = config.firebaseUrl.replace(/\/+$/, '');
      const res = await fetch(`${cleanUrl}/inquiries.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryRecord)
      });

      if (res.ok) {
        const data = await res.json();
        savedToCloud = true;
        inquiryRecord.id = data.name || `fb-${Date.now()}`;
      } else {
        const errText = await res.text();
        console.warn('Firebase insert failed:', errText);
        cloudError = `Firebase HTTP ${res.status}: ${errText}`;
      }
    } catch (err) {
      console.warn('Firebase network error:', err);
      cloudError = err.message;
    }
  }

  // 3. Email Notification to bharathlokesh07@gmail.com
  // Using FormSubmit AJAX endpoint so Bharath gets an immediate mobile email ping
  try {
    const targetEmail = config.recipientEmail || 'bharathlokesh07@gmail.com';
    fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
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
    }).catch(err => console.log('Email ping notification sent/logged', err));
  } catch {
    // Non-blocking notification
  }

  // If ID wasn't assigned by cloud DB, assign a local timestamp ID
  if (!inquiryRecord.id) {
    inquiryRecord.id = `inq-${Date.now()}`;
  }

  return {
    success: true,
    savedToCloud,
    cloudError,
    inquiry: inquiryRecord
  };
}

/**
 * Fetch all inquiries:
 * Tries cloud database first; falls back to local storage.
 */
export async function fetchInquiries() {
  const config = getDbConfig();

  // 1. Try Supabase
  if (isSupabaseReady(config)) {
    try {
      const cleanUrl = config.supabaseUrl.replace(/\/+$/, '');
      const res = await fetch(`${cleanUrl}/rest/v1/inquiries?select=*&order=created_at.desc`, {
        method: 'GET',
        headers: {
          'apikey': config.supabaseKey,
          'Authorization': `Bearer ${config.supabaseKey}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        const items = Array.isArray(data) ? data : (data && typeof data === 'object' ? [data] : []);
        return {
          source: 'supabase',
          inquiries: items.map(item => ({
            id: item.id,
            name: item.name,
            email: item.email,
            subject: item.subject || 'Portfolio Inquiry',
            message: item.message,
            date: item.created_at,
            read: Boolean(item.read)
          }))
        };
      } else {
        const errText = await res.text();
        console.warn('Supabase fetch failed HTTP', res.status, errText);
      }
    } catch (err) {
      console.warn('Failed to fetch from Supabase:', err);
    }
  }

  // 2. Try Firebase
  if (isFirebaseReady(config)) {
    try {
      const cleanUrl = config.firebaseUrl.replace(/\/+$/, '');
      const res = await fetch(`${cleanUrl}/inquiries.json`, {
        method: 'GET'
      });

      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object') {
          const list = Object.entries(data).map(([key, val]) => ({
            id: key,
            name: val.name,
            email: val.email,
            subject: val.subject || 'Portfolio Inquiry',
            message: val.message,
            date: val.created_at || val.date,
            read: Boolean(val.read)
          })).reverse();

          return {
            source: 'firebase',
            inquiries: list
          };
        }
        return { source: 'firebase', inquiries: [] };
      }
    } catch (err) {
      console.warn('Failed to fetch from Firebase:', err);
    }
  }

  // 3. Fallback to Local Storage
  return {
    source: 'local',
    inquiries: null // Caller uses local state
  };
}

/**
 * Mark an inquiry as read in cloud DB
 */
export async function markInquiryReadCloud(id, readStatus = true) {
  const config = getDbConfig();

  if (isSupabaseReady(config)) {
    try {
      const cleanUrl = config.supabaseUrl.replace(/\/+$/, '');
      await fetch(`${cleanUrl}/rest/v1/inquiries?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': config.supabaseKey,
          'Authorization': `Bearer ${config.supabaseKey}`
        },
        body: JSON.stringify({ read: readStatus })
      });
    } catch (err) {
      console.warn('Failed to update read status on Supabase', err);
    }
  } else if (isFirebaseReady(config)) {
    try {
      const cleanUrl = config.firebaseUrl.replace(/\/+$/, '');
      await fetch(`${cleanUrl}/inquiries/${id}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: readStatus })
      });
    } catch (err) {
      console.warn('Failed to update read status on Firebase', err);
    }
  }
}

/**
 * Delete an inquiry from cloud DB
 */
export async function deleteInquiryCloud(id) {
  const config = getDbConfig();

  if (isSupabaseReady(config)) {
    try {
      const cleanUrl = config.supabaseUrl.replace(/\/+$/, '');
      await fetch(`${cleanUrl}/rest/v1/inquiries?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': config.supabaseKey,
          'Authorization': `Bearer ${config.supabaseKey}`
        }
      });
    } catch (err) {
      console.warn('Failed to delete inquiry on Supabase', err);
    }
  } else if (isFirebaseReady(config)) {
    try {
      const cleanUrl = config.firebaseUrl.replace(/\/+$/, '');
      await fetch(`${cleanUrl}/inquiries/${id}.json`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('Failed to delete inquiry on Firebase', err);
    }
  }
}

/**
 * Test Connection Helper for Admin Settings
 */
export async function testDbConnection(configToTest) {
  if (configToTest.provider === 'supabase') {
    if (!configToTest.supabaseUrl || !configToTest.supabaseKey) {
      return { success: false, error: 'Please enter both Supabase URL and Anon Key.' };
    }
    try {
      const cleanUrl = configToTest.supabaseUrl.replace(/\/+$/, '');
      const res = await fetch(`${cleanUrl}/rest/v1/inquiries?select=id&limit=1`, {
        method: 'GET',
        headers: {
          'apikey': configToTest.supabaseKey,
          'Authorization': `Bearer ${configToTest.supabaseKey}`
        }
      });

      if (res.ok) {
        return { success: true, message: 'Successfully connected to Supabase inquiries table!' };
      } else {
        const text = await res.text();
        return {
          success: false,
          error: `Supabase returned HTTP ${res.status}: ${text}. (Make sure the 'inquiries' table exists with RLS enabled)`
        };
      }
    } catch (err) {
      return { success: false, error: `Connection failed: ${err.message}` };
    }
  } else if (configToTest.provider === 'firebase') {
    if (!configToTest.firebaseUrl) {
      return { success: false, error: 'Please enter your Firebase Realtime Database URL.' };
    }
    try {
      const cleanUrl = configToTest.firebaseUrl.replace(/\/+$/, '');
      const res = await fetch(`${cleanUrl}/inquiries.json?shallow=true`, { method: 'GET' });
      if (res.ok) {
        return { success: true, message: 'Successfully connected to Firebase Realtime Database!' };
      } else {
        return { success: false, error: `Firebase returned HTTP ${res.status}` };
      }
    } catch (err) {
      return { success: false, error: `Connection failed: ${err.message}` };
    }
  }

  return { success: true, message: 'Local storage mode active.' };
}

