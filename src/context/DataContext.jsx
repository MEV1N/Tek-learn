import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [banners, setBanners] = useState([]);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [bannersRes, coursesRes, eventsRes] = await Promise.all([
        fetch('/api/banners'),
        fetch('/api/courses'),
        fetch('/api/events')
      ]);

      if (bannersRes.ok) setBanners(await bannersRes.json());
      if (coursesRes.ok) setCourses(await coursesRes.json());
      if (eventsRes.ok) setEvents(await eventsRes.json());
    } catch (error) {
      console.error('Failed to fetch data from API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ banners, setBanners, courses, setCourses, events, setEvents, refreshData: fetchData, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
