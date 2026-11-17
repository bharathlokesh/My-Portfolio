import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import profileImg from '../assets/profile.jpg';
import {
  Gauge,
  User,
  Layers,
  FolderGit2,
  GitFork,
  GraduationCap,
  Mail,
  Settings,
  LogOut,
  ArrowUpRight,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Search,
  KeyRound,
  Database,
  Camera,
  UploadCloud,
  RotateCcw,
  Download,
  Upload,
  RefreshCw,
  Phone,
  MapPin
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    projects,
    categories,
    skills,
    profile,
    education = [],
    inquiries = [],
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    deleteSkill,
    updateProfile,
    updateEducation,
    addEducation,
    deleteEducation,
    deleteInquiry,
    markInquiryRead,
    refreshInquiriesFromCloud,
    resetToDefaults,
    exportData,
    importData
  } = usePortfolio();

  const { logout, updateCredentials, adminEmail } = useAuth();

  // Active Tab: 'overview' | 'hero' | 'skills' | 'projects' | 'education' | 'inquiries' | 'settings'
  const [activeTab, setActiveTab] = useState('overview');
  const [toastMessage, setToastMessage] = useState('');

  // Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectSearch, setProjectSearch] = useState('');
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'AI / Computer Vision',
    tagline: '',
    description: '',
    technologies: '',
    metrics: '',
    status: 'Production Ready',
    githubUrl: '#',
    liveUrl: '#'
  });

  // Profile Form State
  const [profileForm, setProfileForm] = useState({ ...profile });

  // Admin Account & Credentials Form State
  const [accountEmail, setAccountEmail] = useState(adminEmail || 'bharathlokesh07@gmail.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState({ type: '', text: '' });

  // Inline New Skill State
  const [newSkillForm, setNewSkillForm] = useState({});

  // Inquiry refresh state
  const [isRefreshingInquiries, setIsRefreshingInquiries] = useState(false);

  const handleSyncInquiries = async () => {
    if (!refreshInquiriesFromCloud) return;
    setIsRefreshingInquiries(true);
    const res = await refreshInquiriesFromCloud();
    setIsRefreshingInquiries(false);
    if (res.success) {
      showToast(`Synced ${res.count || 0} inquiries from Supabase!`);
    } else {
      showToast('Sync error: ' + (res.error || 'Failed to fetch'));
    }
  };

  // Show Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Logout with Confirmation
  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out of the Admin Console?');
    if (confirmed) {
      logout();
    }
  };

  // Open Add Project Modal
  const handleOpenAddProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      category: 'AI / Computer Vision',
      tagline: '',
      description: '',
      technologies: 'Python, OpenCV, PyTorch',
      metrics: 'High Accuracy',
      status: 'Active Pipeline',
      githubUrl: '#',
      liveUrl: '#'
    });
    setIsProjectModalOpen(true);
  };

  // Open Edit Project Modal
  const handleOpenEditProject = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      tagline: proj.tagline || '',
      description: proj.description || '',
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : (proj.technologies || ''),
      metrics: proj.metrics || '',
      status: proj.status || 'Active Pipeline',
      githubUrl: proj.githubUrl || '#',
      liveUrl: proj.liveUrl || '#'
    });
    setIsProjectModalOpen(true);
  };

  // Save Project (Add or Edit)
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      alert('Please enter a project title');
      return;
    }

    const techArray = typeof projectForm.technologies === 'string'
      ? projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean)
      : projectForm.technologies;

    if (editingProjectId) {
      updateProject(editingProjectId, {
        ...projectForm,
        technologies: techArray
      });
      showToast('Project updated successfully!');
    } else {
      const newId = projectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      addProject({
        id: newId || `project-${Date.now()}`,
        title: projectForm.title,
        category: projectForm.category,
        tagline: projectForm.tagline,
        description: projectForm.description,
        technologies: techArray,
        metrics: projectForm.metrics,
        status: projectForm.status,
        githubUrl: projectForm.githubUrl || '#',
        liveUrl: projectForm.liveUrl || '#'
      });
      showToast('New project added successfully!');
    }

    setIsProjectModalOpen(false);
  };

  // Handle Delete Project
  const handleDeleteProject = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id);
      showToast('Project removed.');
    }
  };

  // Handle Add Skill (In-Card Form)
  const handleAddSkill = (categoryId) => {
    const input = newSkillForm[categoryId];
    if (!input || !input.name || !input.name.trim()) {
      alert('Please enter a skill name (e.g. PyTorch, React, ESP32).');
      return;
    }

    const catObj = skills.find(c => c.id === categoryId);
    const categoryName = catObj ? catObj.title : categoryId;

    addSkill(categoryId, {
      name: input.name.trim(),
      detail: (input.detail && input.detail.trim()) || 'Core Competency'
    });

    setNewSkillForm(prev => ({
      ...prev,
      [categoryId]: { name: '', detail: '' }
    }));
    showToast(`Added ${input.name.trim()} to ${categoryName}!`);
  };

  // Skill Modal State & Handlers
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [skillModalForm, setSkillModalForm] = useState({
    categoryId: 'ai-ml',
    name: '',
    detail: ''
  });

  const handleOpenAddSkillModal = (defaultCategory = 'ai-ml') => {
    setSkillModalForm({
      categoryId: defaultCategory,
      name: '',
      detail: ''
    });
    setIsSkillModalOpen(true);
  };

  const handleSaveSkillModal = (e) => {
    e.preventDefault();
    if (!skillModalForm.name.trim()) {
      alert('Please enter a skill name (e.g. PyTorch, React, ESP32)');
      return;
    }
    const targetCategory = skillModalForm.categoryId || skills[0]?.id || 'programming';
    const catObj = skills.find(c => c.id === targetCategory);
    const categoryName = catObj ? catObj.title : targetCategory;

    addSkill(targetCategory, {
      name: skillModalForm.name.trim(),
      detail: skillModalForm.detail.trim() || 'Core Competency'
    });

    showToast(`Added ${skillModalForm.name.trim()} to ${categoryName}!`);
    setIsSkillModalOpen(false);
    setSkillModalForm({ categoryId: 'ai-ml', name: '', detail: '' });
  };

  // Education Modal State & Handlers
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [editingEducationId, setEditingEducationId] = useState(null);
  const [educationForm, setEducationForm] = useState({
    type: "BACHELOR'S DEGREE (B.E / B.TECH)",
    degree: '',
    institution: '',
    period: '',
    status: 'Upcoming / Enrolled',
    description: ''
  });

  const handleOpenAddEducation = () => {
    setEditingEducationId(null);
    setEducationForm({
      type: "BACHELOR'S DEGREE (B.E / B.TECH)",
      degree: '',
      institution: '',
      period: '2027 - 2030',
      status: 'Upcoming / Enrolled',
      description: 'Pursuing higher studies in Computer Science, Artificial Intelligence, and Advanced Engineering.'
    });
    setIsEducationModalOpen(true);
  };

  const handleOpenEditEducation = (edu) => {
    setEditingEducationId(edu.id);
    setEducationForm({
      type: edu.type || "ACADEMIC PROGRAM",
      degree: edu.degree || '',
      institution: edu.institution || '',
      period: edu.period || '',
      status: edu.status || 'Completed',
      description: edu.description || ''
    });
    setIsEducationModalOpen(true);
  };

  const handleSaveEducation = (e) => {
    e.preventDefault();
    if (!educationForm.degree.trim()) {
      alert('Please enter a degree or program title (e.g. B.Tech in AI & Data Science)');
      return;
    }

    if (editingEducationId) {
      updateEducation(editingEducationId, educationForm);
      showToast('Education record updated!');
    } else {
      addEducation({
        ...educationForm,
        highlights: [
          { title: 'Advanced Computing', desc: 'Algorithms, Data Structures & System Architecture' },
          { title: 'Applied Intelligence', desc: 'Deep Learning, Neural Networks & Computer Vision' },
          { title: 'Software Engineering', desc: 'Full Stack Development, Scalable Microservices' },
          { title: 'Research & Innovation', desc: 'Technical Projects, Research & Publications' }
        ]
      });
      showToast('New education detail added to portfolio!');
    }

    setIsEducationModalOpen(false);
  };

  const handleDeleteEducation = (id, degreeName) => {
    const confirmed = window.confirm(`Are you sure you want to remove "${degreeName || 'this education record'}"?`);
    if (confirmed) {
      deleteEducation(id);
      showToast('Education record removed.');
    }
  };

  // Handle Profile Image Upload (with Canvas compression)
  const handleProfileImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        setProfileForm(p => ({ ...p, profileImage: dataUrl }));
        showToast('Photo selected! Click "Save Changes" to apply.');
      };
      img.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Handle Save Profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast('Profile and identity updated!');
  };

  // Handle Update Admin Credentials (Gmail & Password)
  const handleUpdateCredentials = (e) => {
    e.preventDefault();
    setPasswordFeedback({ type: '', text: '' });

    if (!currentPassword) {
      setPasswordFeedback({ type: 'error', text: 'Current password is required to save account changes.' });
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setPasswordFeedback({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setPasswordFeedback({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    const res = updateCredentials({
      currentPassword,
      newEmail: accountEmail !== adminEmail ? accountEmail : undefined,
      newPassword: newPassword || undefined
    });

    if (res.success) {
      setPasswordFeedback({ type: 'success', text: res.message });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Admin credentials updated successfully!');
    } else {
      setPasswordFeedback({ type: 'error', text: res.message });
    }
  };

  // Handle Export Backup
  const handleExportBackup = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Backup JSON downloaded!');
  };

  // Handle Import Backup
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importData(event.target.result);
      if (res.success) {
        showToast('Backup imported successfully!');
      } else {
        alert('Failed to import backup: ' + res.error);
      }
    };
    reader.readAsText(file);
  };

  // Handle Reset Defaults
  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to restore original portfolio defaults? All custom changes will be reset.')) {
      resetToDefaults();
      setProfileForm({ ...profile, profileImage: '' });
      showToast('Restored factory defaults!');
    }
  };

  // Filter projects by search
  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(projectSearch.toLowerCase()) ||
    (p.technologies && p.technologies.some(t => t.toLowerCase().includes(projectSearch.toLowerCase())))
  );

  const activeAvatar = profileForm.profileImage || profile.profileImage || profileImg;
  const totalSkillsCount = skills.reduce((acc, cat) => acc + (cat.skills ? cat.skills.length : 0), 0);
  const unreadInquiriesCount = inquiries.filter(i => !i.read).length;

  // Navigation Items matching uploaded image 1
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Gauge },
    { id: 'hero', label: 'Hero & Identity', icon: User },
    { id: 'skills', label: `Skills Matrix (${totalSkillsCount})`, icon: Layers },
    { id: 'projects', label: `Projects (${projects.length})`, icon: FolderGit2 },
    { id: 'education', label: `Education (${education.length})`, icon: GraduationCap },
    { id: 'contact', label: 'Contact Details', icon: Phone },
    { id: 'inquiries', label: `Inquiries${unreadInquiriesCount > 0 ? ` (${unreadInquiriesCount})` : ''}`, icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="admin-scope min-h-screen md:h-screen md:overflow-hidden bg-warmwhite-200 text-stone-900 selection:bg-gold-500/20 selection:text-gold-900 font-sans relative flex flex-col">
      
      {/* Background Subtle Gold Grid Overlay - GPU isolated */}
      <div className="fixed inset-0 tech-grid-pattern opacity-40 pointer-events-none z-0 transform-gpu will-change-transform" />

      {/* Background Ambient Gold Radial Glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-gold-300/15 via-amber-200/5 to-transparent blur-[90px] pointer-events-none -z-10" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-stone-900 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5 border border-gold-400/30">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header: Brand on left, Database + Live Portfolio + Separate Logout Icon on right */}
      <header className="shrink-0 bg-white/85 backdrop-blur-md border-b border-gold-400/25 px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-xs z-30">
        <div className="flex items-center gap-3">
          {/* Avatar / Profile photo in Header */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-gold-400/60 shadow-xs shrink-0 bg-gold-100 flex items-center justify-center">
            <img
              src={activeAvatar}
              alt={profile.name || "Admin"}
              className="w-full h-full object-cover object-[center_28%]"
            />
          </div>
          <div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-stone-900 font-sans block leading-tight">
              {profile.name || 'BHARATH LOKESH'}
            </span>
            <span className="text-[10px] font-sans uppercase tracking-wider text-stone-500 font-semibold block">
              Studio Admin Control
            </span>
          </div>
        </div>

        {/* Header Right Actions: Connected Database Pill + Live Portfolio Button + Separate Logout Icon Button */}
        <div className="flex items-center gap-2">
          {/* Database Connected Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl border border-emerald-300 bg-emerald-50/90 text-emerald-800 text-xs font-sans font-medium shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold text-[11px] sm:text-xs">Supabase Connected</span>
          </div>

          {/* Live Portfolio Button */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 px-3 rounded-xl border border-gold-400/30 hover:border-gold-500 hover:bg-gold-50/80 bg-white/80 text-[11px] font-sans font-medium text-stone-700 hover:text-stone-950 transition-all inline-flex items-center gap-1.5 shadow-xs"
            title="Open Live Portfolio in new tab"
          >
            <span>Live Portfolio</span>
            <ArrowUpRight className="w-3 h-3 text-gold-600 shrink-0" />
          </Link>

          {/* Separate Logout Button matching second uploaded image */}
          <button
            onClick={handleLogout}
            type="button"
            className="h-8 w-8 rounded-xl border border-gold-400/30 hover:border-red-300 hover:bg-red-50 bg-white text-stone-800 hover:text-red-600 transition-all flex items-center justify-center cursor-pointer shadow-xs shrink-0"
            title="Log Out"
            aria-label="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout: Left Sidebar Navigation + Right Content View */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0 relative z-10 md:overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5 items-start md:h-full">
          
          {/* ======================================================== */}
          {/* LEFT SIDEBAR NAVIGATION (Matching Reference Image 1) */}
          {/* ======================================================== */}
          <aside className="md:col-span-4 lg:col-span-3 pb-4 md:pb-8 md:pr-4 lg:pr-6 border-b md:border-b-0 md:border-r border-gold-400/30 md:h-full md:overflow-y-auto">
            <nav className="space-y-1 p-1 bg-transparent">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    type="button"
                    className={`w-full text-left transition-all duration-150 flex items-center gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-white rounded-xl shadow-xs border border-gold-400/25 text-[#735118] font-bold px-3.5 py-2.5'
                        : 'text-stone-700 hover:text-stone-950 hover:bg-white/60 rounded-lg px-3.5 py-2 font-medium text-sm'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#8c6523]' : 'text-stone-500'}`} />
                    <span className="text-sm tracking-tight">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ======================================================== */}
          {/* RIGHT CONTENT PANEL (Tabs) */}
          {/* ======================================================== */}
          <div className="md:col-span-8 lg:col-span-9 md:pl-2 lg:pl-3 md:h-full md:overflow-y-auto md:pr-2 pb-24">

            {/* TAB 1: OVERVIEW (Matching exact layout from user image) */}
            {activeTab === 'overview' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                
                {/* Header Title & Subtitle */}
                <div>
                  <h1 className="text-xl sm:text-2xl font-sans font-extrabold text-stone-900 tracking-tight">
                    Portfolio Overview & Metrics
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 font-normal">
                    Live state of your architectural portfolio presentation and incoming commissions.
                  </p>
                </div>

                {/* 4 Primary Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Published Projects */}
                  <div
                    onClick={() => setActiveTab('projects')}
                    className="p-5 sm:p-6 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card hover:border-gold-500/60 transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-sans uppercase tracking-wider text-stone-500 font-semibold block mb-3">
                      PUBLISHED PROJECTS
                    </span>
                    <div className="text-3xl sm:text-4xl font-sans font-extrabold text-stone-900">
                      {projects.length}
                    </div>
                  </div>

                  {/* Card 2: Technical Capabilities */}
                  <div
                    onClick={() => setActiveTab('skills')}
                    className="p-5 sm:p-6 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card hover:border-gold-500/60 transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-sans uppercase tracking-wider text-stone-500 font-semibold block mb-3">
                      TECHNICAL CAPABILITIES
                    </span>
                    <div className="text-3xl sm:text-4xl font-sans font-extrabold text-stone-900">
                      {totalSkillsCount}
                    </div>
                  </div>

                  {/* Card 3: Inbound Inquiries */}
                  <div
                    onClick={() => setActiveTab('inquiries')}
                    className="p-5 sm:p-6 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card hover:border-gold-500/60 transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-sans uppercase tracking-wider text-stone-500 font-semibold block mb-3">
                      INBOUND INQUIRIES
                    </span>
                    <div className="text-3xl sm:text-4xl font-sans font-extrabold text-stone-900">
                      {inquiries.length}
                    </div>
                  </div>

                  {/* Card 4: Database Mode */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card">
                    <span className="text-xs font-sans uppercase tracking-wider text-stone-500 font-semibold block mb-3">
                      DATABASE MODE
                    </span>
                    <div className="text-lg sm:text-xl font-sans font-extrabold text-gold-900 leading-tight">
                      Supabase<br />PostgreSQL
                    </div>
                  </div>
                </div>

                {/* Quick Commands Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card space-y-4">
                  <div>
                    <h2 className="text-base font-sans font-bold text-stone-900">
                      Quick Commands
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 font-normal mt-1">
                      Select a section from the left sidebar to update project showcases, fine-tune skill competencies, or review transmission logs from visitors.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      onClick={() => setActiveTab('skills')}
                      type="button"
                      className="px-4 py-2 rounded-xl bg-white border border-gold-400/35 hover:border-gold-500 hover:bg-gold-50/80 text-xs font-sans font-medium text-stone-800 flex items-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98"
                    >
                      <Layers className="w-3.5 h-3.5 text-stone-700" />
                      <span>Edit Skills Matrix</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('projects')}
                      type="button"
                      className="px-4 py-2 rounded-xl bg-white border border-gold-400/35 hover:border-gold-500 hover:bg-gold-50/80 text-xs font-sans font-medium text-stone-800 flex items-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98"
                    >
                      <GitFork className="w-3.5 h-3.5 text-stone-700" />
                      <span>Manage Projects</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('inquiries')}
                      type="button"
                      className="px-4 py-2 rounded-xl bg-white border border-gold-400/35 hover:border-gold-500 hover:bg-gold-50/80 text-xs font-sans font-medium text-stone-800 flex items-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98"
                    >
                      <Mail className="w-3.5 h-3.5 text-stone-700" />
                      <span>View Inquiries ({unreadInquiriesCount} unread)</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: HERO & IDENTITY */}
            {activeTab === 'hero' && (
              <form onSubmit={handleSaveProfile} className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card flex items-center justify-between">
                  <div>
                    <h2 className="text-base sm:text-lg font-sans font-bold text-stone-900 mb-0.5">
                      Hero & Personal Identity
                    </h2>
                    <p className="text-xs text-stone-600 font-sans">
                      Modify your profile picture, titles, hero tagline, and about me narrative.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="btn-gold px-4 py-2 rounded-xl text-stone-950 font-bold text-xs sm:text-sm shadow-sm cursor-pointer"
                  >
                    Save Identity
                  </button>
                </div>

                {/* Profile Photo Uploader Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative group shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-gold-400/60 shadow-md shadow-gold-500/15 bg-gold-100 flex items-center justify-center">
                          <img
                            src={activeAvatar}
                            alt={profileForm.name || "Profile Photo"}
                            className="w-full h-full object-cover object-[center_28%]"
                          />
                        </div>
                        <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-gradient-to-r from-gold-400 to-amber-500 text-stone-950 border-2 border-white shadow-md">
                          <Camera className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-base font-sans font-bold text-stone-900 mb-0.5">
                          Profile Photo
                        </h3>
                        <p className="text-xs text-stone-500 font-sans mb-1.5">
                          Active across your portfolio navbar and admin console.
                        </p>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-sans font-semibold">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{profileForm.profileImage ? 'Custom Photo Active' : 'Default Photo Active (profile.jpg)'}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <label className="btn-gold px-3.5 py-2 rounded-xl text-stone-950 font-bold text-xs font-sans flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-98">
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Upload New Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageUpload}
                          className="hidden"
                        />
                      </label>

                      {profileForm.profileImage && (
                        <button
                          type="button"
                          onClick={() => {
                            setProfileForm(p => ({ ...p, profileImage: '' }));
                            showToast('Reverted to default portfolio photo! Click Save to apply.');
                          }}
                          className="px-3 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-sans text-stone-600 transition-all cursor-pointer shadow-xs"
                        >
                          Reset to Default
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gold-400/20">
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                      Or Paste External Image URL
                    </label>
                    <input
                      type="url"
                      value={profileForm.profileImage || ''}
                      onChange={(e) => setProfileForm(p => ({ ...p, profileImage: e.target.value }))}
                      placeholder="https://example.com/my-photo.jpg (or upload file above)"
                      className="w-full px-3.5 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                    />
                  </div>
                </div>

                {/* Identity Form Details */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                        Full Name (Hero Display)
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        value={profileForm.title}
                        onChange={(e) => setProfileForm(p => ({ ...p, title: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                      Hero Short Tagline Bio
                    </label>
                    <textarea
                      rows={2}
                      value={profileForm.heroBio}
                      onChange={(e) => setProfileForm(p => ({ ...p, heroBio: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 leading-relaxed shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                      About Section Detailed Bio Narrative
                    </label>
                    <textarea
                      rows={3}
                      value={profileForm.aboutBio}
                      onChange={(e) => setProfileForm(p => ({ ...p, aboutBio: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 leading-relaxed shadow-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full py-2.5 sm:py-3 rounded-xl text-stone-950 font-bold text-sm shadow-md shadow-gold-500/20 cursor-pointer"
                >
                  Save Hero & Identity
                </button>
              </form>
            )}

            {/* TAB 3: SKILLS MATRIX */}
            {activeTab === 'skills' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Prominent Header Banner with + Add Technical Skill Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-900 text-xs font-sans font-semibold mb-1.5">
                      <Layers className="w-3.5 h-3.5 text-gold-600" />
                      <span>Skills Matrix Active</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-stone-900 tracking-tight">
                      Technical Skills Matrix ({totalSkillsCount})
                    </h2>
                    <p className="text-xs text-stone-600 font-sans mt-0.5">
                      Manage technical competencies and specializations across your {skills.length} engineering domains.
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenAddSkillModal('programming')}
                    type="button"
                    className="btn-gold px-4 py-2 rounded-xl text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-gold-500/20 active:scale-98 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>+ Add Technical Skill</span>
                  </button>
                </div>

                {/* Domain Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4">
                  {skills.map((cat) => (
                    <div
                      key={cat.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card flex flex-col justify-between min-w-0"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-gold-400/20">
                          <h3 className="font-sans font-bold text-base text-stone-900">
                            {cat.title}
                          </h3>
                          <span className="text-[11px] font-sans text-stone-500 font-semibold px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200">
                            {cat.skills.length} skills
                          </span>
                        </div>

                        {/* Existing Skills Badges */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 min-h-[36px]">
                          {cat.skills.map((s) => (
                            <div
                              key={s.name}
                              className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gold-50/80 border border-gold-400/30 text-xs font-sans text-stone-900 hover:border-gold-400/60 shadow-xs transition-all"
                            >
                              <div>
                                <span className="font-bold">{s.name}</span>
                                <span className="text-[10px] text-stone-500 ml-1 font-normal">({s.detail})</span>
                              </div>
                              <button
                                onClick={() => deleteSkill(cat.id, s.name)}
                                type="button"
                                className="text-stone-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                                title={`Remove ${s.name}`}
                                aria-label={`Remove ${s.name}`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Clean, Full-Width In-Card Add Form that NEVER overflows */}
                      <div className="pt-3 border-t border-gold-400/20 mt-1">
                        <div className="bg-warmwhite-50/90 rounded-xl p-3 sm:p-3.5 border border-gold-400/25">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-sans font-bold text-gold-900 uppercase tracking-wider flex items-center gap-1.5">
                              <Plus className="w-3.5 h-3.5 text-gold-700 stroke-[3]" />
                              <span>Add Skill to {cat.title}</span>
                            </span>
                            <span className="text-[10px] font-sans text-stone-400 hidden sm:inline">Press Enter to save</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                            <div className="min-w-0">
                              <label className="block text-[10px] font-sans text-stone-600 font-semibold mb-1 uppercase tracking-wider">
                                Skill Name *
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. PyTorch"
                                value={newSkillForm[cat.id]?.name || ''}
                                onChange={(e) => setNewSkillForm(prev => ({
                                  ...prev,
                                  [cat.id]: { ...(prev[cat.id] || {}), name: e.target.value }
                                }))}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddSkill(cat.id);
                                  }
                                }}
                                className="w-full px-3 py-1.5 rounded-xl bg-white border border-gold-400/35 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 font-sans shadow-xs transition-all"
                              />
                            </div>

                            <div className="min-w-0">
                              <label className="block text-[10px] font-sans text-stone-600 font-semibold mb-1 uppercase tracking-wider">
                                Detail / Role
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Deep Learning"
                                value={newSkillForm[cat.id]?.detail || ''}
                                onChange={(e) => setNewSkillForm(prev => ({
                                  ...prev,
                                  [cat.id]: { ...(prev[cat.id] || {}), detail: e.target.value }
                                }))}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddSkill(cat.id);
                                  }
                                }}
                                className="w-full px-3 py-1.5 rounded-xl bg-white border border-gold-400/35 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 font-sans shadow-xs transition-all"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => handleAddSkill(cat.id)}
                            type="button"
                            className="w-full btn-gold py-1.5 rounded-xl text-stone-950 font-bold text-xs font-sans flex items-center justify-center gap-1.5 shadow-xs hover:shadow-gold-500/20 active:scale-[0.99] cursor-pointer transition-all"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Add to {cat.title}</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/30 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-500 transition-all font-sans shadow-xs"
                    />
                  </div>

                  <button
                    onClick={handleOpenAddProject}
                    type="button"
                    className="btn-gold px-4 py-2 rounded-xl text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-gold-500/20 active:scale-98 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add New Project</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                  {filteredProjects.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 sm:p-4.5 rounded-2xl bg-white/95 border border-gold-400/30 hover:border-gold-400/60 transition-all flex flex-col justify-between group shadow-gold-card hover:shadow-glow-gold-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded-md bg-gold-500/15 border border-gold-400/35 text-[10px] font-sans text-gold-900 font-bold uppercase tracking-wider">
                            {p.category}
                          </span>
                          <span className="text-[10px] font-sans text-stone-500 font-semibold">
                            {p.status}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-sans font-bold text-stone-950 mb-0.5 group-hover:text-gold-700 transition-colors">
                          {p.title}
                        </h3>
                        <p className="text-xs font-sans text-gold-800 mb-2 line-clamp-1 font-semibold">
                          {p.tagline}
                        </p>
                        <p className="text-xs text-stone-600 line-clamp-2 sm:line-clamp-3 mb-3 leading-relaxed font-normal">
                          {p.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {Array.isArray(p.technologies) && p.technologies.slice(0, 4).map((tech) => (
                            <span key={tech} className="px-2 py-0.5 rounded-md bg-gold-50/90 border border-gold-400/25 text-[10px] font-sans text-stone-700">
                              {tech}
                            </span>
                          ))}
                          {p.technologies && p.technologies.length > 4 && (
                            <span className="text-[10px] font-sans text-stone-400 self-center">
                              +{p.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-gold-400/20 flex items-center justify-between">
                        <span className="text-[11px] font-sans text-stone-500 truncate max-w-[140px]">
                          {p.metrics || 'Custom metrics'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEditProject(p)}
                            type="button"
                            className="p-1.5 rounded-lg bg-gold-50/80 hover:bg-gold-100 text-stone-800 border border-gold-400/30 transition-all cursor-pointer shadow-xs"
                            title="Edit project"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-stone-700" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(p.id, p.title)}
                            type="button"
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-all cursor-pointer shadow-xs"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: EDUCATION */}
            {activeTab === 'education' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-900 text-xs font-sans font-semibold mb-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-gold-600" />
                      <span>Academic Milestones Active</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-stone-900 tracking-tight">
                      Academic Background & Education ({education.length})
                    </h2>
                    <p className="text-xs text-stone-600 font-sans mt-0.5">
                      Manage diplomas, degrees, secondary education, or upcoming academic qualifications.
                    </p>
                  </div>

                  <button
                    onClick={handleOpenAddEducation}
                    type="button"
                    className="btn-gold px-4 py-2 rounded-xl text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-gold-500/20 active:scale-98 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>+ Add Education Detail</span>
                  </button>
                </div>

                <div className="space-y-3.5">
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold-400/20 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-gold-500/15 border border-gold-400/35 text-[10px] font-sans text-gold-900 font-bold uppercase">
                            {edu.type}
                          </span>
                          <span className={`text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full border ${
                            edu.status && edu.status.toLowerCase().includes('completed')
                              ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                              : 'text-gold-900 bg-gold-500/10 border-gold-400/30'
                          }`}>
                            {edu.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEditEducation(edu)}
                            type="button"
                            className="text-xs font-sans text-stone-600 hover:text-gold-900 transition-colors inline-flex items-center gap-1.5 py-1 px-2.5 rounded-xl hover:bg-gold-50 border border-stone-200 hover:border-gold-300 cursor-pointer"
                            title="Edit in modal"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-gold-700" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteEducation(edu.id, edu.degree)}
                            type="button"
                            className="text-xs font-sans text-stone-500 hover:text-red-600 transition-colors inline-flex items-center gap-1.5 py-1 px-2.5 rounded-xl hover:bg-red-50 border border-stone-200 hover:border-red-200 cursor-pointer"
                            title="Delete education record"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                            Degree / Certification Title
                          </label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                            Institution / College
                          </label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                            Badge Category Label
                          </label>
                          <input
                            type="text"
                            value={edu.type}
                            onChange={(e) => updateEducation(edu.id, { type: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                            Time Period
                          </label>
                          <input
                            type="text"
                            value={edu.period}
                            onChange={(e) => updateEducation(edu.id, { period: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                            Status Badge Text
                          </label>
                          <input
                            type="text"
                            value={edu.status}
                            onChange={(e) => updateEducation(edu.id, { status: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                          Academic Overview Narrative
                        </label>
                        <textarea
                          rows={2}
                          value={edu.description}
                          onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 leading-relaxed shadow-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CONTACT DETAILS */}
            {activeTab === 'contact' && (
              <form onSubmit={handleSaveProfile} className="space-y-4 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-900 text-xs font-sans font-semibold mb-1.5">
                      <Phone className="w-3.5 h-3.5 text-gold-600" />
                      <span>Live Portfolio Channels Active</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-stone-900 tracking-tight">
                      Edit Contact Details & Channels
                    </h2>
                    <p className="text-xs text-stone-600 font-sans mt-0.5">
                      Manage phone, email, location, work availability pitch, and social links shown on your live portfolio.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="btn-gold px-5 py-2 rounded-xl text-stone-950 font-bold text-xs sm:text-sm font-sans uppercase tracking-wider shadow-md shadow-gold-500/20 active:scale-98 cursor-pointer shrink-0"
                  >
                    Save Changes
                  </button>
                </div>

                {/* Direct Contact Channels Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card space-y-3">
                  <h3 className="font-sans font-bold text-sm sm:text-base text-stone-900 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gold-700" />
                    <span>Direct Channels</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        Primary Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={profileForm.email || ''}
                        onChange={(e) => setProfileForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="e.g. bharathlokesh07@gmail.com"
                        className="w-full px-3.5 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                      />
                      <p className="text-[10px] text-stone-500 font-sans mt-0.5">
                        Displays on the contact card & enables 1-click email transmission.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={profileForm.phone || ''}
                        onChange={(e) => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                        placeholder="e.g. +91 9611673039"
                        className="w-full px-3.5 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                      />
                      <p className="text-[10px] text-stone-500 font-sans mt-0.5">
                        Includes 1-click call and quick copy on the public site.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        Location / City
                      </label>
                      <input
                        type="text"
                        value={profileForm.location || ''}
                        onChange={(e) => setProfileForm(p => ({ ...p, location: e.target.value }))}
                        placeholder="e.g. Tumkur, Karnataka, India"
                        className="w-full px-3.5 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                      />
                      <p className="text-[10px] text-stone-500 font-sans mt-0.5">
                        Displays with map pin on your contact section.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Profiles & Developer Links Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card space-y-3">
                  <h3 className="font-sans font-bold text-sm sm:text-base text-stone-900 flex items-center gap-2">
                    <Database className="w-4 h-4 text-gold-700" />
                    <span>Social & Professional Profiles</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        GitHub Profile URL
                      </label>
                      <input
                        type="url"
                        value={profileForm.social?.github || ''}
                        onChange={(e) => setProfileForm(p => ({
                          ...p,
                          social: { ...(p.social || {}), github: e.target.value }
                        }))}
                        placeholder="https://github.com/..."
                        className="w-full px-3.5 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        value={profileForm.social?.linkedin || ''}
                        onChange={(e) => setProfileForm(p => ({
                          ...p,
                          social: { ...(p.social || {}), linkedin: e.target.value }
                        }))}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-3.5 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        Instagram Profile URL
                      </label>
                      <input
                        type="url"
                        value={profileForm.social?.instagram || ''}
                        onChange={(e) => setProfileForm(p => ({
                          ...p,
                          social: { ...(p.social || {}), instagram: e.target.value }
                        }))}
                        placeholder="https://instagram.com/..."
                        className="w-full px-3.5 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview Box */}
                <div className="p-4 sm:p-4.5 rounded-2xl bg-warmwhite-50 border border-gold-400/30 shadow-xs">
                  <span className="block text-xs font-sans uppercase tracking-wider text-stone-500 font-semibold mb-2">
                    Live Public Portfolio Preview
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-xl bg-white border border-gold-400/25 shadow-xs flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-gold-500/10 text-gold-700">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-sans text-stone-400 uppercase">EMAIL</span>
                        <span className="block text-xs font-bold text-stone-900 truncate">{profileForm.email || 'Not set'}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-gold-400/25 shadow-xs flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-gold-500/10 text-gold-700">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-sans text-stone-400 uppercase">PHONE</span>
                        <span className="block text-xs font-bold text-stone-900 truncate">{profileForm.phone || 'Not set'}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-gold-400/25 shadow-xs flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-gold-500/10 text-gold-700">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-sans text-stone-400 uppercase">LOCATION</span>
                        <span className="block text-xs font-bold text-stone-900 truncate">{profileForm.location || 'Not set'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full btn-gold py-2.5 sm:py-3 rounded-xl text-stone-950 font-bold text-sm shadow-md shadow-gold-500/20 active:scale-[0.99] cursor-pointer"
                  >
                    Save Contact Details & Update Portfolio
                  </button>
                </div>
              </form>
            )}

            {/* TAB 6: INQUIRIES & CONTACT CHANNELS */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-900 text-xs font-sans font-semibold mb-1.5">
                      <Mail className="w-3.5 h-3.5 text-gold-600" />
                      <span>Inquiries & Messages Inbox</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-stone-900 tracking-tight">
                      Received Inquiries ({inquiries.length})
                    </h2>
                    <p className="text-xs text-stone-600 font-sans mt-0.5">
                      Real-time messages submitted by visitors on your live portfolio.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleSyncInquiries}
                      disabled={isRefreshingInquiries}
                      type="button"
                      className="px-3.5 py-1.5 rounded-xl border border-gold-400/40 hover:bg-gold-50 text-xs font-sans text-stone-800 flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98 disabled:opacity-50"
                      title="Sync inquiries from Supabase"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 text-gold-700 ${isRefreshingInquiries ? 'animate-spin' : ''}`} />
                      <span>{isRefreshingInquiries ? 'Syncing...' : 'Sync Now'}</span>
                    </button>
                  </div>
                </div>

                {/* Inquiries Inbox */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card space-y-3">
                  <div className="flex items-center justify-between pb-2.5 border-b border-gold-400/20">
                    <h3 className="font-sans font-bold text-sm sm:text-base text-stone-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gold-700" />
                      <span>Inbox Messages</span>
                    </h3>
                    <span className="text-xs font-sans text-stone-500">
                      {inquiries.filter(i => !i.read).length} unread
                    </span>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-gold-400/30 rounded-2xl bg-warmwhite-50/70 p-4">
                      <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-700 flex items-center justify-center mx-auto mb-2 border border-gold-400/30">
                        <Mail className="w-5 h-5" />
                      </div>
                      <h4 className="font-sans font-bold text-stone-900 text-sm mb-0.5">
                        No inquiries received yet
                      </h4>
                      <p className="text-xs font-sans text-stone-500 max-w-sm mx-auto">
                        When visitors fill out the "Let's Build Something New" form on your portfolio, their messages appear right here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                            inq.read
                              ? 'bg-warmwhite-50/80 border-gold-400/20'
                              : 'bg-white border-gold-400/50 shadow-sm ring-1 ring-gold-400/20'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 mb-1.5">
                            <div className="flex items-center gap-2">
                              {!inq.read ? (
                                <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0 shadow-xs" title="Unread" />
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-stone-300 shrink-0" title="Read" />
                              )}
                              <span className="font-bold text-xs sm:text-sm text-stone-900">{inq.name}</span>
                              <a
                                href={`mailto:${inq.email}`}
                                className="text-xs font-sans text-gold-800 hover:text-gold-950 underline decoration-gold-400/40 truncate max-w-[200px]"
                              >
                                {inq.email}
                              </a>
                            </div>
                            <span className="text-[10px] font-sans text-stone-400">
                              {inq.date ? new Date(inq.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : 'Recent'}
                            </span>
                          </div>

                          {inq.subject && (
                            <div className="mb-1.5">
                              <span className="inline-block px-2 py-0.5 rounded-md bg-gold-500/10 border border-gold-400/25 text-[10px] font-sans font-bold text-gold-900 uppercase tracking-wider">
                                {inq.subject}
                              </span>
                            </div>
                          )}

                          <div className="p-3 rounded-lg bg-warmwhite-100/60 border border-gold-400/20 text-xs text-stone-800 leading-relaxed font-normal mb-2 whitespace-pre-wrap">
                            {inq.message}
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pt-1.5 border-t border-gold-400/15">
                            <a
                              href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject || 'Portfolio Inquiry')}&body=Hi ${encodeURIComponent(inq.name)},%0D%0A%0D%0AThank you for reaching out via my portfolio.%0D%0A%0D%0ABest regards,%0D%0ABharath Lokesh`}
                              className="text-xs font-sans font-bold text-stone-900 hover:text-gold-800 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-gold-400/30 hover:border-gold-500 transition-all shadow-xs cursor-pointer"
                            >
                              <Mail className="w-3.5 h-3.5 text-gold-600" />
                              <span>Reply via Email</span>
                            </a>

                            {!inq.read && (
                              <button
                                onClick={() => markInquiryRead(inq.id)}
                                type="button"
                                className="text-xs font-sans text-gold-800 hover:text-gold-950 font-bold cursor-pointer px-2 py-1 rounded-lg hover:bg-gold-50 transition-colors"
                              >
                                ✓ Mark as Read
                              </button>
                            )}

                            <button
                              onClick={() => deleteInquiry(inq.id)}
                              type="button"
                              className="text-xs font-sans text-red-600 hover:text-red-700 cursor-pointer px-2 py-1 rounded-lg hover:bg-red-50 transition-colors ml-auto"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Direct Contact Channels Form */}
                <form onSubmit={handleSaveProfile} className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card space-y-3">
                  <h3 className="font-sans font-bold text-sm sm:text-base text-stone-900 mb-1">
                    Direct Contact Channels & Socials
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        Primary Email
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-3.5 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                        className="w-full px-3.5 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm(p => ({ ...p, location: e.target.value }))}
                        className="w-full px-3.5 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        GitHub Profile URL
                      </label>
                      <input
                        type="url"
                        value={profileForm.social?.github || ''}
                        onChange={(e) => setProfileForm(p => ({ ...p, social: { ...p.social, github: e.target.value } }))}
                        className="w-full px-3.5 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        value={profileForm.social?.linkedin || ''}
                        onChange={(e) => setProfileForm(p => ({ ...p, social: { ...p.social, linkedin: e.target.value } }))}
                        className="w-full px-3.5 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        Instagram Profile URL
                      </label>
                      <input
                        type="url"
                        value={profileForm.social?.instagram || ''}
                        onChange={(e) => setProfileForm(p => ({ ...p, social: { ...p.social, instagram: e.target.value } }))}
                        className="w-full px-3.5 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs sm:text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-gold px-4 py-2 rounded-xl text-stone-950 font-bold text-xs font-sans uppercase tracking-wider shadow-sm cursor-pointer"
                  >
                    Save Contact Channels
                  </button>
                </form>
              </div>
            )}

            {/* TAB 7: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card">
                  <h2 className="text-base sm:text-lg font-sans font-bold text-stone-900 mb-0.5">
                    Security & System Settings
                  </h2>
                  <p className="text-xs text-stone-600 font-sans">
                    Update your admin login ID, password credentials, and download full portfolio backup archives.
                  </p>
                </div>

                {/* Admin Login Credentials Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card">
                  <div className="flex items-center gap-2 mb-1.5">
                    <KeyRound className="w-4 h-4 text-gold-700" />
                    <h3 className="text-sm sm:text-base font-sans font-bold text-stone-900">
                      Admin Login Credentials
                    </h3>
                  </div>
                  <p className="text-xs text-stone-600 font-sans mb-4">
                    Update the registered Gmail address and password required to log in to your /admin console.
                  </p>

                  {passwordFeedback.text && (
                    <div className={`p-2.5 rounded-xl mb-3 text-xs font-sans ${
                      passwordFeedback.type === 'error'
                        ? 'bg-red-50 border border-red-200 text-red-700'
                        : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    }`}>
                      {passwordFeedback.text}
                    </div>
                  )}

                  <form onSubmit={handleUpdateCredentials} className="space-y-3 max-w-md">
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        Admin Login ID (Gmail / Email) *
                      </label>
                      <input
                        type="email"
                        required
                        value={accountEmail}
                        onChange={(e) => setAccountEmail(e.target.value)}
                        placeholder="bharathlokesh07@gmail.com"
                        className="w-full px-3.5 py-2 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                      />
                      <span className="text-[10px] font-sans text-stone-500 mt-0.5 block">
                        Current Login ID: <strong className="text-stone-800">{adminEmail}</strong>
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        Current Password * (to authorize changes)
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        className="w-full px-3.5 py-2 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                        New Password (optional)
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Leave blank to keep existing password"
                        className="w-full px-3.5 py-2 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                      />
                    </div>

                    {newPassword && (
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter new password"
                          className="w-full px-3.5 py-2 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn-gold px-4 py-2 rounded-xl text-stone-950 font-bold text-xs font-sans uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      Save Admin Credentials
                    </button>
                  </form>
                </div>

                {/* Backup & Factory Reset */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card space-y-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-sans font-bold text-stone-900 mb-0.5">
                      Backup, Restore & Reset
                    </h3>
                    <p className="text-xs text-stone-600 font-sans">
                      Export all your customized data as a single JSON file or reset everything back to original portfolio defaults.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={handleExportBackup}
                      type="button"
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-gold-50 border border-gold-400/35 text-xs font-sans text-stone-800 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-gold-700" />
                      <span>Download JSON Backup</span>
                    </button>

                    <label className="px-3.5 py-2 rounded-xl bg-white hover:bg-gold-50 border border-gold-400/35 text-xs font-sans text-stone-800 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs">
                      <Upload className="w-3.5 h-3.5 text-gold-700" />
                      <span>Restore from Backup</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportBackup}
                        className="hidden"
                      />
                    </label>

                    <button
                      onClick={handleResetDefaults}
                      type="button"
                      className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-sans text-red-700 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Factory Defaults</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* ======================================================== */}
      {/* ADD / EDIT PROJECT MODAL */}
      {/* ======================================================== */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-white border border-gold-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-gold-900/20 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gold-400/20">
              <h3 className="text-lg font-sans font-bold text-stone-900">
                {editingProjectId ? 'Edit Project Details' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                type="button"
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-900 hover:bg-gold-500/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Autonomous Edge Rover"
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    list="category-options"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm(p => ({ ...p, category: e.target.value }))}
                    placeholder="Select or type category"
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                  <datalist id="category-options">
                    {categories.filter(c => c && c !== 'All').map(c => (
                      <option key={c} value={c} />
                    ))}
                    <option value="IoT / Automation" />
                    <option value="AI / Computer Vision" />
                    <option value="IoT / Web Development" />
                    <option value="Robotics / Embedded" />
                  </datalist>
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                  Tagline / Subheading
                </label>
                <input
                  type="text"
                  value={projectForm.tagline}
                  onChange={(e) => setProjectForm(p => ({ ...p, tagline: e.target.value }))}
                  placeholder="e.g. Hardware Troubleshooting & System Restoration"
                  className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Describe the problem, technologies used, and final results..."
                  className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 leading-relaxed shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm(p => ({ ...p, technologies: e.target.value }))}
                    placeholder="e.g. ESP32, Python, MQTT, React"
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Key Metric / Outcome
                  </label>
                  <input
                    type="text"
                    value={projectForm.metrics}
                    onChange={(e) => setProjectForm(p => ({ ...p, metrics: e.target.value }))}
                    placeholder="e.g. Sub-second Verification"
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Project Status
                  </label>
                  <input
                    type="text"
                    value={projectForm.status}
                    onChange={(e) => setProjectForm(p => ({ ...p, status: e.target.value }))}
                    placeholder="e.g. Production Ready"
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    GitHub Repo URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm(p => ({ ...p, githubUrl: e.target.value }))}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Live Demo URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm(p => ({ ...p, liveUrl: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gold-400/20">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-xs font-sans text-stone-700 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-6 py-2.5 rounded-xl text-stone-950 font-bold text-xs font-sans uppercase tracking-wider transition-all shadow-md shadow-gold-500/20 cursor-pointer"
                >
                  {editingProjectId ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ADD TECHNICAL SKILL MODAL (Clean, Dedicated & Full-Featured) */}
      {/* ======================================================== */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-gold-400/40 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gold-400/20 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gold-500/15 text-gold-800 border border-gold-400/30">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-sans font-bold text-stone-900">
                    Add Technical Skill
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">
                    Add a new competency to your portfolio matrix
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSkillModalOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSkillModal} className="space-y-5">
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-2">
                  Target Domain / Category
                </label>
                <select
                  value={skillModalForm.categoryId}
                  onChange={(e) => setSkillModalForm(s => ({ ...s, categoryId: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs cursor-pointer"
                >
                  {skills.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title} ({cat.skills.length} skills)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-2">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. PyTorch, Docker, OpenCV, Tailwind CSS"
                  value={skillModalForm.name}
                  onChange={(e) => setSkillModalForm(s => ({ ...s, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-2">
                  Specialization / Subtitle (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Deep Learning, Containerization, Image Processing"
                  value={skillModalForm.detail}
                  onChange={(e) => setSkillModalForm(s => ({ ...s, detail: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                />
              </div>

              {/* Live Preview Pill */}
              <div className="p-4 rounded-2xl bg-warmwhite-50 border border-gold-400/25">
                <span className="block text-[10px] font-sans uppercase tracking-wider text-stone-500 font-semibold mb-2">
                  Live Badge Preview
                </span>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gold-50/80 border border-gold-400/30 text-xs font-sans text-stone-900 shadow-xs">
                  <span className="font-bold">{skillModalForm.name.trim() || 'Skill Name'}</span>
                  <span className="text-[10px] text-stone-500 font-normal">
                    ({skillModalForm.detail.trim() || 'Core Competency'})
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gold-400/20">
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-xs font-sans text-stone-700 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-6 py-2.5 rounded-xl text-stone-950 font-bold text-xs font-sans uppercase tracking-wider transition-all shadow-md shadow-gold-500/20 cursor-pointer"
                >
                  + Add Skill to Matrix
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ADD / EDIT EDUCATION MODAL */}
      {/* ======================================================== */}
      {isEducationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-gold-400/40 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gold-400/20 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gold-500/15 text-gold-800 border border-gold-400/30">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-sans font-bold text-stone-900">
                    {editingEducationId ? 'Edit Education Record' : 'Add Education Record'}
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">
                    {editingEducationId ? 'Modify academic milestone details' : 'Add a new academic milestone to your portfolio timeline'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEducationModalOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEducation} className="space-y-4">
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                  Academic Category / Type
                </label>
                <input
                  type="text"
                  list="edu-type-options"
                  value={educationForm.type}
                  onChange={(e) => setEducationForm(f => ({ ...f, type: e.target.value }))}
                  placeholder="e.g. BACHELOR'S DEGREE (B.E / B.TECH)"
                  className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                />
                <datalist id="edu-type-options">
                  <option value="BACHELOR'S DEGREE (B.E / B.TECH)" />
                  <option value="DIPLOMA SPECIALIZATION" />
                  <option value="HIGHER SECONDARY (PUC / 12TH)" />
                  <option value="SECONDARY EDUCATION (SSLC)" />
                  <option value="CERTIFICATION & PROFESSIONAL SPECIALIZATION" />
                </datalist>
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                  Degree / Program Title *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. B.Tech in Artificial Intelligence & Machine Learning"
                  value={educationForm.degree}
                  onChange={(e) => setEducationForm(f => ({ ...f, degree: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                  Institution / College / University *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Visvesvaraya Technological University (VTU) / College Name"
                  value={educationForm.institution}
                  onChange={(e) => setEducationForm(f => ({ ...f, institution: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Time Period
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2027 - 2030"
                    value={educationForm.period}
                    onChange={(e) => setEducationForm(f => ({ ...f, period: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Status Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Active Program / Completed / Upcoming"
                    value={educationForm.status}
                    onChange={(e) => setEducationForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                  Academic Overview Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief description of the curriculum, core focus areas, and engineering competencies..."
                  value={educationForm.description}
                  onChange={(e) => setEducationForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-sans focus:outline-none focus:border-gold-500 shadow-xs leading-relaxed"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gold-400/20">
                <button
                  type="button"
                  onClick={() => setIsEducationModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-xs font-sans text-stone-700 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-6 py-2.5 rounded-xl text-stone-950 font-bold text-xs font-sans uppercase tracking-wider transition-all shadow-md shadow-gold-500/20 cursor-pointer"
                >
                  {editingEducationId ? 'Save Changes' : '+ Add Education Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
