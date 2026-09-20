/**
 * Google Analytics 4 (GA4) Custom Event Tracking Helper
 * Measurement ID: G-X74RNZNBN3
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params);
    } catch (e) {
      console.debug('[GA4 Track Event]', eventName, params);
    }
  }
}

export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle || document.title,
      });
    } catch (e) {
      console.debug('[GA4 Track PageView]', pagePath);
    }
  }
}

export function trackSyllabusDownload(courseTitle: string, courseCategory?: string) {
  trackEvent('download_syllabus', {
    course_name: courseTitle,
    course_category: courseCategory || 'Technical Curriculum',
    event_category: 'Curriculum',
    event_label: courseTitle,
  });
}

export function trackLeadSubmission(formType: string, courseInterest?: string) {
  trackEvent('generate_lead', {
    form_type: formType,
    course_interest: courseInterest || 'General Inquiry',
    event_category: 'Leads',
  });
}

export function trackCourseView(courseTitle: string, category?: string) {
  trackEvent('view_course_details', {
    course_title: courseTitle,
    category: category || 'Technology',
    event_category: 'Course Engagement',
  });
}
