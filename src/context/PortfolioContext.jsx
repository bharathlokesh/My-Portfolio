import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as defaultProjects } from '../data/projects';

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

const STORAGE_KEYS = {
  PROJECTS: 'bharath_portfolio_projects_v1',
  SKILLS: 'bharath_portfolio_skills_v1',
  PROFILE: 'bharath_portfolio_profile_v1'
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

  // Reset to Defaults
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    setProjects(defaultProjects);
    setSkills(DEFAULT_SKILLS);
    setProfile(DEFAULT_PROFILE);
  };

  // Export & Import Data Backup
  const exportData = () => {
    const data = {
      projects,
      skills,
      profile,
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
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        deleteSkill,
        updateProfile,
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
