# Teklearn - Industry-Ready Learning Platform

Teklearn is a premium, software-driven learning and talent incubation platform designed to bridge the gap between traditional education and the rapidly evolving tech industry.

## 🚀 Project Overview

The website is built with a focus on high-fidelity design, modern typography, and interactive user experiences. It serves as a portal for students to transform into industry-ready professionals through project-based learning and professional mentorship.

## 🛠️ Technology Stack

- **Framework:** React.js (via Vite)
- **Styling:** Vanilla CSS (Custom Design System)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** 
  - `Plus Jakarta Sans` (Headings & Brand)
  - `Inter` (Body Text)
- **Animations:** Custom CSS Keyframes & Transitions

## ✨ Key Features & Components

### 1. Dynamic Homepage
- **Hero Section:** Features a floating background animation, high-impact text gradients, and a smooth "Cursor Glow" tracking effect.
- **Bento Grid Layout:** A modern, non-linear grid showcasing the core value propositions (Project-Based Learning, Job-Ready Skills, etc.) with subtle hover scales and glow effects.
- **Interactive Coverflow:** A custom-built 3D carousel for exploring courses like Data Science, UI/UX, and Full Stack Development.
- **Join Hive:** A community-focused call-to-action section using a "Glowing Border" design.

### 2. About Page
- **Who We Are & What We Do:** Detailed breakdown of the platform's mission and utility.
- **Our Approach:** Visualized 4-step journey (Learn → Build → Apply → Grow).
- **Vision & Mission:** Clearly defined goals for student empowerment.
- **Consistent Styling:** Leverages the global design system for a cohesive "Premium Dark" aesthetic.

### 3. Design System
- **Color Palette:**
  - Background: `#050505` (Deep Black)
  - Surface: `#111111` (Elevated Grey)
  - Accent: `#fcd34d` (Amber/Yellow Glow)
  - Text: High-contrast White and muted Zinc.
- **Glassmorphism:** Use of semi-transparent backgrounds and blurs for cards and headers.
- **Glow Effects:** Radial gradients used for backgrounds and interactive elements to create depth.

### 4. User Experience
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.
- **Micro-interactions:** Hover states, smooth accordion FAQs, and transition effects for better engagement.
- **Accessibility:** Semantic HTML5 structure and clear visual hierarchy.

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components (Navbar, Footer, CourseCard)
├── pages/            # Main page views (Home, About, Course, etc.)
│   ├── About.jsx     # Newly created comprehensive About page
│   ├── About.css     # Specific styles for the About section
│   ├── Home.jsx      # Feature-rich landing page
│   └── SharedPageStyles.css # Global page utilities (headers, titles)
├── index.css         # Design system tokens and global resets
└── App.jsx           # Routing and core application structure
```

## 📈 Future Roadmap
- Integration of a Learning Management System (LMS).
- Student Dashboard for tracking project progress.
- Live Mentor matching system.
- Career portal with direct industry placements.
