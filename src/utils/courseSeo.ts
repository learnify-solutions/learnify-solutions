import { Course } from '../types';

export interface CourseFaqItem {
  q: string;
  a: string;
}

export interface CourseSeoMeta {
  title: string;
  description: string;
  keywords: string;
  faqs: CourseFaqItem[];
}

export function buildCourseFaqs(course: Course): CourseFaqItem[] {
  const vendor = course.certificationVendor || 'Official Vendor';
  const examCode = (course.examCode || '').trim();
  const examLabel = examCode ? `${course.title} (${examCode})` : course.title;
  const durationLabel = course.duration || '5 Days (40 Hours)';
  const levelLabel = course.skillLevel || course.level || 'Intermediate';
  const prereqText =
    Array.isArray(course.prerequisites) && course.prerequisites.length > 0
      ? course.prerequisites.join(' ')
      : `Foundational IT literacy or ${levelLabel.toLowerCase()} technical exposure in ${course.domain || vendor}.`;

  const vendorUpper = vendor.toUpperCase();
  const examDeliveryNote =
    vendorUpper === 'KUBERNETES'
      ? 'administered online by the Linux Foundation / CNCF as a 100% hands-on performance-based terminal exam'
      : vendorUpper === 'AWS'
        ? 'administered globally via Pearson VUE testing centers and Pearson OnVUE online proctoring'
        : vendorUpper === 'MICROSOFT'
          ? 'administered worldwide through Pearson VUE test centers and OnVUE online proctoring (with Microsoft ESI corporate support where applicable)'
          : 'administered globally through Pearson VUE authorized testing centers and OnVUE remote proctoring';

  return [
    {
      q: `What is included in the ${examLabel} training syllabus and exam prep?`,
      a: `This ${durationLabel} ${levelLabel.toLowerCase()}-level bootcamp covers 100% of official ${vendor}${examCode ? ` ${examCode}` : ''} exam objectives with live instructor walkthroughs, structured module breakdowns, scenario practice drills, and downloadable syllabus prep.`,
    },
    {
      q: `Are 24/7 hands-on labs and 365-day session recordings included with ${examCode || course.title}?`,
      a: `Yes. Every participant receives dedicated 24/7 browser-based cloud sandbox labs mapped to real ${vendor} topologies without needing expensive local hardware or personal cloud billing, plus 365-day HD recordings of live sessions.`,
    },
    {
      q: `How and where can I write the official ${examCode || course.title} certification exam?`,
      a: `The official ${vendor}${examCode ? ` (${examCode})` : ''} examination is ${examDeliveryNote} across North America, UK, Europe, UAE (Dubai/Abu Dhabi), South Africa (Johannesburg/Cape Town), and APAC.`,
    },
    {
      q: `What are the prerequisites, batch schedules, and corporate PO options for ${course.title}?`,
      a: `Recommended baseline: ${prereqText} Learnify Solutions offers 1-on-1 live mentorship, weekday intensive and weekend cohorts across US, UK (GMT/GBP), Europe (CET/EUR), UAE (GST/AED), and South Africa (SAST/ZAR), plus corporate Purchase Order (PO) invoicing.`,
    },
  ];
}

export function buildCourseSeoMeta(course: Course): CourseSeoMeta {
  const vendor = course.certificationVendor || 'IT';
  const examCode = (course.examCode || '').trim();
  const hasExamCodeInTitle = Boolean(
    examCode && course.title.toLowerCase().includes(examCode.toLowerCase())
  );
  const codeTag = examCode && !hasExamCodeInTitle ? ` (${examCode})` : '';

  const copilotBonus =
    course.id === 'course-ms-4018-copilot' ? ' & Copilot Studio' : '';
  const aPlusBonus =
    course.id === 'course-comptia-a-plus' ? ' / 220-1201 & 220-1202 V15' : '';

  const title = `${course.title}${codeTag}${copilotBonus} Course, Syllabus & Live Training (2026) | Learnify`;

  const rawSummary = (course.summary || course.overview || `Master ${course.title} with hands-on labs.`).trim();
  const shortSummary =
    rawSummary.length > 155 ? `${rawSummary.slice(0, 152).replace(/\s+\S*$/, '')}...` : rawSummary;

  const description = `${shortSummary} Official ${vendor}${examCode ? ` ${examCode}` : ''}${aPlusBonus} 2026 syllabus PDF, 24/7 sandbox labs, practice questions & 1-on-1 / corporate PO cohorts (UK, EU, UAE & SA).`;

  const keywords = [
    course.title,
    examCode,
    `${course.title} training`,
    `${vendor} ${examCode || course.title} course`,
    `${examCode || course.title} syllabus 2026`,
    `${examCode || course.title} practice test`,
    `${vendor} certification training 2026`,
    course.id === 'course-comptia-a-plus' ? 'CompTIA A+ 220-1201, CompTIA A+ 220-1202, CompTIA A+ V15 course' : '',
    course.id === 'course-ms-4018-copilot' ? 'Copilot Studio training, Microsoft 365 Copilot course UAE UK Europe' : '',
    `${course.domain} bootcamp`,
    'live online 1-on-1 IT training, 24/7 cloud sandbox labs, corporate PO IT certification, Learnify Solutions',
  ]
    .filter(Boolean)
    .join(', ');

  return {
    title,
    description,
    keywords,
    faqs: buildCourseFaqs(course),
  };
}
