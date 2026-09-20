import { Course } from '../types';
import { sampleCourses } from '../data/defaultCmsData';

/**
 * Normalizes and sanitizes text for standard jsPDF Type 1 (Helvetica) fonts.
 * Replaces non-WinAnsi characters (such as smart quotes, en/em dashes, checkmarks,
 * and high Unicode symbols) that otherwise corrupt PDF character tracking and spacing.
 */
function cleanPdfText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u2018\u2019]/g, "'") // smart single quotes
    .replace(/[\u201C\u201D]/g, '"') // smart double quotes
    .replace(/[\u2013\u2014\u2015]/g, '-') // en-dash and em-dash to hyphen
    .replace(/\u2026/g, '...') // ellipsis
    .replace(/[\u2713\u2714\u2611\u2705]/g, '') // checkmarks (drawn via vector)
    .replace(/\u2022/g, '') // bullets (drawn via vector)
    .replace(/\u00A0/g, ' ') // non-breaking space
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, ' ') // keep printable ASCII + standard Latin-1
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Loads the brand logo as base64 data URL for jsPDF embedding
 */
async function getLogoBase64(): Promise<{ data: string; format: 'PNG' | 'JPEG'; width: number; height: number } | null> {
  const logoPaths = ['/logo300.png', '/logo.jpeg', '/src/assets/images/logo300.png', '/src/assets/images/logo.jpeg'];
  
  for (const src of logoPaths) {
    try {
      const result = await new Promise<{ data: string; format: 'PNG' | 'JPEG'; width: number; height: number } | null>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || img.width || 300;
            canvas.height = img.naturalHeight || img.height || 100;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              // Fill with clean white background so transparent or dark borders are clean
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0);
              const format = src.endsWith('.jpeg') || src.endsWith('.jpg') ? 'JPEG' : 'PNG';
              const dataUrl = canvas.toDataURL(format === 'JPEG' ? 'image/jpeg' : 'image/png');
              resolve({
                data: dataUrl,
                format,
                width: canvas.width,
                height: canvas.height,
              });
            } else {
              resolve(null);
            }
          } catch {
            resolve(null);
          }
        };
        img.onerror = () => resolve(null);
        img.src = src;
      });

      if (result) return result;
    } catch {
      continue;
    }
  }

  return null;
}

/**
 * Resolves course against master CMS sample data to guarantee complete official curriculum,
 * domain outlines, percentages, learning objectives, and prerequisites.
 */
function resolveFullCourseData(course: Course): Course {
  const matchingSample = sampleCourses.find((sc) => sc.id === course.id);
  return {
    ...matchingSample,
    ...course,
    title: course.title || matchingSample?.title || '',
    certificationVendor: course.certificationVendor || matchingSample?.certificationVendor || 'Technology',
    domain: course.domain || matchingSample?.domain || 'Enterprise IT',
    skillLevel: course.skillLevel || matchingSample?.skillLevel || 'Intermediate',
    format: course.format || matchingSample?.format || 'Live Online',
    duration: course.duration || matchingSample?.duration || '40 Hours',
    summary: course.summary || matchingSample?.summary || '',
    overview: (course.overview && course.overview.length > 150)
      ? course.overview
      : (matchingSample?.overview || course.overview || course.summary),
    learningObjectives: (course.learningObjectives && course.learningObjectives.length > 0)
      ? course.learningObjectives
      : (matchingSample?.learningObjectives || course.curriculum || []),
    prerequisites: (course.prerequisites && course.prerequisites.length > 0)
      ? course.prerequisites
      : (matchingSample?.prerequisites || ['Basic computer literacy and foundational technical understanding.']),
    outline: (course.outline && course.outline.length > 0)
      ? course.outline
      : (matchingSample?.outline || []),
    curriculum: (course.curriculum && course.curriculum.length > 0)
      ? course.curriculum
      : (matchingSample?.curriculum || []),
  };
}

/**
 * Generates and triggers download of a high-quality, branded PDF syllabus for a course.
 */
export async function generateSyllabusPdf(courseInput: Course): Promise<void> {
  const course = resolveFullCourseData(courseInput);
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Load official Learnify Solutions logo
  const logoInfo = await getLogoBase64();

  // Helper to render authentic Learnify branded background watermark underneath all page content
  const drawPageBackgroundWatermark = () => {
    const hasGState = typeof (doc as any).setGState === 'function' && typeof (doc as any).GState === 'function';
    if (hasGState) {
      try {
        (doc as any).saveGraphicsState();
        // Subtle opacity (0.09) so watermark is clearly visible in theme colors without obstructing reading
        (doc as any).setGState(new (doc as any).GState({ opacity: 0.09 }));
      } catch {}
    }

    const pageH = doc.internal.pageSize.getHeight();
    const centerX = pageWidth / 2; // 105mm on A4
    const centerY = pageH / 2;     // 148.5mm on A4

    // Learnify Theme Colors: Deep Navy (#152e4d) and Brand Orange (#ea6d24)
    const navy = hasGState ? [21, 46, 77] : [220, 230, 240];
    const orange = hasGState ? [234, 109, 36] : [248, 222, 205];

    // --- 1. Center Primary Brand Seal (45 Degree Angle) ---
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(36);
    doc.text('LEARNIFY SOLUTIONS', centerX, centerY, { align: 'center', angle: 45 });

    doc.setTextColor(orange[0], orange[1], orange[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Pathway to Excellence  •  Official Curriculum', centerX, centerY + 8.5, { align: 'center', angle: 45 });

    // --- 2. Upper Parallel Diagonal Watermark ---
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('LEARNIFY SOLUTIONS', centerX - 42, centerY - 68, { align: 'center', angle: 45 });

    doc.setTextColor(orange[0], orange[1], orange[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('CONFIDENTIAL & PROPRIETARY', centerX - 42, centerY - 61, { align: 'center', angle: 45 });

    // --- 3. Lower Parallel Diagonal Watermark ---
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('LEARNIFY SOLUTIONS', centerX + 42, centerY + 68, { align: 'center', angle: 45 });

    doc.setTextColor(orange[0], orange[1], orange[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('WWW.LEARNIFY-SOLUTIONS.COM', centerX + 42, centerY + 75, { align: 'center', angle: 45 });

    // --- 4. Micro Left-Margin Security Strip ---
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text(
      'LEARNIFY SOLUTIONS • OFFICIAL TECHNICAL CURRICULUM • DO NOT REDISTRIBUTE',
      6,
      centerY,
      { angle: 90, align: 'center' }
    );

    if (hasGState) {
      try {
        (doc as any).restoreGraphicsState();
      } catch {}
    }
  };

  // Helper to add a new page with background watermark immediately stamped
  const addBrandedPage = (): number => {
    doc.addPage();
    drawPageBackgroundWatermark();
    return 20; // reset y coordinate for new page
  };

  // Draw background watermark on Page 1 first
  drawPageBackgroundWatermark();

  // 1. Header Banner / Brand (Dark Slate Blue #152e4d)
  const headerHeight = 36;
  doc.setFillColor(21, 46, 77); // #152e4d Dark Slate Blue
  doc.rect(0, 0, pageWidth, headerHeight, 'F');

  // Accent Orange Line
  doc.setFillColor(234, 109, 36); // #ea6d24 Brand Orange
  doc.rect(0, headerHeight, pageWidth, 2.5, 'F');

  // Left: Official Logo Card with refined dimensions and margins
  if (logoInfo) {
    const logoCardWidth = 52;
    const logoCardHeight = 20;
    const cardX = margin;
    const cardY = 5.5;
    
    // Crisp white rounded container for the logo
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(cardX, cardY, logoCardWidth, logoCardHeight, 2, 2, 'F');

    // Add Logo inside card preserving aspect ratio with padding
    const imgRatio = logoInfo.width / logoInfo.height;
    let targetW = 46;
    let targetH = targetW / imgRatio;
    if (targetH > 16) {
      targetH = 16;
      targetW = targetH * imgRatio;
    }
    const posX = cardX + (logoCardWidth - targetW) / 2;
    const posY = cardY + (logoCardHeight - targetH) / 2;

    doc.addImage(logoInfo.data, logoInfo.format, posX, posY, targetW, targetH, undefined, 'FAST');

    // Subtitle / Curriculum header on left cleanly below logo card
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(203, 213, 225); // slate-300
    doc.text('Official Enterprise Technical Curriculum & Syllabus', margin, 31.5);
  } else {
    // Fallback crisp typographic logo
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text('LEARNIFY SOLUTIONS', margin, 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(234, 109, 36);
    doc.text('Pathway to Excellence', margin, 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(203, 213, 225);
    doc.text('Official Enterprise Technical Curriculum & Syllabus', margin, 28);
  }

  // Right Header: Balanced, vertically aligned contact & portal metadata
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(226, 232, 240); // slate-200
  doc.text('www.learnify-solutions.com  |  info@learnify-solutions.com', pageWidth - margin, 12, { align: 'right' });

  // Direct Phone with Chat Only
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('+91 881 025 5422 (Chat Only)', pageWidth - margin, 19.5, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  doc.text('Direct Enterprise Advisor & Learning Support', pageWidth - margin, 26, { align: 'right' });

  let y = 46;

  // 2. Course Title & Badges
  const vendor = cleanPdfText(course.certificationVendor || course.domain || 'Technology');
  const level = cleanPdfText(course.skillLevel || course.level || 'Intermediate');
  const format = cleanPdfText(course.format || 'Live Online');
  const duration = cleanPdfText(course.duration || '40 Hours');

  // Vendor Tag Box
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, 32, 6.5, 1, 1, 'FD');
  doc.setTextColor(21, 46, 77);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(vendor.toUpperCase(), margin + 16, y + 4.5, { align: 'center' });

  // Level Tag Box
  doc.setFillColor(254, 242, 237);
  doc.setDrawColor(253, 186, 116);
  doc.roundedRect(margin + 35, y, 32, 6.5, 1, 1, 'FD');
  doc.setTextColor(234, 109, 36);
  doc.setFont('helvetica', 'bold');
  doc.text(level.toUpperCase(), margin + 51, y + 4.5, { align: 'center' });

  // Format & Duration info on right
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(`Format: ${format}   |   Duration: ${duration}`, pageWidth - margin, y + 4.8, { align: 'right' });

  y += 14;

  // Main Course Title
  doc.setTextColor(21, 46, 77);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  const cleanTitle = cleanPdfText(course.title);
  const titleLines = doc.splitTextToSize(cleanTitle, contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 6.8 + 2;

  // Summary / Subtitle
  const cleanSummary = cleanPdfText(course.summary);
  if (cleanSummary) {
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const summaryLines = doc.splitTextToSize(cleanSummary, contentWidth);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 4.8 + 5;
  }

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6.5;

  // 3. Course Overview
  const overviewText = course.overview || course.summary;
  doc.setTextColor(234, 109, 36);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.text('1. Course Overview & Executive Summary', margin, y);
  y += 5.5;

  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  
  // Split paragraphs to maintain clean reading flow without text overlap
  const paragraphs = overviewText.split(/\n\s*\n/);
  paragraphs.forEach((para, idx) => {
    const cleanPara = cleanPdfText(para);
    if (!cleanPara) return;
    const paraLines = doc.splitTextToSize(cleanPara, contentWidth);
    for (let i = 0; i < paraLines.length; i++) {
      if (y > 270) {
        y = addBrandedPage();
      }
      doc.text(paraLines[i], margin, y);
      y += 4.6;
    }
    if (idx < paragraphs.length - 1) {
      y += 2.5;
    }
  });
  y += 4;

  // 4. Learning Objectives
  const objectives = (course.learningObjectives && course.learningObjectives.length > 0)
    ? course.learningObjectives
    : (course.curriculum || []);

  if (objectives.length > 0) {
    if (y > 245) {
      y = addBrandedPage();
    }

    doc.setTextColor(234, 109, 36);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.text('2. Key Learning Objectives & Competencies', margin, y);
    y += 5.5;

    objectives.forEach((obj) => {
      const cleanObj = cleanPdfText(obj);
      if (!cleanObj) return;

      if (y > 270) {
        y = addBrandedPage();
      }

      const bulletIndent = 6;
      const textWidth = contentWidth - bulletIndent;
      const lines = doc.splitTextToSize(cleanObj, textWidth);

      // Draw vector bullet circle
      doc.setFillColor(234, 109, 36); // brand orange
      doc.circle(margin + 2, y - 1.2, 0.85, 'F');

      doc.setTextColor(51, 65, 85);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.8);
      doc.text(lines, margin + bulletIndent, y);
      y += lines.length * 4.4 + 1.6;
    });
    y += 4;
  }

  // 5. Prerequisites
  const prerequisites = (course.prerequisites && course.prerequisites.length > 0)
    ? course.prerequisites
    : [
        'Basic computer literacy and foundational technical understanding.',
        'No prior formal certification required unless explicitly mandated by vendor.',
      ];

  if (prerequisites.length > 0) {
    if (y > 245) {
      y = addBrandedPage();
    }

    doc.setTextColor(234, 109, 36);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.text('3. Target Audience & Prerequisites', margin, y);
    y += 5.5;

    prerequisites.forEach((req) => {
      const cleanReq = cleanPdfText(req);
      if (!cleanReq) return;

      if (y > 270) {
        y = addBrandedPage();
      }

      const bulletIndent = 7;
      const textWidth = contentWidth - bulletIndent;
      const lines = doc.splitTextToSize(cleanReq, textWidth);

      // Draw clean vector checkmark box (no font glyph dependency!)
      const bx = margin + 1;
      const by = y - 3.2;
      doc.setFillColor(241, 245, 249); // slate-100
      doc.setDrawColor(203, 213, 225); // slate-300
      doc.roundedRect(bx, by, 3.8, 3.8, 0.6, 0.6, 'FD');

      // Checkmark stroke
      doc.setDrawColor(234, 109, 36); // #ea6d24
      doc.setLineWidth(0.45);
      doc.line(bx + 0.9, by + 1.9, bx + 1.6, by + 2.7);
      doc.line(bx + 1.6, by + 2.7, bx + 2.9, by + 1.0);

      doc.setTextColor(51, 65, 85);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.8);
      doc.text(lines, margin + bulletIndent, y);
      y += lines.length * 4.4 + 1.6;
    });
    y += 5;
  }

  // 6. Comprehensive Module Outline
  const outline = course.outline && course.outline.length > 0 
    ? course.outline 
    : (course.curriculum || []).map((item, idx) => {
        const cleanItem = item.replace(/^(Module|Domain)\s+\d+[\d\.]*:\s*/i, '');
        const parts = cleanItem.split(/[:–-]/);
        const title = parts[0] ? parts[0].trim() : `Module ${idx + 1} Deep Dive`;
        const description = parts.slice(1).join(' - ').trim() || `Comprehensive technical instruction, hands-on lab exercises, and practical implementation covering ${cleanItem}.`;
        return {
          title: `Module ${idx + 1}: ${title}`,
          description: description,
          items: []
        };
      });

  if (outline.length > 0) {
    if (y > 235) {
      y = addBrandedPage();
    }

    doc.setTextColor(234, 109, 36);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.text('4. Detailed Curriculum Modules & Lab Architecture', margin, y);
    y += 6.5;

    outline.forEach((mod) => {
      // Check if we need a new page for the domain header
      if (y > 245) {
        y = addBrandedPage();
      }

      // Domain / Module Title Banner
      const cleanModTitle = cleanPdfText(mod.title);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, y, contentWidth, 7.5, 1, 1, 'FD');
      
      doc.setFillColor(234, 109, 36);
      doc.rect(margin, y, 2.5, 7.5, 'F');

      doc.setTextColor(21, 46, 77);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.2);
      doc.text(cleanModTitle, margin + 5, y + 5.2);
      y += 10.5;

      if (mod.items && mod.items.length > 0) {
        mod.items.forEach((itemText) => {
          if (y > 275) {
            y = addBrandedPage();
          }
          const cleanItem = cleanPdfText(itemText);
          if (!cleanItem) return;

          const bulletIndent = 6;
          const textWidth = contentWidth - 8 - bulletIndent;
          const lines = doc.splitTextToSize(cleanItem, textWidth);

          // Neat vector bullet dot
          doc.setFillColor(148, 163, 184); // slate-400
          doc.circle(margin + 5, y - 0.9, 0.7, 'F');

          doc.setTextColor(51, 65, 85);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8.2);
          doc.text(lines, margin + 5 + bulletIndent, y);
          y += lines.length * 3.8 + 1.2;
        });
        y += 2.5;
      } else if (mod.description) {
        if (y > 275) {
          y = addBrandedPage();
        }
        const cleanDesc = cleanPdfText(mod.description);
        const descLines = doc.splitTextToSize(cleanDesc, contentWidth - 8);
        doc.setTextColor(71, 85, 105);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.2);
        doc.text(descLines, margin + 4, y);
        y += descLines.length * 3.8 + 3.0;
      }
    });
  }

  // Add Headers & Footers to all pages
  const pageCount = doc.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    // -------------------------------------------------------------
    // 1. Running Header (on Pages 2 and beyond)
    // -------------------------------------------------------------
    if (i > 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(0, 0, pageWidth, 12, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.4);
      doc.line(margin, 12, pageWidth - margin, 12);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(21, 46, 77); // #152e4d
      doc.text('LEARNIFY SOLUTIONS', margin, 8.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(` |  ${cleanTitle} - Official Syllabus`, margin + 32, 8.5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(234, 109, 36); // #ea6d24
      doc.text('CONFIDENTIAL & PROPRIETARY', pageWidth - margin, 8.5, { align: 'right' });
    }

    // -------------------------------------------------------------
    // 2. Security Bottom Footer (All Pages)
    // -------------------------------------------------------------
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(margin, 284, pageWidth - margin, 284);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(234, 109, 36);
    doc.text('LEARNIFY SOLUTIONS', margin, 289.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(' - Official Curriculum Syllabus', margin + 31, 289.5);

    doc.setFontSize(7);
    doc.setTextColor(160, 174, 192);
    doc.text('Protected by Learnify Solutions • www.learnify-solutions.com', pageWidth / 2, 289.5, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, 289.5, { align: 'right' });
  }

  // Generate clean filename
  const safeTitle = cleanTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${safeTitle}_Syllabus_Learnify.pdf`;

  // Trigger browser download
  doc.save(filename);
}

/**
 * Executes download for a course syllabus, prioritizing custom backend PDF if uploaded,
 * otherwise generating a dynamic branded PDF.
 */
export async function downloadCourseSyllabus(courseInput: Course): Promise<void> {
  const course = resolveFullCourseData(courseInput);

  if (course.syllabusUrl) {
    if (course.syllabusUrl.startsWith('data:') || course.syllabusUrl.startsWith('blob:')) {
      const link = document.createElement('a');
      link.href = course.syllabusUrl;
      link.download = course.syllabusFileName || `${course.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Syllabus.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    } else {
      // External link or server path
      const link = document.createElement('a');
      link.href = course.syllabusUrl;
      link.target = '_blank';
      link.download = course.syllabusFileName || `${course.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Syllabus.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
  }

  // If no custom file is uploaded yet, generate official PDF directly
  await generateSyllabusPdf(course);
}


