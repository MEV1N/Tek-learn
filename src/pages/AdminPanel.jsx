import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Trash2, Plus, Edit2, Save, X, Image } from 'lucide-react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  const { banners, courses, events, refreshData } = useData();
  
  const [activeTab, setActiveTab] = useState('banners'); // 'banners' | 'courses' | 'gallery'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });
  const [popupTimeout, setPopupTimeout] = useState(null);

  const triggerPopup = (message, type = 'success') => {
    if (popupTimeout) {
      clearTimeout(popupTimeout);
    }
    setPopup({ show: true, message, type });
    const timer = setTimeout(() => {
      setPopup(prev => ({ ...prev, show: false }));
    }, type === 'error' ? 6000 : 4000);
    setPopupTimeout(timer);
  };

  const [changePasswordState, setChangePasswordState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!passwordInput || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        triggerPopup('Logged in successfully!');
      } else {
        const errorData = await res.json().catch(() => ({}));
        triggerPopup(errorData.error || 'Incorrect password!', 'error');
      }
    } catch (err) {
      triggerPopup('Server connection error. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (changePasswordState.newPassword !== changePasswordState.confirmPassword) {
      triggerPopup('New passwords do not match!', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: changePasswordState.currentPassword,
          newPassword: changePasswordState.newPassword
        })
      });

      if (res.ok) {
        triggerPopup('Password changed successfully!');
        setChangePasswordState({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        const errorData = await res.json().catch(() => ({}));
        triggerPopup(errorData.error || 'Failed to change password.', 'error');
      }
    } catch (err) {
      triggerPopup('Server connection error. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Banner Handlers ---
  const [editingBanner, setEditingBanner] = useState(null);
  const [newBanner, setNewBanner] = useState({ title: '', highlight: '', subtitle: '', link: '' });

  const handleAddBanner = async (e) => {
    e.preventDefault();
    if (!newBanner.title || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBanner)
      });
      setNewBanner({ title: '', highlight: '', subtitle: '', link: '' });
      await refreshData();
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };

  const handleDeleteBanner = async (id) => {
    if (isSubmitting || !confirm('Delete this banner?')) return;
    setIsSubmitting(true);
    try {
      await fetch(`/api/banners/${id}`, { method: 'DELETE' });
      await refreshData();
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };

  const handleUpdateBanner = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetch(`/api/banners/${editingBanner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBanner)
      });
      setEditingBanner(null);
      await refreshData();
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };

  // --- Course Handlers ---
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', price: '', duration: '', iconName: 'Database', customIcon: '' });

  const availableIcons = ['Database', 'PenTool', 'FileCode2', 'TrendingUp', 'Store', 'Users', 'Award', 'BookOpen', 'Monitor'];

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.title || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse)
      });
      setNewCourse({ title: '', description: '', price: '', duration: '', iconName: 'Database', customIcon: '' });
      await refreshData();
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };

  const handleDeleteCourse = async (id) => {
    if (isSubmitting || !confirm('Delete this course?')) return;
    setIsSubmitting(true);
    try {
      await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      await refreshData();
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetch(`/api/courses/${editingCourse.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCourse)
      });
      setEditingCourse(null);
      await refreshData();
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };

  const handleImageUpload = (e, isEditing) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEditing) {
        setEditingCourse({ ...editingCourse, customIcon: reader.result });
      } else {
        setNewCourse({ ...newCourse, customIcon: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  // --- Event Handlers ---
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', coverImage: '', images: [] });
  const [managingImagesForEventId, setManagingImagesForEventId] = useState(null);
  const [newImageCaption, setNewImageCaption] = useState('');

  const handleEventCoverUpload = async (e, isEditing) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Convert to base64 for quick preview (or use URL.createObjectURL)
    // We will upload it directly now
    triggerPopup('Uploading image, please wait...', 'info');
    
    // Wait, let's use the cloudinary upload utility for this instead!
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }
      const data = await res.json();
      if (!data.url) {
        throw new Error('Image URL was not returned by server');
      }
      
      if (isEditing) {
        setEditingEvent({ ...editingEvent, coverImage: data.url });
      } else {
        setNewEvent({ ...newEvent, coverImage: data.url });
      }
      triggerPopup('Image uploaded successfully!', 'success');
    } catch (err) {
      console.error(err);
      triggerPopup(`Failed to upload image: ${err.message}`, 'error');
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.coverImage || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }
      setNewEvent({ title: '', date: '', coverImage: '', images: [] });
      const fileInput = document.getElementById('event-cover-input');
      if (fileInput) fileInput.value = '';
      await refreshData();
      triggerPopup('Event created successfully!', 'success');
    } catch (err) { 
      console.error(err); 
      triggerPopup(`Failed to create event: ${err.message}`, 'error');
    } finally { 
      setIsSubmitting(false); 
    }
  };

  const handleDeleteEvent = async (id) => {
    if (isSubmitting || !confirm('Delete this event?')) return;
    setIsSubmitting(true);
    try {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
      await refreshData();
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetch(`/api/events/${editingEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingEvent)
      });
      setEditingEvent(null);
      await refreshData();
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };

  const handleAddImageToEvent = async (e, eventId) => {
    const file = e.target.files[0];
    if (!file || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      // 1. Upload to cloudinary via backend
      const formData = new FormData();
      formData.append('file', file);
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!uploadRes.ok) {
        const errorData = await uploadRes.json().catch(() => ({}));
        throw new Error(errorData.error || `Upload responded with status ${uploadRes.status}`);
      }
      const data = await uploadRes.json();
      if (!data.url) {
        throw new Error('Image URL was not returned by server');
      }
      
      // 2. Add to event_images via backend
      const res = await fetch(`/api/events/${eventId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src: data.url })
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Saving responded with status ${res.status}`);
      }
      
      setNewImageCaption('');
      e.target.value = '';
      await refreshData();
      triggerPopup('Image added to album successfully!', 'success');
    } catch (err) {
      console.error(err);
      triggerPopup(`Failed to add image: ${err.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteImageFromEvent = async (eventId, imageId) => {
    if (isSubmitting || !confirm('Delete this image?')) return;
    setIsSubmitting(true);
    try {
      await fetch(`/api/events/images/${imageId}`, { method: 'DELETE' });
      await refreshData();
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };


  return (
    <div className="admin-page section-padding">
      <div className="container">
        <h1 className="page-title text-center" style={{ color: '#fff', marginBottom: '3rem' }}>Admin Dashboard</h1>
        
        {!isAuthenticated ? (
          <div style={{ maxWidth: '400px', margin: '0 auto', background: '#111', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Login Required</h2>
            <form onSubmit={handleLogin}>
              <input 
                type="password" 
                placeholder="Enter admin password" 
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)} 
                style={{ width: '100%', padding: '0.8rem 1rem', background: '#1a1a1a', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px', marginBottom: '1rem' }}
                required 
              />
              <button type="submit" className="btn btn-accent" style={{ width: '100%' }}>Login</button>
            </form>
          </div>
        ) : (
          <>
            <div className="admin-tabs">
              <button className={`admin-tab ${activeTab === 'banners' ? 'active' : ''}`} onClick={() => setActiveTab('banners')}>Manage Banners</button>
              <button className={`admin-tab ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}>Manage Courses</button>
              <button className={`admin-tab ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>Manage Events</button>
              <button className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Settings</button>
            </div>

        {activeTab === 'banners' && (
          <div className="admin-section">
            <h2>Banners (Home Page Slider)</h2>
            
            {/* Add New Banner Form */}
            <form className="admin-form" onSubmit={handleAddBanner}>
              <h3>Add New Banner</h3>
              <div className="form-row" style={{ flexWrap: 'wrap' }}>
                <input type="text" placeholder="Full Title (e.g., Internship program)" value={newBanner.title} onChange={e => setNewBanner({...newBanner, title: e.target.value})} required />
                <input type="text" placeholder="Highlight Word (e.g., Hive)" value={newBanner.highlight} onChange={e => setNewBanner({...newBanner, highlight: e.target.value})} />
                <input type="text" placeholder="Subtitle" value={newBanner.subtitle} onChange={e => setNewBanner({...newBanner, subtitle: e.target.value})} />
                <input type="url" placeholder="Link URL (e.g., https://example.com)" value={newBanner.link} onChange={e => setNewBanner({...newBanner, link: e.target.value})} />
                <button type="submit" className="btn btn-accent"><Plus size={18} /> Add</button>
              </div>
            </form>

            {/* List Existing Banners */}
            <div className="admin-list">
              {banners.map(banner => (
                <div key={banner.id} className="admin-card">
                  {editingBanner?.id === banner.id ? (
                    <form className="admin-edit-form" onSubmit={handleUpdateBanner} style={{ flexWrap: 'wrap' }}>
                      <input type="text" value={editingBanner.title} onChange={e => setEditingBanner({...editingBanner, title: e.target.value})} required />
                      <input type="text" value={editingBanner.highlight} onChange={e => setEditingBanner({...editingBanner, highlight: e.target.value})} />
                      <input type="text" value={editingBanner.subtitle} onChange={e => setEditingBanner({...editingBanner, subtitle: e.target.value})} />
                      <input type="url" placeholder="Link URL" value={editingBanner.link || ''} onChange={e => setEditingBanner({...editingBanner, link: e.target.value})} />
                      <div className="action-buttons">
                        <button type="submit" className="btn-icon save"><Save size={18} /></button>
                        <button type="button" className="btn-icon cancel" onClick={() => setEditingBanner(null)}><X size={18} /></button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="card-info">
                        <h4><span style={{ color: 'var(--accent-color)'}}>{banner.highlight}</span> {banner.title}</h4>
                        <p>{banner.subtitle}</p>
                        {banner.link && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>🔗 {banner.link}</p>}
                      </div>
                      <div className="action-buttons">
                        <button className="btn-icon edit" onClick={() => setEditingBanner(banner)}><Edit2 size={18} /></button>
                        <button className="btn-icon delete" onClick={() => handleDeleteBanner(banner.id)}><Trash2 size={18} /></button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="admin-section">
            <h2>Courses (Home & Course Pages)</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Note: The top 3 courses listed here will automatically appear on the Home page coverflow.</p>
            
            {/* Add New Course Form */}
            <form className="admin-form" onSubmit={handleAddCourse}>
              <h3>Add New Course</h3>
              <div className="form-grid">
                <input type="text" placeholder="Course Title" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} required />
                <input type="text" placeholder="Price (e.g., ₹9,999)" value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: e.target.value})} required />
                <input type="text" placeholder="Duration (e.g., 3 Months)" value={newCourse.duration} onChange={e => setNewCourse({...newCourse, duration: e.target.value})} required />
                <select value={newCourse.iconName} onChange={e => setNewCourse({...newCourse, iconName: e.target.value})}>
                  {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                </select>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Or upload custom icon:</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, false)} style={{ padding: '0.5rem' }} />
                  {newCourse.customIcon && <img src={newCourse.customIcon} alt="Preview" style={{ height: '40px', objectFit: 'contain' }} />}
                </div>
                <textarea placeholder="Description" value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} required className="full-width" rows="3"></textarea>
                <button type="submit" className="btn btn-accent full-width mt-2"><Plus size={18} /> Add Course</button>
              </div>
            </form>

            {/* List Existing Courses */}
            <div className="admin-list">
              {courses.map((course, index) => (
                <div key={course.id} className="admin-card course-card-admin">
                  {editingCourse?.id === course.id ? (
                    <form className="admin-edit-form grid-edit" onSubmit={handleUpdateCourse}>
                      <input type="text" value={editingCourse.title} onChange={e => setEditingCourse({...editingCourse, title: e.target.value})} required />
                      <input type="text" value={editingCourse.price} onChange={e => setEditingCourse({...editingCourse, price: e.target.value})} required />
                      <input type="text" value={editingCourse.duration} onChange={e => setEditingCourse({...editingCourse, duration: e.target.value})} required />
                      <select value={editingCourse.iconName} onChange={e => setEditingCourse({...editingCourse, iconName: e.target.value})}>
                        {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                      </select>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Custom icon:</label>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} style={{ padding: '0.5rem' }} />
                        {editingCourse.customIcon && <img src={editingCourse.customIcon} alt="Preview" style={{ height: '40px', objectFit: 'contain' }} />}
                      </div>
                      <textarea value={editingCourse.description} onChange={e => setEditingCourse({...editingCourse, description: e.target.value})} required rows="2" className="full-width"></textarea>
                      <div className="action-buttons full-width">
                        <button type="submit" className="btn-icon save"><Save size={18} /></button>
                        <button type="button" className="btn-icon cancel" onClick={() => setEditingCourse(null)}><X size={18} /></button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="card-info">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span className="badge">{index < 3 ? `Top ${index + 1} (Home)` : 'Course Page'}</span>
                          <h4>{course.title}</h4>
                        </div>
                        <p style={{ margin: '0.5rem 0' }}>{course.description}</p>
                        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                          <span><strong>Price:</strong> {course.price}</span>
                          <span><strong>Duration:</strong> {course.duration}</span>
                          <span><strong>Icon:</strong> {course.iconName}</span>
                        </div>
                      </div>
                      <div className="action-buttons">
                        <button className="btn-icon edit" onClick={() => setEditingCourse(course)}><Edit2 size={18} /></button>
                        <button className="btn-icon delete" onClick={() => handleDeleteCourse(course.id)}><Trash2 size={18} /></button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="admin-section">
            <h2>Events & Albums</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Create events and upload images to display them as albums on the Gallery page.</p>
            
            {/* Add New Event Form */}
            <form className="admin-form" onSubmit={handleAddEvent}>
              <h3>Create New Event</h3>
              <div className="form-grid">
                <input type="text" placeholder="Event Title (e.g., Workshop 2024)" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} required />
                <input type="text" placeholder="Date (e.g., March 2024)" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Upload Cover Image *</label>
                  <input 
                    id="event-cover-input"
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleEventCoverUpload(e, false)} 
                    style={{ padding: '0.5rem' }} 
                    required
                  />
                  {newEvent.coverImage && (
                    <img src={newEvent.coverImage} alt="Cover Preview" style={{ height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                  )}
                </div>
                <button type="submit" className="btn btn-accent mt-2"><Plus size={18} /> Create Event</button>
              </div>
            </form>

            {/* List Existing Events */}
            <div className="admin-list event-admin-list">
              {events.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>No events yet. Create your first event above!</p>
              )}
              {events.map(ev => (
                <div key={ev.id} className="admin-card event-card-admin" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  
                  {editingEvent?.id === ev.id ? (
                    <form className="admin-edit-form" onSubmit={handleUpdateEvent} style={{ flexWrap: 'wrap', marginBottom: '1rem' }}>
                      <input type="text" placeholder="Event Title" value={editingEvent.title} onChange={e => setEditingEvent({...editingEvent, title: e.target.value})} required />
                      <input type="text" placeholder="Date" value={editingEvent.date} onChange={e => setEditingEvent({...editingEvent, date: e.target.value})} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Replace cover image:</label>
                        <input type="file" accept="image/*" onChange={(e) => handleEventCoverUpload(e, true)} style={{ padding: '0.5rem' }} />
                        {editingEvent.coverImage && <img src={editingEvent.coverImage} alt="Preview" style={{ height: '60px', objectFit: 'cover', borderRadius: '4px' }} />}
                      </div>
                      <div className="action-buttons full-width">
                        <button type="submit" className="btn-icon save"><Save size={18} /></button>
                        <button type="button" className="btn-icon cancel" onClick={() => setEditingEvent(null)}><X size={18} /></button>
                      </div>
                    </form>
                  ) : (
                    <div className="event-admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                      <div className="card-info" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <img src={ev.coverImage} alt={ev.title} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                        <div>
                          <h4>{ev.title}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{ev.date} • {ev.images ? ev.images.length : 0} images</p>
                        </div>
                      </div>
                      <div className="action-buttons">
                        <button className="btn btn-light" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => setManagingImagesForEventId(managingImagesForEventId === ev.id ? null : ev.id)}>
                          {managingImagesForEventId === ev.id ? 'Close Album' : 'Manage Images'}
                        </button>
                        <button className="btn-icon edit" onClick={() => setEditingEvent(ev)}><Edit2 size={18} /></button>
                        <button className="btn-icon delete" onClick={() => handleDeleteEvent(ev.id)}><Trash2 size={18} /></button>
                      </div>
                    </div>
                  )}

                  {/* Album Image Management Section */}
                  {managingImagesForEventId === ev.id && (
                    <div className="album-management-section" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <h5 style={{ marginBottom: '1rem', color: '#fff' }}>Upload Images to {ev.title}</h5>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'flex-end' }}>
                        <div style={{ flex: 1 }}>
                          <input type="text" placeholder="Image Caption (Optional)" value={newImageCaption} onChange={(e) => setNewImageCaption(e.target.value)} style={{ width: '100%', marginBottom: '0.5rem' }} />
                          <input type="file" accept="image/*" onChange={(e) => handleAddImageToEvent(e, ev.id)} style={{ width: '100%' }} />
                        </div>
                      </div>

                      <h5 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Album Images</h5>
                      {(!ev.images || ev.images.length === 0) ? (
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>No images in this album yet.</p>
                      ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
                          {ev.images.map(img => (
                            <div key={img.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                              <img src={img.src} alt={img.caption} style={{ width: '100%', height: '100px', objectFit: 'cover', display: 'block' }} />
                              <button 
                                onClick={() => handleDeleteImageFromEvent(ev.id, img.id)}
                                style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(0,0,0,0.7)', border: 'none', color: '#ff4444', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                              >
                                <Trash2 size={12} />
                              </button>
                              {img.caption && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.8)', padding: '4px 6px', fontSize: '0.7rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img.caption}</div>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="admin-section">
            <h2>Settings</h2>
            <form className="admin-form change-password-form" onSubmit={handleChangePassword} style={{ maxWidth: '400px', margin: '0 auto', background: '#111', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Change Admin Password</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'left' }}>
                  <label style={{ fontSize: '0.9rem', color: '#ccc' }}>Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={changePasswordState.currentPassword}
                    onChange={e => setChangePasswordState({ ...changePasswordState, currentPassword: e.target.value })}
                    required
                    style={{ padding: '0.8rem 1rem', background: '#1a1a1a', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }}
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'left' }}>
                  <label style={{ fontSize: '0.9rem', color: '#ccc' }}>New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={changePasswordState.newPassword}
                    onChange={e => setChangePasswordState({ ...changePasswordState, newPassword: e.target.value })}
                    required
                    style={{ padding: '0.8rem 1rem', background: '#1a1a1a', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }}
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'left' }}>
                  <label style={{ fontSize: '0.9rem', color: '#ccc' }}>Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={changePasswordState.confirmPassword}
                    onChange={e => setChangePasswordState({ ...changePasswordState, confirmPassword: e.target.value })}
                    required
                    style={{ padding: '0.8rem 1rem', background: '#1a1a1a', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }}
                  />
                </div>
                <button type="submit" className="btn btn-accent" disabled={isSubmitting} style={{ marginTop: '0.5rem', width: '100%' }}>
                  {isSubmitting ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        )}
        </>
        )}
      </div>

      {popup.show && (
        <div className={`popup-alert ${popup.type}`}>
          <span>{popup.message}</span>
          <button className="popup-alert-close" onClick={() => setPopup(prev => ({ ...prev, show: false }))}>
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
