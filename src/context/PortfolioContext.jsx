import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as defaultProjects } from '../data/projects';
import { fetchInquiries, deleteInquiryCloud, markInquiryReadCloud, subscribeToInquiries } from '../services/inquiryService';
import { fetchProfileCloud, saveProfileCloud, subscribeToProfileCloud } from '../services/profileService';

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
  CERTIFICATES: 'bharath_portfolio_certificates_v1',
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

  const [certificates, setCertificates] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
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

  const [profileSyncStatus, setProfileSyncStatus] = useState({
    source: 'supabase',
    lastChecked: null,
    isSyncing: false,
    error: null
  });

  // Helper function to check if cloud profile matches current state
  const areProfilesEqual = (p1, p2) => {
    if (!p1 || !p2) return false;
    return (
      p1.name === p2.name &&
      p1.title === p2.title &&
      p1.profileImage === p2.profileImage &&
      p1.heroBio === p2.heroBio &&
      p1.aboutTitle === p2.aboutTitle &&
      p1.aboutBio === p2.aboutBio &&
      p1.email === p2.email &&
      p1.phone === p2.phone &&
      p1.location === p2.location &&
      (p1.social?.github || '') === (p2.social?.github || '') &&
      (p1.social?.linkedin || '') === (p2.social?.linkedin || '') &&
      (p1.social?.instagram || '') === (p2.social?.instagram || '')
    );
  };

  // Fetch profile from Supabase Cloud
  const refreshProfileFromCloud = async () => {
    setProfileSyncStatus(prev => ({ ...prev, isSyncing: true, error: null }));
    try {
      const res = await fetchProfileCloud();
      if (res && res.success && res.profile) {
        setProfile(prev => {
          const merged = {
            ...prev,
            ...res.profile,
            social: { ...prev.social, ...(res.profile.social || {}) }
          };
          if (areProfilesEqual(prev, merged)) return prev;
          return merged;
        });
        setProfileSyncStatus({
          source: 'supabase',
          lastChecked: res.updatedAt || new Date().toISOString(),
          isSyncing: false,
          error: null
        });
        return { success: true, profile: res.profile };
      }
      setProfileSyncStatus(prev => ({ ...prev, isSyncing: false }));
      return { success: false, error: 'No cloud profile found' };
    } catch (err) {
      setProfileSyncStatus(prev => ({ ...prev, isSyncing: false, error: err.message }));
      return { success: false, error: err.message };
    }
  };

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

    // 1. Initial Load from Supabase
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

    // 2. Realtime WebSocket Listener (instant sync across any device)
    const unsubscribe = subscribeToInquiries((payload) => {
      if (!mounted) return;
      if (payload?.eventType === 'INSERT' && payload.new) {
        const newItem = {
          id: payload.new.id,
          name: payload.new.name,
          email: payload.new.email,
          subject: payload.new.subject || 'Portfolio Inquiry',
          message: payload.new.message,
          date: payload.new.created_at,
          read: Boolean(payload.new.read)
        };
        setInquiries(prev => {
          if (prev.some(i => i.id === newItem.id)) return prev;
          return [newItem, ...prev];
        });
      } else {
        // Refresh full list for UPDATE / DELETE
        fetchInquiries().then(res => {
          if (mounted && res && Array.isArray(res.inquiries)) {
            setInquiries(res.inquiries);
          }
        }).catch(() => {});
      }
    });

    // 3. Fast 5-second polling backup (guarantees cross-device arrival even if network blocks WebSockets)
    const pollInterval = setInterval(() => {
      if (mounted) {
        fetchInquiries().then(res => {
          if (mounted && res && Array.isArray(res.inquiries)) {
            setInquiries(res.inquiries);
            setCloudSyncStatus(prev => ({
              ...prev,
              lastChecked: new Date().toISOString()
            }));
          }
        }).catch(() => {});
      }
    }, 5000);

    return () => {
      mounted = false;
      if (typeof unsubscribe === 'function') unsubscribe();
      clearInterval(pollInterval);
    };
  }, []);

  // Sync Profile with Supabase Cloud across all devices & live visitors
  useEffect(() => {
    let mounted = true;

    // 1. Initial Cloud Profile Fetch
    const initProfile = async () => {
      try {
        const res = await fetchProfileCloud();
        if (!mounted) return;
        if (res && res.success && res.profile) {
          setProfile(prev => {
            const merged = {
              ...prev,
              ...res.profile,
              social: { ...prev.social, ...(res.profile.social || {}) }
            };
            if (areProfilesEqual(prev, merged)) return prev;
            return merged;
          });
          if (Array.isArray(res.profile.certificates)) {
            setCertificates(prev => {
              if (JSON.stringify(prev) === JSON.stringify(res.profile.certificates)) return prev;
              try {
                localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(res.profile.certificates));
              } catch {}
              return res.profile.certificates;
            });
          }
          setProfileSyncStatus({
            source: 'supabase',
            lastChecked: res.updatedAt || new Date().toISOString(),
            isSyncing: false,
            error: null
          });
        }
      } catch (err) {
        if (mounted) console.warn('Supabase profile initial load error:', err);
      }
    };

    initProfile();

    // 2. Realtime WebSocket Listener (instant sync to mobile and live site)
    const unsubProfile = subscribeToProfileCloud((cloudProfile) => {
      if (!mounted) return;
      if (cloudProfile && typeof cloudProfile === 'object') {
        setProfile(prev => {
          const merged = {
            ...prev,
            ...cloudProfile,
            social: { ...prev.social, ...(cloudProfile.social || {}) }
          };
          if (areProfilesEqual(prev, merged)) return prev;
          return merged;
        });
        if (Array.isArray(cloudProfile.certificates)) {
          setCertificates(prev => {
            if (JSON.stringify(prev) === JSON.stringify(cloudProfile.certificates)) return prev;
            try {
              localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(cloudProfile.certificates));
            } catch {}
            return cloudProfile.certificates;
          });
        }
        setProfileSyncStatus({
          source: 'supabase',
          lastChecked: new Date().toISOString(),
          isSyncing: false,
          error: null
        });
      }
    });

    // 3. Auto-sync on window/tab focus (e.g. waking mobile device)
    const handleFocus = () => {
      if (mounted) initProfile();
    };
    window.addEventListener('focus', handleFocus);

    // 4. Polling backup (ensures mobile browsers without active WebSockets stay updated)
    const profilePoll = setInterval(() => {
      if (mounted) initProfile();
    }, 15000);

    return () => {
      mounted = false;
      if (typeof unsubProfile === 'function') unsubProfile();
      window.removeEventListener('focus', handleFocus);
      clearInterval(profilePoll);
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
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
    } catch (e) {
      console.warn('Failed to save certificates to localStorage', e);
    }
  }, [certificates]);

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

  // Profile Actions (Synchronizes to LocalStorage AND Supabase Cloud)
  const updateProfile = async (updatedFields) => {
    const nextProfile = {
      ...profile,
      ...updatedFields,
      social: {
        ...profile.social,
        ...(updatedFields.social || {})
      }
    };
    // 1. Immediately update local React state
    setProfile(nextProfile);

    // 2. Persist to browser LocalStorage
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(nextProfile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage', e);
    }

    // 3. Persist to Supabase Cloud so all devices & mobile reflect updates live
    setProfileSyncStatus(prev => ({ ...prev, isSyncing: true, error: null }));
    const cloudRes = await saveProfileCloud({ ...nextProfile, certificates });
    if (cloudRes && cloudRes.success) {
      setProfileSyncStatus({
        source: 'supabase',
        lastChecked: new Date().toISOString(),
        isSyncing: false,
        error: null
      });
    } else {
      setProfileSyncStatus(prev => ({
        ...prev,
        isSyncing: false,
        error: cloudRes?.error || 'Cloud sync error'
      }));
    }
    return cloudRes;
  };

  // Certificate Actions (With LocalStorage + Supabase Cloud Sync)
  const addCertificate = async (certData) => {
    const newCert = {
      ...certData,
      id: certData.id || `cert-${Date.now()}`,
      badge: certData.badge || 'Verified Credential',
      color: certData.color || 'from-gold-300/20 to-amber-400/20',
      borderColor: certData.borderColor || 'border-gold-400/40',
      createdAt: new Date().toISOString()
    };
    const nextCerts = [newCert, ...certificates];
    setCertificates(nextCerts);
    try {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(nextCerts));
    } catch (e) {
      console.warn('Failed to save certificates to localStorage', e);
    }
    await saveProfileCloud({ ...profile, certificates: nextCerts });
    return newCert;
  };

  const updateCertificate = async (id, updatedFields) => {
    const nextCerts = certificates.map(c => c.id === id ? { ...c, ...updatedFields } : c);
    setCertificates(nextCerts);
    try {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(nextCerts));
    } catch (e) {
      console.warn('Failed to save certificates to localStorage', e);
    }
    await saveProfileCloud({ ...profile, certificates: nextCerts });
  };

  const deleteCertificate = async (id) => {
    const nextCerts = certificates.filter(c => c.id !== id);
    setCertificates(nextCerts);
    try {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(nextCerts));
    } catch (e) {
      console.warn('Failed to save certificates to localStorage', e);
    }
    await saveProfileCloud({ ...profile, certificates: nextCerts });
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
      id: inquiryData.id || `inq-${Date.now()}`,
      date: inquiryData.date || inquiryData.created_at || new Date().toISOString(),
      read: inquiryData.read ?? false
    };
    setInquiries(prev => {
      if (prev.some(i => i.id === newInq.id)) return prev;
      return [newInq, ...prev];
    });
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
    localStorage.removeItem(STORAGE_KEYS.CERTIFICATES);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    setProjects(defaultProjects);
    setSkills(DEFAULT_SKILLS);
    setProfile(DEFAULT_PROFILE);
    setEducation(DEFAULT_EDUCATION);
    setCertificates([]);
    setInquiries(DEFAULT_INQUIRIES);
  };

  // Export & Import Data Backup
  const exportData = () => {
    const data = {
      projects,
      skills,
      profile,
      education,
      certificates,
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
      if (parsed.certificates && Array.isArray(parsed.certificates)) setCertificates(parsed.certificates);
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
        profileSyncStatus,
        refreshProfileFromCloud,
        education,
        certificates,
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
        addCertificate,
        updateCertificate,
        deleteCertificate,
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
