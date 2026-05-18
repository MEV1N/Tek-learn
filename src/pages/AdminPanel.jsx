import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Trash2, Plus, Edit2, Save, X, Image } from 'lucide-react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  const { banners, setBanners, courses, setCourses, galleryImages, setGalleryImages } = useData();
  
  const [activeTab, setActiveTab] = useState('banners'); // 'banners' | 'courses' | 'gallery'

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'teklearnadmin') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

  // --- Banner Handlers ---
  const [editingBanner, setEditingBanner] = useState(null);
  const [newBanner, setNewBanner] = useState({ title: '', highlight: '', subtitle: '', link: '' });

  const handleAddBanner = (e) => {
    e.preventDefault();
    if (!newBanner.title) return;
    setBanners([...banners, { ...newBanner, id: Date.now() }]);
    setNewBanner({ title: '', highlight: '', subtitle: '', link: '' });
  };

  const handleDeleteBanner = (id) => {
    setBanners(banners.filter(b => b.id !== id));
  };

  const handleUpdateBanner = (e) => {
    e.preventDefault();
    setBanners(banners.map(b => b.id === editingBanner.id ? editingBanner : b));
    setEditingBanner(null);
  };

  // --- Course Handlers ---
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', price: '', duration: '', iconName: 'Database', customIcon: '' });

  const availableIcons = ['Database', 'PenTool', 'FileCode2', 'TrendingUp', 'Store', 'Users', 'Award', 'BookOpen', 'Monitor'];

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title) return;
    setCourses([...courses, { ...newCourse, id: Date.now() }]);
    setNewCourse({ title: '', description: '', price: '', duration: '', iconName: 'Database', customIcon: '' });
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    setCourses(courses.map(c => c.id === editingCourse.id ? editingCourse : c));
    setEditingCourse(null);
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

  // --- Gallery Handlers ---
  const [editingGalleryImage, setEditingGalleryImage] = useState(null);
  const [newGalleryImage, setNewGalleryImage] = useState({ src: '', caption: '', date: '' });

  const handleGalleryImageUpload = (e, isEditing) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEditing) {
        setEditingGalleryImage({ ...editingGalleryImage, src: reader.result });
      } else {
        setNewGalleryImage({ ...newGalleryImage, src: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddGalleryImage = (e) => {
    e.preventDefault();
    if (!newGalleryImage.src) return;
    setGalleryImages([...galleryImages, { ...newGalleryImage, id: Date.now() }]);
    setNewGalleryImage({ src: '', caption: '', date: '' });
    // Reset the file input
    const fileInput = document.getElementById('gallery-file-input');
    if (fileInput) fileInput.value = '';
  };

  const handleDeleteGalleryImage = (id) => {
    setGalleryImages(galleryImages.filter(img => img.id !== id));
  };

  const handleUpdateGalleryImage = (e) => {
    e.preventDefault();
    setGalleryImages(galleryImages.map(img => img.id === editingGalleryImage.id ? editingGalleryImage : img));
    setEditingGalleryImage(null);
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
          <button className={`admin-tab ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>Manage Gallery</button>
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
            <h2>Gallery (Events Page)</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Upload images to display on the Gallery page. Add captions and dates for context.</p>
            
            {/* Add New Gallery Image Form */}
            <form className="admin-form" onSubmit={handleAddGalleryImage}>
              <h3>Add New Image</h3>
              <div className="form-grid">
                <div className="full-width" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Image size={16} /> Upload Image
                  </label>
                  <input 
                    id="gallery-file-input"
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleGalleryImageUpload(e, false)} 
                    style={{ padding: '0.5rem' }} 
                    required
                  />
                  {newGalleryImage.src && (
                    <img 
                      src={newGalleryImage.src} 
                      alt="Preview" 
                      style={{ height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-color)' }} 
                    />
                  )}
                </div>
                <input type="text" placeholder="Caption (e.g., Workshop Day 2024)" value={newGalleryImage.caption} onChange={e => setNewGalleryImage({...newGalleryImage, caption: e.target.value})} />
                <input type="text" placeholder="Date (e.g., March 2024)" value={newGalleryImage.date} onChange={e => setNewGalleryImage({...newGalleryImage, date: e.target.value})} />
                <button type="submit" className="btn btn-accent full-width mt-2"><Plus size={18} /> Add Image</button>
              </div>
            </form>

            {/* List Existing Gallery Images */}
            <div className="admin-list gallery-admin-list">
              {galleryImages.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>No gallery images yet. Upload your first image above!</p>
              )}
              {galleryImages.map(img => (
                <div key={img.id} className="admin-card gallery-card-admin">
                  {editingGalleryImage?.id === img.id ? (
                    <form className="admin-edit-form gallery-edit-form" onSubmit={handleUpdateGalleryImage}>
                      <div className="gallery-edit-preview">
                        <img src={editingGalleryImage.src} alt="Preview" className="gallery-admin-thumb" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Replace image:</label>
                          <input type="file" accept="image/*" onChange={(e) => handleGalleryImageUpload(e, true)} style={{ padding: '0.5rem' }} />
                        </div>
                      </div>
                      <input type="text" placeholder="Caption" value={editingGalleryImage.caption} onChange={e => setEditingGalleryImage({...editingGalleryImage, caption: e.target.value})} />
                      <input type="text" placeholder="Date" value={editingGalleryImage.date} onChange={e => setEditingGalleryImage({...editingGalleryImage, date: e.target.value})} />
                      <div className="action-buttons">
                        <button type="submit" className="btn-icon save"><Save size={18} /></button>
                        <button type="button" className="btn-icon cancel" onClick={() => setEditingGalleryImage(null)}><X size={18} /></button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="card-info" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <img src={img.src} alt={img.caption || 'Gallery'} className="gallery-admin-thumb" />
                        <div>
                          <h4>{img.caption || 'Untitled'}</h4>
                          {img.date && <p style={{ fontSize: '0.85rem' }}>{img.date}</p>}
                        </div>
                      </div>
                      <div className="action-buttons">
                        <button className="btn-icon edit" onClick={() => setEditingGalleryImage(img)}><Edit2 size={18} /></button>
                        <button className="btn-icon delete" onClick={() => handleDeleteGalleryImage(img.id)}><Trash2 size={18} /></button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
