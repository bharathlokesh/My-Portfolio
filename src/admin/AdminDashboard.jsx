import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import profileImg from '../assets/profile.jpg';
import {
  FolderKanban,
  Wrench,
  UserCheck,
  Shield,
  Plus,
  Trash2,
  Edit3,
  LogOut,
  RotateCcw,
  Download,
  Upload,
  Check,
  X,
  Search,
  KeyRound,
  Database,
  ArrowUpRight,
  Layers,
  Settings,
  Camera,
  UploadCloud,
  ChevronDown
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    projects,
    categories,
    skills,
    profile,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    deleteSkill,
    updateProfile,
    resetToDefaults,
    exportData,
    importData
  } = usePortfolio();

  const { logout, updateCredentials, adminEmail } = useAuth();

  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'skills' | 'profile' | 'settings'
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

  // Settings & Account Dropdown Menu State
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const settingsMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target)) {
        setIsSettingsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Handle Add Skill
  const handleAddSkill = (categoryId) => {
    const input = newSkillForm[categoryId];
    if (!input || !input.name || !input.name.trim()) return;

    addSkill(categoryId, {
      name: input.name.trim(),
      detail: (input.detail && input.detail.trim()) || 'Core Competency'
    });

    setNewSkillForm(prev => ({
      ...prev,
      [categoryId]: { name: '', detail: '' }
    }));
    showToast(`Added skill to ${categoryId}`);
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
        // Resize to max 400x400 to ensure fast load and safe localStorage fit
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
        showToast('Photo selected! Click "Save Changes" to update your portfolio.');
      };
      img.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Handle Save Profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast('Profile and contact details updated!');
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
    if (window.confirm('Are you sure you want to restore the original portfolio data? All custom modifications will be reset.')) {
      resetToDefaults();
      setProfileForm({ ...profile, profileImage: '' });
      showToast('Restored original factory defaults!');
    }
  };

  // Filter projects by search
  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(projectSearch.toLowerCase()) ||
    (p.technologies && p.technologies.some(t => t.toLowerCase().includes(projectSearch.toLowerCase())))
  );

  const activeAvatar = profileForm.profileImage || profile.profileImage || profileImg;

  return (
    <div className="min-h-screen bg-warmwhite-200 text-stone-900 selection:bg-gold-500/20 selection:text-gold-900 font-sans pb-16 relative">
      
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

      {/* Top Navigation Header - Light Gold & White Luxury Glass */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-gold-400/25 px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-xs">
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
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-stone-900 font-display block">
              {profile.name || 'BHARATH LOKESH'}
            </span>
          </div>
        </div>

        {/* Header Right Actions: Live Portfolio | Merged Settings & Account Menu */}
        <div className="flex items-center gap-2">
          {/* 1. Live Portfolio Button */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-7 sm:h-7.5 px-2.5 sm:px-3 rounded-lg border border-gold-400/30 hover:border-gold-500 hover:bg-gold-50/80 bg-white/80 text-[11px] font-mono font-medium text-stone-700 hover:text-stone-950 transition-all inline-flex items-center gap-1.5 shadow-xs"
            title="Open Live Portfolio in new tab"
          >
            <span>Live Portfolio</span>
            <ArrowUpRight className="w-3 h-3 text-gold-600 shrink-0" />
          </Link>

          {/* 2. Merged Settings & Account Menu Button */}
          <div className="relative" ref={settingsMenuRef}>
            <button
              onClick={() => setIsSettingsMenuOpen(prev => !prev)}
              type="button"
              className={`h-7 sm:h-7.5 px-2.5 sm:px-3 rounded-lg border text-[11px] font-mono font-medium transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs ${
                isSettingsMenuOpen || activeTab === 'settings'
                  ? 'bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 text-stone-950 border-gold-400 font-bold shadow-xs'
                  : 'border-gold-400/30 hover:border-gold-500 hover:bg-gold-50/80 bg-white/80 text-stone-700 hover:text-stone-950'
              }`}
              title="Settings & Account Options"
              aria-expanded={isSettingsMenuOpen}
            >
              <Settings className="w-3.5 h-3.5 text-gold-800 shrink-0" />
              <span>Settings</span>
              <ChevronDown className={`w-3 h-3 text-stone-500 transition-transform duration-200 ${isSettingsMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isSettingsMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-white/98 rounded-2xl border border-gold-400/40 shadow-xl shadow-gold-900/10 p-1.5 z-50 animate-in fade-in zoom-in-95 backdrop-blur-xl">
                {/* Account Header */}
                <div className="px-3 py-2 border-b border-gold-400/20 mb-1">
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block font-semibold">
                    Admin Account
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-900 truncate block">
                    {adminEmail || 'bharathlokesh07@gmail.com'}
                  </span>
                </div>

                {/* Option 1: Security & Settings */}
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setIsSettingsMenuOpen(false);
                  }}
                  type="button"
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-gold-500/15 text-gold-950 font-bold border border-gold-400/30'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-gold-50/80'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5 text-gold-700 shrink-0" />
                  <span>Security & Settings</span>
                </button>

                {/* Divider */}
                <div className="my-1 border-t border-gold-400/15" />

                {/* Option 2: Log Out with confirmation */}
                <button
                  onClick={() => {
                    setIsSettingsMenuOpen(false);
                    handleLogout();
                  }}
                  type="button"
                  className="w-full px-3 py-2 rounded-xl text-xs font-mono text-red-600 hover:text-red-700 hover:bg-red-50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 shrink-0" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        
        {/* Navigation Tabs (Pills) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/90 border border-gold-400/30 rounded-2xl mb-8 max-w-fit shadow-sm">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 text-stone-950 font-bold shadow-md shadow-gold-600/20'
                : 'text-stone-600 hover:text-stone-950 hover:bg-gold-50/80'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Projects</span>
            <span className={`px-2 py-0.2 rounded-full text-[10px] ${activeTab === 'projects' ? 'bg-stone-950/10 text-stone-950' : 'bg-stone-100 text-stone-600'}`}>
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'skills'
                ? 'bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 text-stone-950 font-bold shadow-md shadow-gold-600/20'
                : 'text-stone-600 hover:text-stone-950 hover:bg-gold-50/80'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Skills Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 text-stone-950 font-bold shadow-md shadow-gold-600/20'
                : 'text-stone-600 hover:text-stone-950 hover:bg-gold-50/80'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Profile & Contact</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: PROJECTS MANAGER */}
        {/* ======================================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search projects by title, category, or tech..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-warmwhite-50 border border-gold-400/30 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-500 transition-all font-mono shadow-xs"
                />
              </div>

              <button
                onClick={handleOpenAddProject}
                type="button"
                className="btn-gold px-5 py-2.5 rounded-xl text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-gold-500/20 active:scale-98 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-white/95 border border-gold-400/30 hover:border-gold-400/60 transition-all flex flex-col justify-between group shadow-gold-card hover:shadow-glow-gold-sm"
                >
                  <div>
                    {/* Category & Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md bg-gold-500/15 border border-gold-400/35 text-[11px] font-mono text-gold-900 font-bold uppercase tracking-wider">
                        {p.category}
                      </span>
                      <span className="text-[10px] font-mono text-stone-500 font-semibold">
                        {p.status}
                      </span>
                    </div>

                    <h3 className="text-base font-display font-bold text-stone-950 mb-1 group-hover:text-gold-700 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs font-mono text-gold-800 mb-3 line-clamp-1 font-semibold">
                      {p.tagline}
                    </p>
                    <p className="text-xs text-stone-600 line-clamp-3 mb-4 leading-relaxed font-normal">
                      {p.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {Array.isArray(p.technologies) && p.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded-md bg-gold-50/90 border border-gold-400/25 text-[10px] font-mono text-stone-700">
                          {tech}
                        </span>
                      ))}
                      {p.technologies && p.technologies.length > 4 && (
                        <span className="text-[10px] font-mono text-stone-400 self-center">
                          +{p.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-gold-400/20 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-stone-500">
                      {p.metrics || 'Custom metrics'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditProject(p)}
                        type="button"
                        className="p-2 rounded-lg bg-gold-50/80 hover:bg-gold-100 text-stone-800 border border-gold-400/30 transition-all cursor-pointer shadow-xs"
                        title="Edit project"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-stone-700" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p.id, p.title)}
                        type="button"
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-all cursor-pointer shadow-xs"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12 border border-gold-400/30 rounded-2xl bg-white/90 shadow-sm">
                <Layers className="w-8 h-8 text-gold-500/50 mx-auto mb-2" />
                <p className="text-sm font-mono text-stone-600">No projects found matching your search.</p>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: SKILLS MATRIX MANAGER */}
        {/* ======================================================== */}
        {activeTab === 'skills' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card">
              <h2 className="text-lg font-display font-bold text-stone-900 mb-1">
                Technical Skills Matrix
              </h2>
              <p className="text-xs text-stone-600 font-mono">
                Add, manage, or delete technical competencies across your 5 core domains.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-gold-400/20">
                      <h3 className="font-display font-bold text-base text-stone-900 flex items-center gap-2">
                        <span>{cat.title}</span>
                      </h3>
                      <span className="text-[11px] font-mono text-stone-500 font-semibold">
                        {cat.skills.length} skills listed
                      </span>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {cat.skills.map((s) => (
                        <div
                          key={s.name}
                          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gold-50/80 border border-gold-400/30 text-xs font-mono text-stone-900 hover:border-gold-400/60 shadow-xs transition-all"
                        >
                          <div>
                            <span className="font-bold">{s.name}</span>
                            <span className="text-[10px] text-stone-500 ml-1.5 font-normal">({s.detail})</span>
                          </div>
                          <button
                            onClick={() => deleteSkill(cat.id, s.name)}
                            type="button"
                            className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                            title={`Remove ${s.name}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inline Add Skill Form */}
                  <div className="pt-4 border-t border-gold-400/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      placeholder="Skill name (e.g. Next.js)"
                      value={newSkillForm[cat.id]?.name || ''}
                      onChange={(e) => setNewSkillForm(prev => ({
                        ...prev,
                        [cat.id]: { ...(prev[cat.id] || {}), name: e.target.value }
                      }))}
                      className="px-3 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-500 font-mono flex-1 shadow-xs"
                    />
                    <input
                      type="text"
                      placeholder="Detail (e.g. App Router)"
                      value={newSkillForm[cat.id]?.detail || ''}
                      onChange={(e) => setNewSkillForm(prev => ({
                        ...prev,
                        [cat.id]: { ...(prev[cat.id] || {}), detail: e.target.value }
                      }))}
                      className="px-3 py-1.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-500 font-mono flex-1 shadow-xs"
                    />
                    <button
                      onClick={() => handleAddSkill(cat.id)}
                      type="button"
                      className="btn-gold px-4 py-1.5 rounded-xl text-stone-950 font-bold text-xs shadow-xs cursor-pointer shrink-0"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: PROFILE & CONTACT MANAGER */}
        {/* ======================================================== */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
            <div className="p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card flex items-center justify-between">
              <div>
                <h2 className="text-lg font-display font-bold text-stone-900 mb-1">
                  Profile & Contact Channels
                </h2>
                <p className="text-xs text-stone-600 font-mono">
                  Modify your profile photo, personal titles, contact channels, bio narrative, and social URLs.
                </p>
              </div>
              <button
                type="submit"
                className="btn-gold px-5 py-2.5 rounded-xl text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-gold-500/20 active:scale-98 cursor-pointer"
              >
                Save Changes
              </button>
            </div>

            {/* Profile Photo Upload & Management Card */}
            <div className="p-6 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  {/* Photo Preview Circle */}
                  <div className="relative group shrink-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-gold-400/60 shadow-lg shadow-gold-500/15 bg-gold-100 flex items-center justify-center">
                      <img
                        src={activeAvatar}
                        alt={profileForm.name || "Profile Photo"}
                        className="w-full h-full object-cover object-[center_28%]"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 p-2 rounded-full bg-gradient-to-r from-gold-400 to-amber-500 text-stone-950 border-2 border-white shadow-md">
                      <Camera className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-display font-bold text-stone-900 mb-0.5">
                      Profile Photo
                    </h3>
                    <p className="text-xs text-stone-500 font-mono mb-2">
                      Active across your portfolio navbar and admin console.
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-semibold">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>{profileForm.profileImage ? 'Custom Photo Active' : 'Default Photo Active (profile.jpg)'}</span>
                    </span>
                  </div>
                </div>

                {/* Upload & Reset Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <label className="btn-gold px-4 py-2.5 rounded-xl text-stone-950 font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-98">
                    <UploadCloud className="w-4 h-4" />
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
                      className="px-3.5 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-mono text-stone-600 transition-all cursor-pointer shadow-xs"
                    >
                      Reset to Default
                    </button>
                  )}
                </div>
              </div>

              {/* Optional Direct URL input */}
              <div className="mt-5 pt-4 border-t border-gold-400/20">
                <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                  Or Paste External Image URL
                </label>
                <input
                  type="url"
                  value={profileForm.profileImage || ''}
                  onChange={(e) => setProfileForm(p => ({ ...p, profileImage: e.target.value }))}
                  placeholder="https://example.com/my-photo.jpg (or upload file above)"
                  className="w-full px-4 py-2 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-xs text-stone-900 font-mono focus:outline-none focus:border-gold-500 shadow-xs"
                />
              </div>
            </div>

            {/* Profile Info Cards */}
            <div className="p-6 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-4">
                Identity & Headings
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-2">
                    Full Name (Hero Display)
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-2">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm(p => ({ ...p, title: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-2">
                  Hero Short Tagline Bio
                </label>
                <textarea
                  rows={2}
                  value={profileForm.heroBio}
                  onChange={(e) => setProfileForm(p => ({ ...p, heroBio: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 leading-relaxed shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-2">
                  About Section Detailed Bio
                </label>
                <textarea
                  rows={3}
                  value={profileForm.aboutBio}
                  onChange={(e) => setProfileForm(p => ({ ...p, aboutBio: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 leading-relaxed shadow-xs"
                />
              </div>
            </div>

            {/* Direct Contact Channels */}
            <div className="p-6 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-4">
                Direct Contact Channels
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-2">
                    Primary Email
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm(p => ({ ...p, location: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-4">
                Social Profiles & Networks
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-2">
                    GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.social?.github || ''}
                    onChange={(e) => setProfileForm(p => ({
                      ...p,
                      social: { ...p.social, github: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-2">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.social?.linkedin || ''}
                    onChange={(e) => setProfileForm(p => ({
                      ...p,
                      social: { ...p.social, linkedin: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-2">
                    Instagram Profile URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.social?.instagram || ''}
                    onChange={(e) => setProfileForm(p => ({
                      ...p,
                      social: { ...p.social, instagram: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-gold w-full py-3.5 rounded-xl text-stone-950 font-bold text-sm transition-all shadow-md shadow-gold-500/20 hover:shadow-gold-500/30 cursor-pointer"
              >
                Save All Profile & Contact Changes
              </button>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* TAB 4: SECURITY & SETTINGS */}
        {/* ======================================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
            {/* Settings Top Header with Back button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-700 border border-gold-400/30">
                  <Shield className="w-5 h-5 text-gold-700" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-bold text-stone-900">
                    Security & System Settings
                  </h2>
                  <p className="text-xs text-stone-600 font-mono">
                    Manage your admin password, backup archives, factory resets, and database options.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('projects')}
                type="button"
                className="px-3.5 py-2 rounded-xl border border-gold-400/30 hover:border-gold-500 hover:bg-gold-50 text-xs font-mono text-stone-700 hover:text-stone-950 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
              >
                <span>← Back to Dashboard</span>
              </button>
            </div>
            
            {/* Admin Login Credentials Card */}
            <div className="p-6 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card">
              <div className="flex items-center gap-2 mb-2">
                <KeyRound className="w-5 h-5 text-gold-700" />
                <h2 className="text-base font-display font-bold text-stone-900">
                  Admin Login Credentials
                </h2>
              </div>
              <p className="text-xs text-stone-600 font-mono mb-6">
                Update the registered Gmail address and password required to log in to your /admin console.
              </p>

              {passwordFeedback.text && (
                <div className={`p-3 rounded-xl mb-4 text-xs font-mono ${
                  passwordFeedback.type === 'error'
                    ? 'bg-red-50 border border-red-200 text-red-700'
                    : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                }`}>
                  {passwordFeedback.text}
                </div>
              )}

              <form onSubmit={handleUpdateCredentials} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Registered Admin Gmail / Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={accountEmail}
                    onChange={(e) => setAccountEmail(e.target.value)}
                    placeholder="bharathlokesh07@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                  <span className="text-[10px] font-mono text-stone-500 mt-1 block">
                    Current login email: <strong className="text-stone-800">{adminEmail}</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Current Password * (to authorize changes)
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    New Password (optional)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Leave blank to keep existing password"
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                {newPassword && (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-gold px-5 py-2.5 rounded-xl text-stone-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  Save Admin Credentials
                </button>
              </form>
            </div>

            {/* Backup & Factory Reset */}
            <div className="p-6 rounded-2xl bg-white/95 border border-gold-400/30 shadow-gold-card space-y-6">
              <div>
                <h3 className="text-base font-display font-bold text-stone-900 mb-1">
                  Backup, Restore & Reset
                </h3>
                <p className="text-xs text-stone-600 font-mono">
                  Export all your customized data as a single JSON file or reset everything back to original portfolio defaults.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleExportBackup}
                  type="button"
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-gold-50 border border-gold-400/35 text-xs font-mono text-stone-800 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4 text-gold-700" />
                  <span>Download JSON Backup</span>
                </button>

                <label className="px-4 py-2.5 rounded-xl bg-white hover:bg-gold-50 border border-gold-400/35 text-xs font-mono text-stone-800 flex items-center gap-2 transition-all cursor-pointer shadow-sm">
                  <Upload className="w-4 h-4 text-gold-700" />
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
                  className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-mono text-red-700 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>
            </div>

            {/* Cloud Database (Supabase) Integration Notes */}
            <div className="p-6 rounded-2xl bg-gold-50/60 border border-gold-400/30 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-gold-700" />
                <h3 className="text-base font-display font-bold text-stone-900">
                  Cloud Database Sync Ready
                </h3>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                Currently, your changes are instantly saved to your browser's persistent storage. If you want multi-device cloud synchronization via Supabase later, simply create a free Supabase project and add <code className="text-gold-900 bg-white px-1.5 py-0.5 rounded border border-gold-400/30 font-bold">VITE_SUPABASE_URL</code> and <code className="text-gold-900 bg-white px-1.5 py-0.5 rounded border border-gold-400/30 font-bold">VITE_SUPABASE_ANON_KEY</code> to your environment variables.
              </p>
            </div>

          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* ADD / EDIT PROJECT MODAL */}
      {/* ======================================================== */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-white border border-gold-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-gold-900/20 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gold-400/20">
              <h3 className="text-lg font-display font-bold text-stone-900">
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Autonomous Edge Rover"
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    list="category-options"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm(p => ({ ...p, category: e.target.value }))}
                    placeholder="Select or type category"
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
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
                <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                  Tagline / Subheading
                </label>
                <input
                  type="text"
                  value={projectForm.tagline}
                  onChange={(e) => setProjectForm(p => ({ ...p, tagline: e.target.value }))}
                  placeholder="e.g. Hardware Troubleshooting & System Restoration"
                  className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Describe the problem, technologies used, and final results..."
                  className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 leading-relaxed shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm(p => ({ ...p, technologies: e.target.value }))}
                    placeholder="e.g. ESP32, Python, MQTT, React"
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Key Metric / Outcome
                  </label>
                  <input
                    type="text"
                    value={projectForm.metrics}
                    onChange={(e) => setProjectForm(p => ({ ...p, metrics: e.target.value }))}
                    placeholder="e.g. Sub-second Verification"
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Project Status
                  </label>
                  <input
                    type="text"
                    value={projectForm.status}
                    onChange={(e) => setProjectForm(p => ({ ...p, status: e.target.value }))}
                    placeholder="e.g. Production Ready"
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    GitHub Repo URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm(p => ({ ...p, githubUrl: e.target.value }))}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-1.5">
                    Live Demo URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm(p => ({ ...p, liveUrl: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-sm text-stone-900 font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-xs"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gold-400/20">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-xs font-mono text-stone-700 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-6 py-2.5 rounded-xl text-stone-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-md shadow-gold-500/20 cursor-pointer"
                >
                  {editingProjectId ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
