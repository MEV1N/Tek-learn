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

const defaultEvents = [];

export const DataProvider = ({ children }) => {
  const [banners, setBanners] = useState(() => {
    const saved = localStorage.getItem('teklearn_banners');
    return saved ? JSON.parse(saved) : defaultBanners;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('teklearn_courses');
    return saved ? JSON.parse(saved) : defaultCourses;
  });

  const [events, setEvents] = useState(() => {
    // Attempt to load events
    const saved = localStorage.getItem('teklearn_events');
    if (saved) return JSON.parse(saved);
    
    // Migration: If there are old flat gallery images, put them in a default event
    const oldGallery = localStorage.getItem('teklearn_gallery');
    if (oldGallery) {
      const parsedOld = JSON.parse(oldGallery);
      if (parsedOld && parsedOld.length > 0) {
        return [{
          id: Date.now(),
          title: "Legacy Gallery",
          date: "Before Migration",
          coverImage: parsedOld[0].src,
          images: parsedOld
        }];
      }
    }
    return defaultEvents;
  });

  useEffect(() => {
    localStorage.setItem('teklearn_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('teklearn_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('teklearn_events', JSON.stringify(events));
  }, [events]);

  return (
    <DataContext.Provider value={{ banners, setBanners, courses, setCourses, events, setEvents }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
