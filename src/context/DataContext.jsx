import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const defaultBanners = [
  { id: 1, title: "Internship program", highlight: "Hive", subtitle: "details", link: "" },
  { id: 2, title: "Mentorship", highlight: "Pro", subtitle: "details", link: "" }
];

const defaultCourses = [
  {
    id: 1,
    title: "Data Science",
    description: "Master Python, ML & data visualization with real datasets and capstone projects.",
    price: "₹12,999",
    duration: "3 Months",
    iconName: "Database"
  },
  {
    id: 2,
    title: "UI/UX with AI",
    description: "Design stunning user experiences with Figma, prototyping, and AI-powered design tools.",
    price: "₹9,999",
    duration: "3 Months",
    iconName: "PenTool"
  },
  {
    id: 3,
    title: "Full Stack Development",
    description: "Master MERN stack. Build scalable web applications from scratch with real-world projects.",
    price: "₹14,999",
    duration: "6 Months",
    iconName: "FileCode2"
  }
];

const defaultGalleryImages = [];

export const DataProvider = ({ children }) => {
  const [banners, setBanners] = useState(() => {
    const saved = localStorage.getItem('teklearn_banners');
    return saved ? JSON.parse(saved) : defaultBanners;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('teklearn_courses');
    return saved ? JSON.parse(saved) : defaultCourses;
  });

  const [galleryImages, setGalleryImages] = useState(() => {
    const saved = localStorage.getItem('teklearn_gallery');
    return saved ? JSON.parse(saved) : defaultGalleryImages;
  });

  useEffect(() => {
    localStorage.setItem('teklearn_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('teklearn_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('teklearn_gallery', JSON.stringify(galleryImages));
  }, [galleryImages]);

  return (
    <DataContext.Provider value={{ banners, setBanners, courses, setCourses, galleryImages, setGalleryImages }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
