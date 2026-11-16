import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as defaultProjects } from '../data/projects';
import { fetchInquiries, deleteInquiryCloud, markInquiryReadCloud } from '../services/inquiryService';

const PortfolioContext = createContext(null);

const DEFAULT_PROFILE = {
  name: 'BHARATH LOKESH',
  title: 'AI & ML DEVELOPER',
  profileImage: '',
  heroBio: 'Specializing in Machine Learning, Computer Vision, and connected IoT systems — engineering intelligent solutions from embedded edge to the web.',
  aboutTitle: 'Passionate AI, ML & IoT Explorer',
  aboutBio: 'I combine artificial intelligence, embedded systems, IoT, and modern web technologies to design and develop automation systems that connect intelligent software with the physical world.',
  email: 'bharathlokesh07@gmail.com',
  phone: '+91 9611673039',
  location: 'Tumkur, Karnataka, India',
  social: {
    github: 'https://github.com/bharathlokesh',
    linkedin: 'https://www.linkedin.com/in/bharath-lokesh07/?isSelfProfile=true',
    instagram: 'https://www.instagram.com/bhrrtth/'
  }
};

const DEFAULT_SKILLS = [
  {
    id: 'programming',
    title: 'Programming',
    skills: [
      { name: 'Python', detail: 'ML & Scripting' },
      { name: 'C Programming', detail: 'Systems & Low-Level' },
      { name: 'C++', detail: 'Embedded & Performance' },
      { name: 'Java', detail: 'OOP & Core Logic' }
    ]
  },
  {
    id: 'web',
    title: 'Web',
    skills: [
      { name: 'HTML', detail: 'Semantic Markup' },
      { name: 'CSS', detail: 'Modern Styling' },
      { name: 'JavaScript', detail: 'Dynamic Logic' },
      { name: 'React', detail: 'Component Architecture' }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI / ML',
    skills: [
      { name: 'Machine Learning', detail: 'Models & Inference' },
      { name: 'Computer Vision', detail: 'Image Processing & Recognition' },
      { name: 'Data Analysis', detail: 'Insights & Preprocessing' }
    ]
  },
  {
    id: 'iot',
    title: 'IoT',
    skills: [
      { name: 'ESP32', detail: 'Wi-Fi & Microcontroller' },
      { name: 'Arduino', detail: 'Hardware Prototyping' },
      { name: 'MQTT', detail: 'Lightweight Messaging' },
      { name: 'Sensors', detail: 'Environmental & Telemetry' }
    ]
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: [
      { name: 'Git', detail: 'Version Control' },
      { name: 'GitHub', detail: 'Repo Management' },
      { name: 'VS Code', detail: 'Development Environment' },
      { name: 'Jupyter', detail: 'Notebooks & Exploration' }
    ]
  }
];

const DEFAULT_EDUCATION = [
  {
    id: 'diploma-aiml',
    type: 'DIPLOMA SPECIALIZATION',
    degree: 'Diploma in AI & Machine Learning',
    institution: 'Government Tool Room and Training Centre (GTTC), Magadi',
    period: '2023 - 2027',
    status: 'Active Program',
    description: 'Diploma studies focused on programming, artificial intelligence, machine learning and emerging technologies.',
    highlights: [
      { title: 'Core Programming', desc: 'Python, C, C++, Java, Object-Oriented Design' },
      { title: 'Machine Learning', desc: 'Supervised/Unsupervised Learning, Neural Nets' },
      { title: 'Computer Vision', desc: 'OpenCV, Image Processing & Pattern Recognition' },
      { title: 'IoT Systems', desc: 'Microcontrollers, Sensor Interfacing & MQTT' }
    ]
  },
  {
    id: 'sslc',
    type: 'SECONDARY EDUCATION (SSLC)',
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'Mahathma Gandhi High School, Kunigal',
    period: '2021 - 2023',
    status: 'Completed',
    description: 'Completed secondary school education with strong fundamentals in Mathematics, Science, and foundational computer concepts, establishing the analytical groundwork for technical engineering.',
    highlights: [
      { title: 'Mathematics & Logic', desc: 'Algebra, Geometry & Analytical Problem Solving' },
      { title: 'General Science', desc: 'Core Physics, Chemistry & Natural Sciences' },
      { title: 'Computer Concepts', desc: 'Foundations of Computing & Digital Literacy' },
      { title: 'Communication Skills', desc: 'English & Regional Language Fluency' }
    ]
  }
];

const DEFAULT_INQUIRIES = [
  {
    id: 'inq-1',
    name: 'Tech Collaboration Team',
    email: 'connect@robotics-ai.example',
    subject: 'AI/ML & IoT Collaboration',
    message: 'Hello Bharath, great portfolio! We reviewed your edge rover and computer vision projects. We would love to connect regarding technical opportunities.',
    date: '2026-11-15T10:30:00Z',
    read: false
  }
];

const STORAGE_KEYS = {
  PROJECTS: 'bharath_portfolio_projects_v1',
  SKILLS: 'bharath_portfolio_skills_v1',
  PROFILE: 'bharath_portfolio_profile_v1',
  EDUCATION: 'bharath_portfolio_education_v1',
  INQUIRIES: 'bharath_portfolio_inquiries_v1'
};

export function PortfolioProvider({ children }) {
  // Initialize from localStorage or fallback to defaults
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : defaultProjects;
    } catch {
      return defaultProjects;
    }
  });

  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      return saved ? JSON.parse(saved) : DEFAULT_SKILLS;
    } catch {
      return DEFAULT_SKILLS;
    }
  });

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [education, setEducation] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EDUCATION);
      return saved ? JSON.parse(saved) : DEFAULT_EDUCATION;
    } catch {
      return DEFAULT_EDUCATION;
    }
  });

  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : DEFAULT_INQUIRIES;
    } catch {
      return DEFAULT_INQUIRIES;
    }
  });

  const [cloudSyncStatus, setCloudSyncStatus] = useState({
    source: 'supabase',
    lastChecked: null,
    isSyncing: false,
    error: null
  });

  // Fetch inquiries from Supabase
  const refreshInquiriesFromCloud = async () => {
    setCloudSyncStatus(prev => ({ ...prev, isSyncing: true, error: null }));
    try {
      const res = await fetchInquiries();
      if (Array.isArray(res.inquiries)) {
        setInquiries(res.inquiries);
      }
      setCloudSyncStatus({
        source: 'supabase',
        lastChecked: new Date().toISOString(),
        isSyncing: false,
        error: null
      });
      return { success: true, count: res.inquiries ? res.inquiries.length : 0, source: 'supabase' };
    } catch (err) {
      setCloudSyncStatus(prev => ({
        ...prev,
        source: 'supabase',
        isSyncing: false,
        error: err.message
      }));
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    let mounted = true;
    const initFetch = async () => {
      try {
        const res = await fetchInquiries();
        if (!mounted) return;
        if (res && Array.isArray(res.inquiries)) {
          setInquiries(res.inquiries);
          setCloudSyncStatus({
            source: 'supabase',
            lastChecked: new Date().toISOString(),
            isSyncing: false,
            error: null
          });
        }
      } catch (err) {
        if (mounted) {
          console.warn('Initial Supabase inquiry sync failed:', err);
        }
      }
    };

    initFetch();

    return () => {
      mounted = false;
    };
  }, []);

  // Sync to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('Failed to save projects to localStorage', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    } catch (e) {
      console.warn('Failed to save skills to localStorage', e);
    }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(education));
    } catch (e) {
      console.warn('Failed to save education to localStorage', e);
    }
  }, [education]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Failed to save inquiries to localStorage', e);
    }
  }, [inquiries]);

  // Project Actions
  const addProject = (projectData) => {
    const id = projectData.id || projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProject = {
      ...projectData,
      id: id || `project-${Date.now()}`,
      accentColor: projectData.accentColor || 'from-gold-300/25 via-amber-200/20 to-champagne-300/25',
      borderColor: projectData.borderColor || 'group-hover:border-gold-500/50',
      glowColor: projectData.glowColor || 'rgba(212, 164, 68, 0.25)',
      type: projectData.type || 'standard'
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id, updatedFields) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Skill Actions
  const addSkill = (categoryId, skillObj) => {
    setSkills(prev => prev.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          skills: [...category.skills, skillObj]
        };
      }
      return category;
    }));
  };

  const deleteSkill = (categoryId, skillName) => {
    setSkills(prev => prev.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          skills: category.skills.filter(s => s.name !== skillName)
        };
      }
      return category;
    }));
  };

  // Profile Actions
  const updateProfile = (updatedFields) => {
    setProfile(prev => ({
      ...prev,
      ...updatedFields,
      social: {
        ...prev.social,
        ...(updatedFields.social || {})
      }
    }));
  };

  // Education Actions
  const updateEducation = (id, updatedFields) => {
    setEducation(prev => prev.map(e => e.id === id ? { ...e, ...updatedFields } : e));
  };

  const addEducation = (item) => {
    const newEdu = {
      ...item,
      id: item.id || `edu-${Date.now()}`
    };
    setEducation(prev => [...prev, newEdu]);
    return newEdu;
  };

  const deleteEducation = (id) => {
    setEducation(prev => prev.filter(e => e.id !== id));
  };

  // Inquiry Actions
  const addInquiry = (inquiryData) => {
    const newInq = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString(),
      read: false
    };
    setInquiries(prev => [newInq, ...prev]);
    return newInq;
  };

  const deleteInquiry = (id) => {
    deleteInquiryCloud(id);
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  const markInquiryRead = (id) => {
    markInquiryReadCloud(id, true);
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, read: true } : i));
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.EDUCATION);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    setProjects(defaultProjects);
    setSkills(DEFAULT_SKILLS);
    setProfile(DEFAULT_PROFILE);
    setEducation(DEFAULT_EDUCATION);
    setInquiries(DEFAULT_INQUIRIES);
  };

  // Export & Import Data Backup
  const exportData = () => {
    const data = {
      projects,
      skills,
      profile,
      education,
      inquiries,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  };

  const importData = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.projects && Array.isArray(parsed.projects)) setProjects(parsed.projects);
      if (parsed.skills && Array.isArray(parsed.skills)) setSkills(parsed.skills);
      if (parsed.profile && typeof parsed.profile === 'object') setProfile(parsed.profile);
      if (parsed.education && Array.isArray(parsed.education)) setEducation(parsed.education);
      if (parsed.inquiries && Array.isArray(parsed.inquiries)) setInquiries(parsed.inquiries);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  // Derive categories dynamically from projects
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        categories,
        skills,
        profile,
        education,
        inquiries,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        deleteSkill,
        updateProfile,
        updateEducation,
        addEducation,
        deleteEducation,
        addInquiry,
        deleteInquiry,
        markInquiryRead,
        refreshInquiriesFromCloud,
        cloudSyncStatus,
        resetToDefaults,
        exportData,
        importData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
