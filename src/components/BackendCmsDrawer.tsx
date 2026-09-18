import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Database,
  Code,
  Layers,
  Users,
  CheckCircle2,
  Copy,
  ExternalLink,
  RefreshCw,
  BookOpen,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Check,
  FileText,
  Upload,
  Download,
  FileCheck,
  LogOut,
  Mail,
  Send,
  AlertTriangle,
  Server,
  ShieldCheck,
} from 'lucide-react';
import { CmsData, LeadSubmission, Course } from '../types';
import {
  updateCmsData,
  resetCmsData,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadSyllabusPdf,
} from '../services/cmsService';
import { downloadCourseSyllabus } from '../utils/syllabusPdf';

interface BackendCmsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cmsData: CmsData;
  onCmsUpdated: (newData: CmsData) => void;
  courses: Course[];
  onCoursesUpdated: (newCourses: Course[]) => void;
  leads: LeadSubmission[];
  supabaseStatus: {
    configured: boolean;
    supabaseUrl: string | null;
    sqlSchema: string;
  };
  onRefreshLeads: () => void;
}

export const BackendCmsDrawer: React.FC<BackendCmsDrawerProps> = ({
  isOpen,
  onClose,
  cmsData,
  onCmsUpdated,
  courses,
  onCoursesUpdated,
  leads,
  supabaseStatus,
  onRefreshLeads,
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'courses' | 'json' | 'supabase' | 'leads' | 'email'>('visual');
  const [formData, setFormData] = useState<CmsData>(JSON.parse(JSON.stringify(cmsData)));
  const [jsonText, setJsonText] = useState(JSON.stringify(cmsData, null, 2));
  const [jsonError, setJsonError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveNotification, setSaveNotification] = useState('');
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Email diagnostics & test state
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<{ success: boolean; message: string; messageId?: string; portUsed?: number } | null>(null);
  const [emailDiagnostics, setEmailDiagnostics] = useState<any>(null);
  const [isLoadingDiagnostics, setIsLoadingDiagnostics] = useState(false);

  const fetchEmailDiagnostics = async () => {
    setIsLoadingDiagnostics(true);
    try {
      const res = await fetch('/api/email/diagnostics');
      const data = await res.json();
      setEmailDiagnostics(data);
    } catch (err: any) {
      setEmailDiagnostics({ success: false, error: err.message });
    } finally {
      setIsLoadingDiagnostics(false);
    }
  };

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmailAddress) return;
    setIsSendingTestEmail(true);
    setTestEmailResult(null);
    try {
      const res = await fetch('/api/email/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetEmail: testEmailAddress }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestEmailResult({
          success: true,
          message: data.message,
          messageId: data.messageId,
          portUsed: data.portUsed,
        });
      } else {
        setTestEmailResult({
          success: false,
          message: data.error || 'Failed to send test email.',
        });
      }
    } catch (err: any) {
      setTestEmailResult({
        success: false,
        message: err.message || 'Network exception while contacting SMTP server.',
      });
    } finally {
      setIsSendingTestEmail(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'email') {
      fetchEmailDiagnostics();
    }
  }, [activeTab]);

  // Courses form state
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState<{
    title: string;
    domain: string;
    certificationVendor: string;
    skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    format: 'Live Online' | 'Classroom' | 'Self-Paced';
    fastTrack: boolean;
    imageUrl: string;
    duration: string;
    summary: string;
    overview: string;
    learningObjectives: string;
    prerequisites: string;
    outline: string;
    syllabusUrl: string;
    syllabusFileName: string;
    syllabusFileSize: string;
  }>({
    title: '',
    domain: 'Cloud Computing',
    certificationVendor: 'Microsoft',
    skillLevel: 'Intermediate',
    format: 'Live Online',
    fastTrack: false,
    imageUrl: '/src/assets/images/azure_cloud_infra_1787771504293.webp',
    duration: '40 Hours',
    summary: '',
    overview: '',
    learningObjectives: '',
    prerequisites: '',
    outline: '',
    syllabusUrl: '',
    syllabusFileName: '',
    syllabusFileSize: '',
  });

  const [isUploadingSyllabus, setIsUploadingSyllabus] = useState(false);

  const handleSyllabusFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a valid PDF file (.pdf)');
      return;
    }

    // Check size limit (e.g. 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit. Please upload a smaller PDF.');
      return;
    }

    setIsUploadingSyllabus(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const formattedSize = file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;

        const uploaded = await uploadSyllabusPdf({
          base64Data,
          fileName: file.name,
          fileSize: formattedSize,
        });

        setCourseForm((prev) => ({
          ...prev,
          syllabusUrl: uploaded.url,
          syllabusFileName: uploaded.fileName,
          syllabusFileSize: uploaded.fileSize,
        }));

        setSaveNotification(`Syllabus PDF "${file.name}" attached successfully!`);
        setTimeout(() => setSaveNotification(''), 4000);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      alert('Failed to upload PDF: ' + err.message);
    } finally {
      setIsUploadingSyllabus(false);
    }
  };

  const presetImages = [
    { label: 'Cloud+ Multi-Cloud', url: '/src/assets/images/comptia_cloud_multicloud_1788294616227.jpg' },
    { label: 'Cloud Essentials & ROI', url: '/src/assets/images/cloud_essentials_business_1788294640468.jpg' },
    { label: 'Azure Cloud', url: '/src/assets/images/azure_cloud_infra_1787771504293.webp' },
    { label: 'AWS Architecture', url: '/src/assets/images/aws_architecture_diagram_1787771528914.webp' },
    { label: 'Power BI & Data', url: '/src/assets/images/powerbi_data_analytics_1788294280157.jpg' },
    { label: 'Copilot & GenAI', url: '/src/assets/images/copilot_genai_workspace_1788294313357.jpg' },
    { label: 'Kubernetes & DevOps', url: '/src/assets/images/kubernetes_devops_cluster_1788294296039.jpg' },
    { label: 'Cisco Routing', url: '/src/assets/images/cisco_network_map_1787771488810.webp' },
    { label: 'CompTIA Security SOC', url: '/src/assets/images/comptia_security_soc_1787771516564.webp' },
    { label: 'PenTest & Ethical Hack', url: '/src/assets/images/ethical_hacking_pentest_1788294329039.jpg' },
    { label: 'Linux & Datacenter', url: '/src/assets/images/linux_datacenter_admin_1788294344630.jpg' },
    { label: 'PC Hardware & A+', url: '/src/assets/images/pc_hardware_workbench_1788294359055.jpg' },
  ];

  if (!isOpen) return null;

  const handleVisualFieldChange = (section: keyof CmsData, key: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev };
      (updated[section] as any)[key] = value;
      return updated;
    });
  };

  const handleSaveVisual = async () => {
    setIsSaving(true);
    setSaveNotification('');
    try {
      const result = await updateCmsData(formData);
      onCmsUpdated(result);
      setJsonText(JSON.stringify(result, null, 2));
      setSaveNotification('CMS configuration successfully updated in backend!');
      setTimeout(() => setSaveNotification(''), 4000);
    } catch (err: any) {
      alert('Error updating CMS: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.summary) {
      alert('Please provide course title and summary.');
      return;
    }
    setIsSaving(true);
    try {
      // Parse multi-line fields into arrays
      const payload = {
        ...courseForm,
        learningObjectives: courseForm.learningObjectives.split('\n').map(s => s.trim()).filter(Boolean),
        prerequisites: courseForm.prerequisites.split('\n').map(s => s.trim()).filter(Boolean),
        outline: courseForm.outline.split('\n').map(s => {
          const parts = s.split('|').map(p => p.trim());
          return { title: parts[0] || 'Module', description: parts[1] || '' };
        }).filter(o => o.title),
        curriculum: courseForm.outline.split('\n').map(s => s.split('|')[0]?.trim()).filter(Boolean)
      };

      if (editingCourseId) {
        const res = await updateCourse(editingCourseId, payload);
        onCoursesUpdated(res.courses);
        setSaveNotification(`Course "${courseForm.title}" updated successfully!`);
      } else {
        const res = await createCourse(payload);
        onCoursesUpdated(res.courses);
        setSaveNotification(`Course "${courseForm.title}" created & added to catalog!`);
      }
      // Reset form
      setEditingCourseId(null);
      setCourseForm({
        title: '',
        domain: 'Cloud Computing',
        certificationVendor: 'Microsoft',
        skillLevel: 'Intermediate',
        format: 'Live Online',
        fastTrack: false,
        imageUrl: '/src/assets/images/azure_cloud_infra_1787771504293.webp',
        duration: '40 Hours',
        summary: '',
        overview: '',
        learningObjectives: '',
        prerequisites: '',
        outline: '',
        syllabusUrl: '',
        syllabusFileName: '',
        syllabusFileSize: '',
      });
      setTimeout(() => setSaveNotification(''), 4000);
    } catch (err: any) {
      alert('Failed to save course: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseForm({
      title: course.title,
      domain: course.domain || 'Cloud Computing',
      certificationVendor: course.certificationVendor || 'Tech',
      skillLevel: (course.skillLevel || course.level || 'Intermediate') as any,
      format: (course.format || 'Live Online') as any,
      fastTrack: Boolean(course.fastTrack),
      imageUrl: course.imageUrl || '/src/assets/images/azure_cloud_infra_1787771504293.webp',
      duration: course.duration || '40 Hours',
      summary: course.summary || '',
      overview: course.overview || course.summary || '',
      learningObjectives: (course.learningObjectives || course.curriculum || []).join('\n'),
      prerequisites: (course.prerequisites || []).join('\n'),
      outline: (course.outline || []).map(o => `${o.title} | ${o.description}`).join('\n') || (course.curriculum || []).join('\n'),
      syllabusUrl: course.syllabusUrl || '',
      syllabusFileName: course.syllabusFileName || '',
      syllabusFileSize: course.syllabusFileSize || '',
    });
  };

  const handleDeleteCourse = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    setIsSaving(true);
    try {
      const res = await deleteCourse(id);
      onCoursesUpdated(res.courses);
      if (editingCourseId === id) {
        setEditingCourseId(null);
      }
      setSaveNotification(`Course "${title}" removed from catalog.`);
      setTimeout(() => setSaveNotification(''), 4000);
    } catch (err: any) {
      alert('Failed to delete course: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveJson = async () => {
    setJsonError('');
    setIsSaving(true);
    setSaveNotification('');
    try {
      const parsed = JSON.parse(jsonText);
      const result = await updateCmsData(parsed);
      onCmsUpdated(result);
      setFormData(result);
      setSaveNotification('Backend CMS successfully updated via JSON schema!');
      setTimeout(() => setSaveNotification(''), 4000);
    } catch (err: any) {
      setJsonError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset all CMS content to original defaults?')) {
      setIsSaving(true);
      try {
        const result = await resetCmsData();
        onCmsUpdated(result);
        setFormData(result);
        setJsonText(JSON.stringify(result, null, 2));
        setSaveNotification('Reset to defaults complete!');
        setTimeout(() => setSaveNotification(''), 4000);
      } catch (err: any) {
        alert('Reset failed: ' + err.message);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const copySqlSchema = () => {
    navigator.clipboard.writeText(supabaseStatus.sqlSchema);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div
        id="backend-cms-drawer"
        className="w-full max-w-3xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ea6d24] text-white flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#152e4d]">
                Backend-Driven CMS & Database Engine
              </h2>
              <p className="text-xs text-slate-500">
                Manage live courses catalog, UI content, database entities & API schemas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('Do you want to log out from the Admin Portal?')) {
                  localStorage.removeItem('learnify_admin_authenticated');
                  localStorage.removeItem('learnify_admin_token');
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer"
              title="Lock Admin Session & Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock / Sign Out</span>
            </button>
            <button
              onClick={handleReset}
              className="p-2 text-slate-500 hover:text-red-600 rounded-md hover:bg-slate-200 transition-colors"
              title="Reset CMS to original defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-md hover:bg-slate-200 transition-colors"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-5 bg-white text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('visual')}
            className={`py-3 px-4 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors shrink-0 ${
              activeTab === 'visual'
                ? 'border-[#ea6d24] text-[#ea6d24]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Visual Section Fields</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`py-3 px-4 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors shrink-0 ${
              activeTab === 'courses'
                ? 'border-[#ea6d24] text-[#ea6d24]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Courses Catalog DB ({courses.length})</span>
          </button>

          <button
            onClick={() => {
              setJsonText(JSON.stringify(formData, null, 2));
              setActiveTab('json');
            }}
            className={`py-3 px-4 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors shrink-0 ${
              activeTab === 'json'
                ? 'border-[#ea6d24] text-[#ea6d24]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Raw JSON Schema</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`py-3 px-4 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors shrink-0 ${
              activeTab === 'supabase'
                ? 'border-[#ea6d24] text-[#ea6d24]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase / SQL Setup</span>
          </button>

          <button
            onClick={() => {
              onRefreshLeads();
              setActiveTab('leads');
            }}
            className={`py-3 px-4 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors shrink-0 ${
              activeTab === 'leads'
                ? 'border-[#ea6d24] text-[#ea6d24]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Inquiries ({leads.length})</span>
          </button>

          <button
            onClick={() => {
              fetchEmailDiagnostics();
              setActiveTab('email');
            }}
            className={`py-3 px-4 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors shrink-0 ${
              activeTab === 'email'
                ? 'border-[#ea6d24] text-[#ea6d24]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email & SMTP</span>
          </button>
        </div>

        {/* Save notification */}
        {saveNotification && (
          <div className="mx-5 mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{saveNotification}</span>
          </div>
        )}

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === 'visual' && (
            <div className="space-y-6">
              {/* Top Banner section */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Top Announcement & Contact Header Bar
                  </h4>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.topBanner.enabled}
                      onChange={(e) =>
                        handleVisualFieldChange('topBanner', 'enabled', e.target.checked)
                      }
                      className="rounded border-slate-300 text-[#ea6d24] focus:ring-[#ea6d24]"
                    />
                    <span className="text-xs font-medium text-slate-600">Enabled</span>
                  </label>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Announcement / Summit Text
                    </label>
                    <input
                      type="text"
                      value={formData.topBanner.text || ''}
                      onChange={(e) =>
                        handleVisualFieldChange('topBanner', 'text', e.target.value)
                      }
                      placeholder="e.g. GLOBAL ENTERPRISE LEARNING SUMMIT 2024 - REGISTER NOW"
                      className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white focus:ring-2 focus:ring-[#ea6d24]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Action Link Label
                    </label>
                    <input
                      type="text"
                      value={formData.topBanner.linkText || ''}
                      onChange={(e) =>
                        handleVisualFieldChange('topBanner', 'linkText', e.target.value)
                      }
                      placeholder="e.g. REGISTER NOW"
                      className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white focus:ring-2 focus:ring-[#ea6d24]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Direct WhatsApp / Phone Number
                      </label>
                      <input
                        type="text"
                        value={formData.topBanner.phoneNumber || '+91 881 025 5422 (Chat Only)'}
                        onChange={(e) =>
                          handleVisualFieldChange('topBanner', 'phoneNumber', e.target.value)
                        }
                        className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white focus:ring-2 focus:ring-[#ea6d24]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Support / Inquiry Email
                      </label>
                      <input
                        type="email"
                        value={formData.topBanner.email || 'info@learnify-solutions.com'}
                        onChange={(e) =>
                          handleVisualFieldChange('topBanner', 'email', e.target.value)
                        }
                        className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white focus:ring-2 focus:ring-[#ea6d24]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Section */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Hero Section
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Headline
                    </label>
                    <input
                      type="text"
                      value={formData.hero.headline}
                      onChange={(e) =>
                        handleVisualFieldChange('hero', 'headline', e.target.value)
                      }
                      className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Description Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={formData.hero.description}
                      onChange={(e) =>
                        handleVisualFieldChange('hero', 'description', e.target.value)
                      }
                      className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Primary CTA Button
                      </label>
                      <input
                        type="text"
                        value={formData.hero.primaryCta.label}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              primaryCta: { ...prev.hero.primaryCta, label: e.target.value },
                            },
                          }))
                        }
                        className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Secondary CTA Button
                      </label>
                      <input
                        type="text"
                        value={formData.hero.secondaryCta.label}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              secondaryCta: { ...prev.hero.secondaryCta, label: e.target.value },
                            },
                          }))
                        }
                        className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Stats Bar Values
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {formData.stats.map((s, idx) => (
                    <div key={s.id || idx} className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-600 truncate">
                        {s.label}
                      </label>
                      <input
                        type="text"
                        value={s.value}
                        onChange={(e) => {
                          const newStats = [...formData.stats];
                          newStats[idx].value = e.target.value;
                          setFormData((prev) => ({ ...prev, stats: newStats }));
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-md border border-slate-300 bg-white font-bold"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Section */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Performance Elevation Section
                </h4>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-600">Title</label>
                  <input
                    type="text"
                    value={formData.performanceSection.title}
                    onChange={(e) =>
                      handleVisualFieldChange('performanceSection', 'title', e.target.value)
                    }
                    className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white font-bold"
                  />
                  <label className="block text-xs font-medium text-slate-600 pt-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.performanceSection.description}
                    onChange={(e) =>
                      handleVisualFieldChange('performanceSection', 'description', e.target.value)
                    }
                    className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white"
                  />
                  <label className="block text-xs font-medium text-slate-600 pt-1">Button Text</label>
                  <input
                    type="text"
                    value={formData.performanceSection.ctaButton.label}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        performanceSection: {
                          ...prev.performanceSection,
                          ctaButton: { ...prev.performanceSection.ctaButton, label: e.target.value },
                        },
                      }))
                    }
                    className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white"
                  />
                </div>
              </div>

              {/* Why Choose Learnify Section */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Why Choose Learnify Subtitle
                </h4>
                <input
                  type="text"
                  value={formData.whyChooseSection.subtitle}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      whyChooseSection: { ...prev.whyChooseSection, subtitle: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white"
                />
              </div>

              {/* About Us Page Content Editor */}
              {formData.aboutPage && (
                <div className="p-4 rounded-xl border border-orange-200 bg-orange-50/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#ea6d24]">
                      About Us Page Settings
                    </h4>
                    <span className="text-[10px] font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                      Live Screen
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-700">
                      About Hero Title Suffix
                    </label>
                    <input
                      type="text"
                      value={formData.aboutPage.hero.titleSuffix}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          aboutPage: {
                            ...prev.aboutPage,
                            hero: { ...prev.aboutPage.hero, titleSuffix: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-700">
                      About Hero Quote
                    </label>
                    <input
                      type="text"
                      value={formData.aboutPage.hero.quote}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          aboutPage: {
                            ...prev.aboutPage,
                            hero: { ...prev.aboutPage.hero, quote: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-700">
                      Vision Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.aboutPage.visionMission.vision.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          aboutPage: {
                            ...prev.aboutPage,
                            visionMission: {
                              ...prev.aboutPage.visionMission,
                              vision: {
                                ...prev.aboutPage.visionMission.vision,
                                description: e.target.value,
                              },
                            },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-700">
                      Mission Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.aboutPage.visionMission.mission.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          aboutPage: {
                            ...prev.aboutPage,
                            visionMission: {
                              ...prev.aboutPage.visionMission,
                              mission: {
                                ...prev.aboutPage.visionMission.mission,
                                description: e.target.value,
                              },
                            },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Corporate Training Sections Content Editor (Real-World Delivery & What Teams Say) */}
              {formData.corporateTrainingSection && (
                <div className="p-4 rounded-xl border border-orange-200 bg-orange-50/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#ea6d24]">
                      Corporate Training Dynamic Sections
                    </h4>
                    <span className="text-[10px] font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                      CMS Managed
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-700">
                      Real-World Delivery Section Title
                    </label>
                    <input
                      type="text"
                      value={formData.corporateTrainingSection.deliveryTitle}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          corporateTrainingSection: {
                            ...prev.corporateTrainingSection,
                            deliveryTitle: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-700">
                      Real-World Delivery Description
                    </label>
                    <textarea
                      rows={2}
                      value={formData.corporateTrainingSection.deliveryDescription}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          corporateTrainingSection: {
                            ...prev.corporateTrainingSection,
                            deliveryDescription: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-700">
                      What Corporate Teams Say Section Title
                    </label>
                    <input
                      type="text"
                      value={formData.corporateTrainingSection.testimonialsTitle}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          corporateTrainingSection: {
                            ...prev.corporateTrainingSection,
                            testimonialsTitle: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-700">
                      Testimonials Subtitle / Banner Text
                    </label>
                    <input
                      type="text"
                      value={formData.corporateTrainingSection.testimonialsSubtitle}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          corporateTrainingSection: {
                            ...prev.corporateTrainingSection,
                            testimonialsSubtitle: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white"
                    />
                  </div>

                  {/* Testimonial Items Editor */}
                  <div className="space-y-3 pt-2 border-t border-orange-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Manage Testimonial Feedback Cards</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newItem = {
                            id: 'test-' + Date.now(),
                            quote: "Exceptional training quality and depth.",
                            authorName: "New Executive",
                            authorTitle: "Tech Director",
                            authorLocation: "Global",
                            rating: 5,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            corporateTrainingSection: {
                              ...prev.corporateTrainingSection,
                              testimonials: [...prev.corporateTrainingSection.testimonials, newItem],
                            },
                          }));
                        }}
                        className="text-[11px] text-[#ea6d24] font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Testimonial
                      </button>
                    </div>

                    {formData.corporateTrainingSection.testimonials.map((t, index) => (
                      <div key={t.id} className="p-3 bg-white rounded-lg border border-orange-200 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-800">#{index + 1} - {t.authorName} ({t.authorTitle})</span>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                corporateTrainingSection: {
                                  ...prev.corporateTrainingSection,
                                  testimonials: prev.corporateTrainingSection.testimonials.filter(item => item.id !== t.id),
                                },
                              }));
                            }}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={t.authorName}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              corporateTrainingSection: {
                                ...prev.corporateTrainingSection,
                                testimonials: prev.corporateTrainingSection.testimonials.map(item => item.id === t.id ? { ...item, authorName: val } : item),
                              },
                            }));
                          }}
                          placeholder="Author Name"
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={t.authorTitle}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                corporateTrainingSection: {
                                  ...prev.corporateTrainingSection,
                                  testimonials: prev.corporateTrainingSection.testimonials.map(item => item.id === t.id ? { ...item, authorTitle: val } : item),
                                },
                              }));
                            }}
                            placeholder="Author Title"
                            className="px-2.5 py-1.5 text-xs rounded border border-slate-300"
                          />
                          <input
                            type="text"
                            value={t.authorLocation}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                corporateTrainingSection: {
                                  ...prev.corporateTrainingSection,
                                  testimonials: prev.corporateTrainingSection.testimonials.map(item => item.id === t.id ? { ...item, authorLocation: val } : item),
                                },
                              }));
                            }}
                            placeholder="Location (e.g. UAE)"
                            className="px-2.5 py-1.5 text-xs rounded border border-slate-300"
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={t.quote}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              corporateTrainingSection: {
                                ...prev.corporateTrainingSection,
                                testimonials: prev.corporateTrainingSection.testimonials.map(item => item.id === t.id ? { ...item, quote: val } : item),
                              },
                            }));
                          }}
                          placeholder="Feedback Quote"
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Delivery Cards Editor */}
                  <div className="space-y-3 pt-2 border-t border-orange-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Manage Delivery Cards (Images & Tags)</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newDelivery = {
                            id: 'del-' + Date.now(),
                            locationTag: 'New City, Region',
                            badgeText: 'Onsite',
                            title: 'Enterprise Delegation',
                            description: 'Custom training delivery.',
                            imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
                          };
                          setFormData((prev) => ({
                            ...prev,
                            corporateTrainingSection: {
                              ...prev.corporateTrainingSection,
                              deliveryCards: [...prev.corporateTrainingSection.deliveryCards, newDelivery],
                            },
                          }));
                        }}
                        className="text-[11px] text-[#ea6d24] font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Delivery Card
                      </button>
                    </div>

                    {formData.corporateTrainingSection.deliveryCards.map((dCard, idx) => (
                      <div key={dCard.id} className="p-3 bg-white rounded-lg border border-orange-200 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-800">Card #{idx + 1} - {dCard.locationTag}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                corporateTrainingSection: {
                                  ...prev.corporateTrainingSection,
                                  deliveryCards: prev.corporateTrainingSection.deliveryCards.filter(item => item.id !== dCard.id),
                                },
                              }));
                            }}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={dCard.locationTag}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                corporateTrainingSection: {
                                  ...prev.corporateTrainingSection,
                                  deliveryCards: prev.corporateTrainingSection.deliveryCards.map(item => item.id === dCard.id ? { ...item, locationTag: val } : item),
                                },
                              }));
                            }}
                            placeholder="Location Tag"
                            className="px-2.5 py-1.5 text-xs rounded border border-slate-300"
                          />
                          <input
                            type="text"
                            value={dCard.badgeText}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                corporateTrainingSection: {
                                  ...prev.corporateTrainingSection,
                                  deliveryCards: prev.corporateTrainingSection.deliveryCards.map(item => item.id === dCard.id ? { ...item, badgeText: val } : item),
                                },
                              }));
                            }}
                            placeholder="Badge Text"
                            className="px-2.5 py-1.5 text-xs rounded border border-slate-300"
                          />
                        </div>
                        <input
                          type="text"
                          value={dCard.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              corporateTrainingSection: {
                                ...prev.corporateTrainingSection,
                                deliveryCards: prev.corporateTrainingSection.deliveryCards.map(item => item.id === dCard.id ? { ...item, title: val } : item),
                              },
                            }));
                          }}
                          placeholder="Card Title"
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300"
                        />
                        <input
                          type="text"
                          value={dCard.imageUrl}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              corporateTrainingSection: {
                                ...prev.corporateTrainingSection,
                                deliveryCards: prev.corporateTrainingSection.deliveryCards.map(item => item.id === dCard.id ? { ...item, imageUrl: val } : item),
                              },
                            }));
                          }}
                          placeholder="Image URL (Unsplash or uploaded)"
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Save Button for Visual Tab */}
              <button
                onClick={handleSaveVisual}
                disabled={isSaving}
                className="w-full bg-[#ea6d24] hover:bg-[#d85e19] text-white text-sm font-bold py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Updating Backend API...' : 'Save & Update UI Live'}</span>
              </button>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6">
              {/* Add / Edit Course Form */}
              <form
                onSubmit={handleSaveCourse}
                className="p-4 rounded-xl border border-orange-200 bg-orange-50/50 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-orange-200/80 pb-2">
                  <span className="font-bold text-sm text-[#152e4d] flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#ea6d24]" />
                    <span>{editingCourseId ? 'Edit Course Entity' : 'Add New Course to Catalog'}</span>
                  </span>
                  {editingCourseId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCourseId(null);
                        setCourseForm({
                          title: '',
                          domain: 'Cloud Computing',
                          certificationVendor: 'Microsoft',
                          skillLevel: 'Intermediate',
                          format: 'Live Online',
                          fastTrack: false,
                          imageUrl: '/src/assets/images/azure_cloud_infra_1787771504293.webp',
                          duration: '40 Hours',
                          summary: '',
                        });
                      }}
                      className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cisco CCNA: Enterprise Networking"
                      value={courseForm.title}
                      onChange={(e) => setCourseForm((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Certification Vendor / Category *
                    </label>
                    <select
                      value={courseForm.certificationVendor}
                      onChange={(e) =>
                        setCourseForm((prev) => ({ ...prev, certificationVendor: e.target.value }))
                      }
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="Cisco">Cisco (CCNA/CCNP)</option>
                      <option value="Microsoft">Microsoft</option>
                      <option value="CompTIA">CompTIA (Security+/Network+)</option>
                      <option value="AWS">AWS (Amazon Web Services)</option>
                      <option value="Google Cloud">Google Cloud (GCP)</option>
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                      <option value="Cybersecurity">Cybersecurity & SOC</option>
                      <option value="DevOps">DevOps & Kubernetes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Skill Level
                    </label>
                    <select
                      value={courseForm.skillLevel}
                      onChange={(e: any) =>
                        setCourseForm((prev) => ({ ...prev, skillLevel: e.target.value }))
                      }
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Delivery Format
                    </label>
                    <select
                      value={courseForm.format}
                      onChange={(e: any) =>
                        setCourseForm((prev) => ({ ...prev, format: e.target.value }))
                      }
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="Live Online">Live Online</option>
                      <option value="Classroom">Classroom</option>
                      <option value="Self-Paced">Self-Paced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 40 Hours or 5 Days"
                      value={courseForm.duration}
                      onChange={(e) =>
                        setCourseForm((prev) => ({ ...prev, duration: e.target.value }))
                      }
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="course-fast-track"
                      checked={courseForm.fastTrack}
                      onChange={(e) =>
                        setCourseForm((prev) => ({ ...prev, fastTrack: e.target.checked }))
                      }
                      className="rounded text-[#ea6d24] focus:ring-[#ea6d24] w-4 h-4"
                    />
                    <label
                      htmlFor="course-fast-track"
                      className="text-xs font-semibold text-slate-700 cursor-pointer"
                    >
                      Fast-Track Certification Course
                    </label>
                  </div>
                </div>

                {/* Course Image Selection */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Course Thumbnail Image
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {presetImages.map((img) => {
                      const isSelected = courseForm.imageUrl === img.url;
                      return (
                        <button
                          key={img.url}
                          type="button"
                          onClick={() => setCourseForm((prev) => ({ ...prev, imageUrl: img.url }))}
                          className={`relative rounded-lg overflow-hidden border-2 text-left transition-all ${
                            isSelected
                              ? 'border-[#ea6d24] ring-2 ring-orange-200'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <img
                            src={img.url}
                            alt={img.label}
                            className="w-full h-14 object-cover"
                          />
                          <div className="p-1 text-[10px] font-bold text-slate-700 truncate bg-white">
                            {img.label}
                          </div>
                          {isSelected && (
                            <div className="absolute top-1 right-1 bg-[#ea6d24] text-white rounded-full p-0.5 shadow-xs">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <input
                    type="text"
                    placeholder="Or enter custom image URL / asset path"
                    value={courseForm.imageUrl}
                    onChange={(e) => setCourseForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                {/* Summary */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Course Summary (Short Description) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Brief description for the course card..."
                    value={courseForm.summary}
                    onChange={(e) => setCourseForm((prev) => ({ ...prev, summary: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                {/* Detailed Overview */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Detailed Overview
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Full detailed overview shown on the course details page..."
                    value={courseForm.overview}
                    onChange={(e) => setCourseForm((prev) => ({ ...prev, overview: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* What You'll Learn */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      What You'll Learn (One per line)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="e.g. Understand routing concepts&#10;Configure essential IP services"
                      value={courseForm.learningObjectives}
                      onChange={(e) => setCourseForm((prev) => ({ ...prev, learningObjectives: e.target.value }))}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white leading-relaxed whitespace-pre-wrap"
                    />
                  </div>

                  {/* Prerequisites */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Prerequisites (One per line)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="e.g. Basic computer literacy&#10;No prior certification needed"
                      value={courseForm.prerequisites}
                      onChange={(e) => setCourseForm((prev) => ({ ...prev, prerequisites: e.target.value }))}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white leading-relaxed whitespace-pre-wrap"
                    />
                  </div>
                </div>

                {/* Course Content Outline */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Course Outline / Modules (Format: Title | Description, one per line)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="e.g. Module 1 | Introduction to networking concepts&#10;Module 2 | Advanced configuration"
                    value={courseForm.outline}
                    onChange={(e) => setCourseForm((prev) => ({ ...prev, outline: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white leading-relaxed font-mono whitespace-pre-wrap"
                  />
                </div>

                {/* Course Syllabus PDF Section */}
                <div className="p-4 rounded-xl border border-orange-200 bg-orange-50/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#ea6d24] flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#152e4d] block">
                          Course Syllabus Document (PDF)
                        </label>
                        <span className="text-[10px] text-slate-500">
                          Uploaded PDF is delivered when users complete the enquiry form
                        </span>
                      </div>
                    </div>

                    {courseForm.syllabusUrl && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Custom PDF Attached
                      </span>
                    )}
                  </div>

                  {courseForm.syllabusUrl ? (
                    <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-800 truncate">
                            {courseForm.syllabusFileName || 'Course_Syllabus.pdf'}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-2">
                            <span>{courseForm.syllabusFileSize || 'PDF Document'}</span>
                            <span>•</span>
                            <span className="text-emerald-600 font-semibold">Active for Download</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            if (courseForm.syllabusUrl.startsWith('data:') || courseForm.syllabusUrl.startsWith('blob:')) {
                              const link = document.createElement('a');
                              link.href = courseForm.syllabusUrl;
                              link.download = courseForm.syllabusFileName || 'Syllabus.pdf';
                              link.click();
                            } else {
                              window.open(courseForm.syllabusUrl, '_blank');
                            }
                          }}
                          className="px-2 py-1 text-[11px] font-bold text-[#152e4d] bg-slate-100 hover:bg-slate-200 rounded flex items-center gap-1 cursor-pointer"
                          title="Test download syllabus"
                        >
                          <Download className="w-3 h-3" />
                          <span>Test</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setCourseForm((prev) => ({
                              ...prev,
                              syllabusUrl: '',
                              syllabusFileName: '',
                              syllabusFileSize: '',
                            }))
                          }
                          className="px-2 py-1 text-[11px] font-bold text-red-600 hover:bg-red-50 rounded flex items-center gap-1 cursor-pointer"
                          title="Remove custom PDF (will revert to auto-generated branded PDF)"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-white/70 rounded-lg border border-dashed border-orange-300 text-center space-y-1">
                      <p className="text-[11px] text-slate-600">
                        No custom PDF uploaded yet. The system will automatically generate a clean, official branded PDF from course outline data.
                      </p>
                    </div>
                  )}

                  {/* Upload Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <label className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-300 hover:border-[#ea6d24] text-slate-700 hover:text-[#ea6d24] rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-2xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploadingSyllabus ? 'Attaching PDF...' : 'Upload PDF Document (.pdf)'}</span>
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleSyllabusFileUpload}
                        disabled={isUploadingSyllabus}
                        className="hidden"
                      />
                    </label>

                    <input
                      type="text"
                      placeholder="Or enter public syllabus PDF URL"
                      value={courseForm.syllabusUrl.startsWith('data:') ? '' : courseForm.syllabusUrl}
                      onChange={(e) =>
                        setCourseForm((prev) => ({
                          ...prev,
                          syllabusUrl: e.target.value,
                          syllabusFileName: e.target.value ? 'External_Syllabus.pdf' : '',
                          syllabusFileSize: 'Cloud PDF',
                        }))
                      }
                      className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-[#ea6d24] hover:bg-[#d85e19] text-white font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingCourseId ? 'Save Course Changes' : 'Publish Course to Catalog'}</span>
                </button>
              </form>

              {/* Course Catalog Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Active Catalog Courses ({courses.length})
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Synced with Express REST backend /api/courses
                  </span>
                </div>

                <div className="space-y-2">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={course.imageUrl || '/src/assets/images/azure_cloud_infra_1787771504293.webp'}
                          alt={course.title}
                          className="w-12 h-10 rounded-md object-cover border border-slate-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-[#152e4d] truncate">
                            {course.title}
                          </h5>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 flex-wrap mt-0.5">
                            <span className="font-semibold text-[#ea6d24]">
                              {course.certificationVendor || course.domain}
                            </span>
                            <span>•</span>
                            <span>{course.skillLevel || 'Intermediate'}</span>
                            <span>•</span>
                            <span
                              className={`px-1.5 py-0.2 rounded font-semibold ${
                                course.syllabusUrl
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {course.syllabusUrl ? '📄 Custom PDF' : '📄 Default PDF'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => downloadCourseSyllabus(course)}
                          className="p-1.5 text-slate-500 hover:text-[#ea6d24] hover:bg-orange-50 rounded-md transition-colors"
                          title="Download syllabus PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditCourse(course)}
                          className="p-1.5 text-slate-600 hover:text-[#152e4d] hover:bg-slate-100 rounded-md transition-colors"
                          title="Edit course"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCourse(course.id, course.title)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete course"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Direct JSON Payload (Synced with REST API /api/cms)</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(jsonText);
                    setSaveNotification('JSON schema copied to clipboard!');
                    setTimeout(() => setSaveNotification(''), 3000);
                  }}
                  className="text-[#e65f1e] hover:underline flex items-center gap-1 font-semibold"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </button>
              </div>

              {jsonError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
                  JSON Syntax Error: {jsonError}
                </div>
              )}

              <textarea
                rows={20}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                className="w-full font-mono text-xs p-3 rounded-lg border border-slate-300 bg-slate-900 text-emerald-400 focus:outline-none focus:ring-2 focus:ring-[#e65f1e]"
                spellCheck={false}
              />

              <button
                onClick={handleSaveJson}
                disabled={isSaving}
                className="w-full bg-[#152e4d] hover:bg-[#0f243d] text-white text-sm font-bold py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Validating & Updating...' : 'Apply Raw JSON Payload'}</span>
              </button>
            </div>
          )}

          {activeTab === 'supabase' && (
            <div className="space-y-5 text-slate-700 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-blue-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#152e4d] text-sm">
                    Supabase Cloud Database Status
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-semibold uppercase text-[10px] ${
                      supabaseStatus.configured
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {supabaseStatus.configured ? 'Connected' : 'In-Memory Store Active'}
                  </span>
                </div>
                <p className="text-slate-600">
                  {supabaseStatus.configured
                    ? `Connected to Supabase at: ${supabaseStatus.supabaseUrl}`
                    : 'The app is running on its built-in full-stack Express REST engine with in-memory persistence. To link your external Supabase project, simply add SUPABASE_URL and SUPABASE_ANON_KEY to your environment variables.'}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold uppercase tracking-wider text-slate-700">
                    Ready-to-Use Supabase SQL Schema
                  </label>
                  <button
                    onClick={copySqlSchema}
                    className="text-[#e65f1e] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedSchema ? 'Copied!' : 'Copy SQL'}</span>
                  </button>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Copy and execute this script inside your Supabase project SQL Editor to create table structures for CMS sections, leads, and courses.
                </p>
                <pre className="p-3.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-60">
                  {supabaseStatus.sqlSchema}
                </pre>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <h4 className="font-bold text-slate-800">REST API Endpoints Available:</h4>
                <ul className="space-y-1 font-mono text-[11px] text-slate-600">
                  <li>• <span className="text-emerald-700 font-bold">GET</span> /api/cms - Fetch full UI schema</li>
                  <li>• <span className="text-blue-700 font-bold">PUT</span> /api/cms - Update UI schema directly</li>
                  <li>• <span className="text-emerald-700 font-bold">GET</span> /api/courses - Query courses & domains</li>
                  <li>• <span className="text-orange-700 font-bold">POST</span> /api/leads - Create lead/quote request</li>
                  <li>• <span className="text-emerald-700 font-bold">GET</span> /api/leads - Retrieve submitted inquiries</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Captured Leads & Inquiries ({leads.length})
                </h4>
                <button
                  onClick={onRefreshLeads}
                  className="text-xs font-semibold text-[#e65f1e] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>

              {leads.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No inquiries received yet. Submit an inquiry through "Talk to an Advisor" or "Raise a Request Now" to see it stored here!
                </div>
              ) : (
                <div className="space-y-3">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className={`p-4 rounded-xl border bg-white shadow-xs space-y-2.5 ${
                        lead.inquiryType === 'syllabus_download'
                          ? 'border-orange-200 ring-1 ring-orange-100'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#152e4d]">
                            {lead.fullName}
                          </span>
                          {lead.jobRole && (
                            <span className="text-[11px] text-slate-500 font-medium">
                              ({lead.jobRole})
                            </span>
                          )}
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 ${
                            lead.inquiryType === 'syllabus_download'
                              ? 'bg-orange-100 text-[#ea6d24] border border-orange-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {lead.inquiryType === 'syllabus_download' && <FileText className="w-3 h-3" />}
                          {lead.inquiryType.replace('_', ' ')}
                        </span>
                      </div>

                      {lead.courseTitle && (
                        <div className="text-xs bg-orange-50/70 border border-orange-100 px-2.5 py-1.5 rounded-md text-[#152e4d] font-semibold flex items-center justify-between">
                          <span>🎯 Requested Course: {lead.courseTitle}</span>
                          {lead.preferredFormat && (
                            <span className="text-[10px] text-[#ea6d24] font-bold bg-white px-2 py-0.5 rounded border border-orange-200">
                              {lead.preferredFormat}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                        <span>📧 {lead.email}</span>
                        {lead.phone && <span>📞 {lead.phone}</span>}
                        {lead.company && <span>🏢 {lead.company}</span>}
                        {lead.selectedDomain && !lead.courseTitle && (
                          <span>🎯 Domain: {lead.selectedDomain}</span>
                        )}
                      </div>

                      {lead.message && (
                        <p className="text-xs bg-slate-50 p-2 rounded text-slate-700 italic">
                          "{lead.message}"
                        </p>
                      )}

                      <div className="text-[10px] text-slate-400">
                        Received: {new Date(lead.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#ea6d24]" />
                    Email System & Cloud Dispatch Diagnostics
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verify automated student acknowledgment and admin lead alert delivery in production.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fetchEmailDiagnostics}
                  disabled={isLoadingDiagnostics}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDiagnostics ? 'animate-spin' : ''}`} />
                  <span>Refresh Test</span>
                </button>
              </div>

              {/* Active Dispatch Engine Card */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-slate-600" />
                    <span className="font-bold text-xs text-slate-800">Active Delivery Method</span>
                  </div>
                  {emailDiagnostics?.configured ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {emailDiagnostics?.activeMethod || 'Configured'}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Credentials Needed
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Configured SMTP Host</span>
                    <span className="font-semibold text-slate-800">
                      {emailDiagnostics?.config?.host || 'smtp.titan.email'}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Ports (Primary / Fallback / Alt)</span>
                    <span className="font-semibold text-slate-800">
                      Port {emailDiagnostics?.config?.primaryPort || 465} ⇄ Port {emailDiagnostics?.config?.fallbackPort || 587} ⇄ 2525
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Sender Email (EMAIL_USER)</span>
                    <span className="font-semibold text-slate-800">
                      {emailDiagnostics?.config?.user || 'info@learnify-solutions.com'}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Admin Recipient (ADMIN_EMAIL)</span>
                    <span className="font-semibold text-slate-800">
                      {emailDiagnostics?.config?.adminEmail || 'info@learnify-solutions.com'}
                    </span>
                  </div>
                </div>

                {/* Port Verification Results */}
                {emailDiagnostics?.verification && (
                  <div className="mt-2 pt-2.5 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Port {emailDiagnostics.config.primaryPort} Status:</span>
                      <span className={`font-semibold flex items-center gap-1 ${emailDiagnostics.verification.primary.success ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {emailDiagnostics.verification.primary.success ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        {emailDiagnostics.verification.primary.message}
                      </span>
                    </div>
                    {!emailDiagnostics.hasResend && !emailDiagnostics.hasBrevo && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">Port {emailDiagnostics.config.fallbackPort} Fallback:</span>
                        <span className={`font-semibold flex items-center gap-1 ${emailDiagnostics.verification.fallback.success ? 'text-emerald-600' : 'text-slate-500'}`}>
                          {emailDiagnostics.verification.fallback.success ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                          {emailDiagnostics.verification.fallback.message}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Live Test Email Dispatcher */}
              <div className="p-4 rounded-xl border border-orange-200 bg-orange-50/40 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                  <Send className="w-4 h-4 text-[#ea6d24]" />
                  <span>Send Real-Time Test Email</span>
                </div>
                <p className="text-xs text-slate-600">
                  Send a live test email to verify that your production server can deliver emails to your inbox.
                </p>

                <form onSubmit={handleSendTestEmail} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email (e.g. shivankpandey91@gmail.com)"
                    value={testEmailAddress}
                    onChange={(e) => setTestEmailAddress(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#ea6d24]"
                  />
                  <button
                    type="submit"
                    disabled={isSendingTestEmail || !testEmailAddress}
                    className="px-4 py-2 bg-[#ea6d24] text-white text-xs font-bold rounded-lg hover:bg-[#d85810] disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {isSendingTestEmail ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Test Email</span>
                      </>
                    )}
                  </button>
                </form>

                {testEmailResult && (
                  <div
                    className={`p-3 rounded-lg text-xs font-semibold flex items-start gap-2 ${
                      testEmailResult.success
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}
                  >
                    {testEmailResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <p>{testEmailResult.message}</p>
                      {testEmailResult.messageId && (
                        <p className="text-[10px] text-emerald-600 font-mono">
                          Message ID: {testEmailResult.messageId}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Instant Railway / Cloud Fix Solution */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2.5 text-xs text-slate-700">
                <h5 className="font-bold text-blue-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  💡 100% Reliable Fix for Cloud Port Blocks (Resend HTTPS API)
                </h5>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Cloud hosting providers (like Railway, Render, AWS, Vercel) block outbound SMTP ports (25, 465, 587) by default to prevent spam. 
                  You can bypass all port blocks instantly by adding a free <strong className="text-blue-900">Resend API Key</strong> (3,000 free emails/month):
                </p>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-[11px] space-y-1 overflow-x-auto">
                  <p><span className="text-emerald-400"># In Railway Variables, add:</span></p>
                  <p><span className="text-orange-400">RESEND_API_KEY</span>=re_123456789abcdef</p>
                  <p><span className="text-orange-400">EMAIL_FROM</span>="Learnify Solutions" &lt;onboarding@resend.dev&gt; (or your domain)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
