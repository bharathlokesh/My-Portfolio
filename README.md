<div align="center">

# ✨ Bharath Lokesh — Developer Portfolio

**A modern, interactive portfolio crafted with React 19, Vite, and Tailwind CSS.**  
Specializing in **Artificial Intelligence**, **Machine Learning**, **Computer Vision**, and **Connected IoT Systems**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-bharathlokesh.github.io%2FMy--Portfolio-d4a444?style=for-the-badge&logo=googlechrome&logoColor=white)](https://bharathlokesh.github.io/My-Portfolio/)
[![GitHub Pages](https://img.shields.io/github/actions/workflow/status/bharathlokesh/My-Portfolio/deploy.yml?branch=main&label=GitHub%20Pages&style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/bharathlokesh/My-Portfolio/actions)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge)](LICENSE)

[Explore Live Demo](https://bharathlokesh.github.io/My-Portfolio/) • [Report Bug](https://github.com/bharathlokesh/My-Portfolio/issues) • [Request Feature](https://github.com/bharathlokesh/My-Portfolio/issues)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Customization Guide](#-customization-guide)
  - [Modifying Projects](#modifying-projects)
  - [Updating Skills](#updating-skills)
  - [Replacing Resume & Media](#replacing-resume--media)
  - [Adjusting Base Path](#adjusting-base-path)
- [Deployment](#-deployment)
- [Contact & Connect](#-contact--connect)
- [License](#-license)

---

## 🌟 Overview

This repository hosts the official source code for **Bharath Lokesh's** personal portfolio. Designed from the ground up to break away from generic templates, it pairs a signature **warm-white, champagne, and metallic gold aesthetic** with an engaging user experience, highlighting technical expertise spanning embedded microcontrollers, computer vision pipelines, and modern web applications.

### Highlights
- 🧑‍💻 **Interactive 3D Developer Avatar:** 3D interactive avatar with real-time mouse-tracking tilt, continuous flowing float animation, dynamic specular glare, and Web Speech voice greeting.
- 🎨 **Original Luxury Tech Theme:** Bespoke palette featuring GPU-accelerated ambient glows, glassmorphic cards, and subtle grid textures.
- ⚡ **Blazing Fast Performance:** Built on Vite 8 and React 19 for instantaneous hot module replacement and lightweight production bundles.
- 📱 **Mobile-First & Accessible:** Fully responsive across all display formats with semantic HTML5 and smooth navigation.

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **3D Developer Avatar** | Interactive 3D perspective card with real-time mouse parallax tilt, flowing floating animation, dynamic specular glare sheen, floating tech chips, and native Web Speech voice greeting. |
| **Curated Project Showcase** | Domain-based filtering (IoT / Automation, AI / Computer Vision, Web Development) with live metric chips and repository links. |
| **Interactive Skills Matrix** | Categorized technical competencies spanning Languages (Python, C/C++, Java), Web (React, JS), AI/ML, and Embedded Systems (ESP32, MQTT). |
| **Academic & Career Timeline** | Interactive timeline featuring Diploma coursework in AI & ML at GTTC Magadi alongside secondary education credentials. |
| **Direct Contact Hub** | Quick-copy utilities for email & telephone, social link integrations (GitHub, LinkedIn, Instagram), and an interactive inquiry form. |
| **Resume Integration** | Instant one-click PDF download with environment-aware base routing for seamless delivery on GitHub Pages. |

---

## 🛠️ Tech Stack

### Core Frameworks & Libraries
- **Frontend Library:** [React 19](https://react.dev/)
- **Build Tool & Dev Server:** [Vite 8](https://vitejs.dev/)
- **Styling Engine:** [Tailwind CSS 3.4](https://tailwindcss.com/) with PostCSS & Autoprefixer
- **Iconography:** [Lucide React](https://lucide.dev/) + Custom SVG Components
- **Typography:** Google Fonts (*Plus Jakarta Sans*, *Space Grotesk*, *JetBrains Mono*, *Syne*)

### Tooling & CI/CD
- **Linting:** [Oxlint](https://oxc.rs/) for ultra-fast JavaScript/React linting
- **Deployment & Hosting:** [GitHub Actions](https://github.com/features/actions) with automated workflows to [GitHub Pages](https://pages.github.com/)

---

## 📂 Project Architecture

```plaintext
myportfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Actions deployment pipeline
├── public/
│   ├── favicon.svg             # Application favicon
│   ├── profile.jpg             # Profile headshot
│   └── resume/
│       └── Bharath_Resume.pdf  # Downloadable candidate resume
├── src/
│   ├── assets/
│   │   ├── profile.jpg         # Profile image asset
│   │   └── developer_3d_transparent.png # Transparent 3D Developer avatar
│   ├── components/
│   │   ├── About.jsx           # Bio narrative, core interests & domain cards
│   │   ├── Certifications.jsx  # Professional credentials & verification links
│   │   ├── Contact.jsx         # Contact channels, quick-copy & message form
│   │   ├── Education.jsx       # Academic timeline & GTTC coursework highlights
│   │   ├── Footer.jsx          # Footer credits & smooth back-to-top trigger
│   │   ├── Hero.jsx            # Hero section with primary CTAs & availability badge
│   │   ├── HeroVisual.jsx      # Interactive 3D Avatar (tilt, floating flow, TTS voice)
│   │   ├── Icons.jsx           # Custom social and brand SVGs (GitHub, LinkedIn, etc.)
│   │   ├── Navbar.jsx          # Fixed responsive header & mobile navigation drawer
│   │   ├── ProjectCard.jsx     # Individual project card with metrics & links
│   │   ├── Projects.jsx        # Project gallery with category filter tabs
│   │   └── Skills.jsx          # Skills grid categorized by domain
│   ├── data/
│   │   └── projects.js         # Centralized project data source
│   ├── App.css                 # Global animations & glassmorphism utilities
│   ├── App.jsx                 # Root container & section composition
│   ├── index.css               # Tailwind CSS entry directives & root theme variables
│   └── main.jsx                # Application mounting entry point
├── index.html                  # HTML entry point with metadata & preloaded fonts
├── package.json                # Project dependencies and operational scripts
├── tailwind.config.js          # Tailored color system, fonts, and keyframe animations
└── vite.config.js              # Vite configuration with GitHub Pages base URL
```

---

## 💻 Getting Started

Follow these instructions to run the portfolio locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version `18.0.0` or higher recommended, Node 20 LTS preferred)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bharathlokesh/My-Portfolio.git
   cd My-Portfolio
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

### Development Server

Start the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173/My-Portfolio/
```
*(or the local port provided in your terminal output)*

### Production Build

Create an optimized, minified production build:
```bash
npm run build
```
The compiled output will be generated inside the `dist/` directory.

### Preview Production Build

Test and preview the production build locally prior to deployment:
```bash
npm run preview
```

### Code Linting

Run Oxlint to check code quality:
```bash
npm run lint
```

---

## 🎨 Customization Guide

### Modifying Projects
Project data is cleanly separated from UI logic. To edit existing entries or add new ones, update [`src/data/projects.js`](src/data/projects.js):

```javascript
{
  id: 'unique-project-id',
  title: 'Project Title',
  category: 'AI / Computer Vision',
  tagline: 'Short descriptive subhead',
  description: 'Detailed explanation of the project impact and implementation.',
  technologies: ['Python', 'OpenCV', 'TensorFlow'],
  metrics: 'Key metric or outcome',
  status: 'Completed / In Progress',
  githubUrl: 'https://github.com/your-username/repo',
  liveUrl: 'https://demo-url.com',
  accentColor: 'from-amber-400/25 via-gold-300/20 to-yellow-200/25',
  borderColor: 'group-hover:border-gold-500/50',
  glowColor: 'rgba(212, 164, 68, 0.25)',
  type: 'vision'
}
```

### Updating Skills
Skills are managed inside [`src/components/Skills.jsx`](src/components/Skills.jsx). Simply update the `SKILL_CATEGORIES` array with your preferred tools and skill levels.

### Replacing Resume & Media
- **Resume:** Replace `public/resume/Bharath_Resume.pdf` with your updated PDF (keep the filename identical or update references in [`src/components/Hero.jsx`](src/components/Hero.jsx)).
- **Profile Picture:** Replace `public/profile.jpg` and `src/assets/profile.jpg`.
- **3D Avatar Image:** Replace `src/assets/developer_3d_transparent.png` or `public/developer_3d_transparent.png` with any transparent PNG of your choice.

### Adjusting Base Path
If hosting under a custom domain (e.g., `https://bharath.dev`) rather than a GitHub Pages subdirectory (`/My-Portfolio/`), update the `base` property in [`vite.config.js`](vite.config.js):

```javascript
// For custom domain or root deployment:
export default defineConfig({
  base: '/',
  plugins: [react()],
})
```

---

## 🚢 Deployment

### Automated GitHub Pages Deployment (Included)

This repository includes a continuous deployment workflow configured in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push your changes to the `main` branch:
   ```bash
   git add .
   git commit -m "feat: updates portfolio content"
   git push origin main
   ```
2. In your repository on GitHub:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every commit pushed to `main` will automatically build and deploy your updated portfolio to:
   ```
   https://<username>.github.io/<repository-name>/
   ```

### Alternative: Vercel or Netlify

- **Vercel:** Connect your GitHub repo at [vercel.com](https://vercel.com). Vercel automatically detects Vite. Set `base: '/'` in `vite.config.js` when deploying to root domains.
- **Netlify:** Connect your GitHub repo at [netlify.com](https://netlify.com). Set the build command to `npm run build` and publish directory to `dist`.

---

## 📬 Contact & Connect

Feel free to connect for internships, freelance projects, research collaborations, or open-source discussions!

- **Developer:** Bharath Lokesh
- **Location:** Tumkur, Karnataka, India
- **Email:** [bharathlokesh07@gmail.com](mailto:bharathlokesh07@gmail.com)
- **Phone:** [+91 9611673039](tel:+919611673039)
- **LinkedIn:** [linkedin.com/in/bharath-lokesh07](https://www.linkedin.com/in/bharath-lokesh07/)
- **GitHub:** [@bharathlokesh](https://github.com/bharathlokesh)
- **Instagram:** [@bhrrtth](https://www.instagram.com/bhrrtth/)

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE). Feel free to explore the code, use it as inspiration for your own projects, and build something amazing!

---

<div align="center">

Crafted with dedication & passion by **Bharath Lokesh** • © 2026

</div>
