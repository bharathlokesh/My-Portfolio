/**
 * Profile Cloud Synchronization Service (Supabase)
 * 
 * Synchronizes profile identity and profile photo across all devices in real-time:
 * - Persists profile data & photo to Supabase cloud database.
 * - Fetches the latest cloud profile for all live visitors on mobile & desktop.
 * - Provides Realtime WebSocket subscriptions so updates in the Admin Panel
 *   immediately reflect on live clients and mobile without reloading.
 * - Caches in localStorage for instant offline availability.
 */

import { supabase } from './inquiryService.js';

export const SYSTEM_PROFILE_SUBJECT = '__PORTFOLIO_PROFILE__';
export const SYSTEM_PROFILE_EMAIL = 'system.profile@portfolio.internal';
const LOCAL_PROFILE_KEY = 'bharath_portfolio_profile_v1';

/**
 * Fetch the latest profile data from Supabase Cloud.
 */
export async function fetchProfileCloud() {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .eq('subject', SYSTEM_PROFILE_SUBJECT)
      .order('created_at', { ascending: false })
      .limit(1);

    if (!error && Array.isArray(data) && data.length > 0) {
      const row = data[0];
      try {
        const parsed = JSON.parse(row.message);
        if (parsed && typeof parsed === 'object') {
          // Cache locally for instant loading next time
          if (typeof localStorage !== 'undefined') {
            try {
              localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(parsed));
            } catch {}
          }
          return { success: true, profile: parsed, recordId: row.id, updatedAt: row.created_at };
        }
      } catch (parseErr) {
        console.warn('Failed to parse cloud profile JSON:', parseErr);
      }
    }
  } catch (err) {
    console.warn('Failed to fetch cloud profile:', err);
  }

  // Fallback to local cache if offline or error
  if (typeof localStorage !== 'undefined') {
    try {
      const cached = localStorage.getItem(LOCAL_PROFILE_KEY);
      if (cached) {
        return { success: true, profile: JSON.parse(cached), isCached: true };
      }
    } catch {}
  }

  return { success: false, profile: null };
}

/**
 * Save / Update Profile & Profile Photo to Supabase Cloud.
 */
export async function saveProfileCloud(profileData) {
  if (!profileData || typeof profileData !== 'object') {
    return { success: false, error: 'Invalid profile data' };
  }

  const payload = JSON.stringify(profileData);
  const now = new Date().toISOString();

  try {
    // 1. Check if an existing profile configuration row exists
    const { data: existingRows } = await supabase
      .from('inquiries')
      .select('id')
      .eq('subject', SYSTEM_PROFILE_SUBJECT)
      .order('created_at', { ascending: false });

    if (existingRows && existingRows.length > 0) {
      const primaryId = existingRows[0].id;
      // Update primary row
      const { data, error } = await supabase
        .from('inquiries')
        .update({
          name: '__SYSTEM_PORTFOLIO_PROFILE__',
          email: SYSTEM_PROFILE_EMAIL,
          message: payload,
          read: true,
          created_at: now
        })
        .eq('id', primaryId)
        .select();

      // Clean up any extraneous duplicate rows if present
      if (existingRows.length > 1) {
        const extraIds = existingRows.slice(1).map(r => r.id);
        await supabase.from('inquiries').delete().in('id', extraIds);
      }

      if (!error && data) {
        return { success: true, profile: profileData, recordId: primaryId };
      }
      console.warn('Supabase profile update error:', error);
    }

    // 2. Insert new row if none existed
    const { data: insertData, error: insertError } = await supabase
      .from('inquiries')
      .insert([{
        name: '__SYSTEM_PORTFOLIO_PROFILE__',
        email: SYSTEM_PROFILE_EMAIL,
        subject: SYSTEM_PROFILE_SUBJECT,
        message: payload,
        read: true,
        created_at: now
      }])
      .select();

    if (!insertError && insertData && insertData.length > 0) {
      return { success: true, profile: profileData, recordId: insertData[0].id };
    }

    return { success: false, error: insertError?.message || 'Failed to save profile' };
  } catch (err) {
    console.warn('Network error saving profile to cloud:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Realtime WebSocket Subscription for Profile updates across all devices.
 */
export function subscribeToProfileCloud(onUpdate) {
  try {
    const channel = supabase
      .channel('realtime:profile_sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'inquiries' },
        (payload) => {
          if (
            (payload.new && payload.new.subject === SYSTEM_PROFILE_SUBJECT) ||
            (payload.old && payload.old.subject === SYSTEM_PROFILE_SUBJECT)
          ) {
            if (payload.new && payload.new.message) {
              try {
                const parsed = JSON.parse(payload.new.message);
                if (parsed && typeof parsed === 'object') {
                  onUpdate(parsed);
                }
              } catch (e) {
                console.warn('Realtime parse profile error:', e);
              }
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (e) {
    console.warn('Failed to subscribe to profile realtime:', e);
    return () => {};
  }
}
