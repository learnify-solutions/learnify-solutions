import { CmsData, LeadSubmission, Course } from '../types';
import { initialCmsData, sampleCourses } from '../data/defaultCmsData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export async function fetchCmsData(): Promise<CmsData> {
  // If Supabase is configured on client side, try reading from Supabase table
  if (isSupabaseConfigured && supabase) {
    try {
      // Check singleton (primary) or main (legacy)
      const { data, error } = await supabase
        .from('learnify_cms')
        .select('*')
        .or('id.eq.singleton,id.eq.main')
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        const payload = data.data || data.section_data;
        if (payload && typeof payload === 'object') {
          return {
            ...initialCmsData,
            ...payload,
          } as CmsData;
        }
      }
    } catch (err) {
      console.warn('Supabase client fetch notice, falling back to backend API:', err);
    }
  }

  // Otherwise, use our Express backend CMS API (which also queries Supabase server-side)
  try {
    const res = await fetch('/api/cms');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.success && json.data) {
      return {
        ...initialCmsData,
        ...json.data,
      };
    }
  } catch (err) {
    console.warn('Backend API fetch error, using local fallback:', err);
  }

  return initialCmsData;
}

export async function updateCmsData(updates: Partial<CmsData>): Promise<CmsData> {
  // If Supabase is configured on client side
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('learnify_cms')
        .upsert({
          id: 'singleton',
          data: updates,
          updated_at: new Date().toISOString()
        });
      if (error) console.warn('Supabase direct update notice:', error.message);
    } catch (err) {
      console.warn('Supabase update failed:', err);
    }
  }

  // Always update the backend Express API store (which also persists to Supabase server-side)
  const token = localStorage.getItem('learnify_admin_token');
  const res = await fetch('/api/cms', {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error('Failed to update CMS');
  }

  const json = await res.json();
  return json.data;
}

export async function resetCmsData(): Promise<CmsData> {
  const token = localStorage.getItem('learnify_admin_token');
  const res = await fetch('/api/cms/reset', { 
    method: 'POST',
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });
  if (!res.ok) throw new Error('Failed to reset CMS');
  const json = await res.json();
  return json.data;
}

export async function submitLead(lead: Omit<LeadSubmission, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string }> {
  // If Supabase is configured, also insert to Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('learnify_leads').insert([
        {
          full_name: lead.fullName,
          email: lead.email,
          company: lead.company,
          phone: lead.phone,
          inquiry_type: lead.inquiryType,
          selected_domain: lead.selectedDomain,
          message: lead.message,
        },
      ]);
    } catch (err) {
      console.warn('Supabase lead insert notice:', err);
    }
  }

  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || 'Failed to submit lead inquiry');
  }

  return res.json();
}

export async function fetchLeads(): Promise<LeadSubmission[]> {
  try {
    const token = localStorage.getItem('learnify_admin_token');
    if (!token) return []; // Only fetch leads if logged in as admin

    const res = await fetch('/api/leads', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('Failed to fetch leads');
    const json = await res.json();
    return json.leads || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchCourses(domain?: string, search?: string, isCiscoAuthorized?: boolean): Promise<Course[]> {
  try {
    const params = new URLSearchParams();
    if (domain) params.set('domain', domain);
    if (search) params.set('search', search);
    if (isCiscoAuthorized) params.set('catalog', 'enterprise');

    const res = await fetch(`/api/courses?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch courses');
    const json = await res.json();
    return json.courses || sampleCourses;
  } catch (err) {
    console.warn(err);
    return sampleCourses;
  }
}

export async function createCourse(courseData: Partial<Course>): Promise<{ success: boolean; course: Course; courses: Course[] }> {
  const token = localStorage.getItem('learnify_admin_token');
  const res = await fetch('/api/courses', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: JSON.stringify(courseData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create course');
  }
  return res.json();
}

export async function updateCourse(id: string, updates: Partial<Course>): Promise<{ success: boolean; course: Course; courses: Course[] }> {
  const token = localStorage.getItem('learnify_admin_token');
  const res = await fetch(`/api/courses/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update course');
  }
  return res.json();
}

export async function deleteCourse(id: string): Promise<{ success: boolean; courses: Course[] }> {
  const token = localStorage.getItem('learnify_admin_token');
  const res = await fetch(`/api/courses/${id}`, {
    method: 'DELETE',
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to delete course');
  }
  return res.json();
}

export async function uploadCourseImage(payload: { imageUrl?: string; base64Data?: string; fileName?: string }): Promise<string> {
  const token = localStorage.getItem('learnify_admin_token');
  const res = await fetch('/api/upload-image', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to process image');
  const json = await res.json();
  return json.url;
}

export async function uploadSyllabusPdf(payload: {
  syllabusUrl?: string;
  base64Data?: string;
  fileName?: string;
  fileSize?: string;
}): Promise<{ url: string; fileName: string; fileSize: string }> {
  const token = localStorage.getItem('learnify_admin_token');
  const res = await fetch('/api/upload-syllabus', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to upload syllabus PDF');
  }
  const json = await res.json();
  return {
    url: json.url,
    fileName: json.fileName,
    fileSize: json.fileSize,
  };
}

export async function getSupabaseStatus(): Promise<{ configured: boolean; supabaseUrl: string | null; sqlSchema: string }> {
  try {
    const token = localStorage.getItem('learnify_admin_token');
    const res = await fetch('/api/supabase/status', {
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    });
    if (!res.ok) throw new Error('Failed to get status');
    return res.json();
  } catch (err) {
    return {
      configured: false,
      supabaseUrl: null,
      sqlSchema: '',
    };
  }
}
