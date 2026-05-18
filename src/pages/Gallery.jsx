import { useState } from 'react';
import { useData } from '../context/DataContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
  const { galleryImages } = useData();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  return (
    <div className="gallery-page">
      <header className="gallery-hero">
        <div className="gallery-hero-glow"></div>
        <div className="gallery-hero-glow-2"></div>
        <div className="container">
          <h1 className="gallery-title">
            Our <span className="text-gradient-accent">Gallery</span>
          </h1>
          <p className="gallery-subtitle">
            Moments captured from our events, workshops, and community gatherings.
          </p>
        </div>
      </header>

      <section className="gallery-content container">
        {galleryImages.length === 0 ? (
          <div className="gallery-empty">
            <div className="empty-icon">📸</div>
            <h3>No images yet</h3>
            <p>Gallery images will appear here once added by an admin.</p>
          </div>
        ) : (
          <div className="gallery-masonry">
            {galleryImages.map((img, index) => (
              <div
                key={img.id}
                className="gallery-item"
                onClick={() => openLightbox(index)}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <img src={img.src} alt={img.caption || 'Gallery image'} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-caption">{img.caption}</span>
                  {img.date && <span className="gallery-item-date">{img.date}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && galleryImages[lightboxIndex] && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <X size={28} />
          </button>
          
          <button className="lightbox-nav lightbox-prev" onClick={goPrev}>
            <ChevronLeft size={36} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].caption || 'Gallery image'}
            />
            {galleryImages[lightboxIndex].caption && (
              <div className="lightbox-caption">
                <p>{galleryImages[lightboxIndex].caption}</p>
                {galleryImages[lightboxIndex].date && (
                  <span className="lightbox-date">{galleryImages[lightboxIndex].date}</span>
                )}
              </div>
            )}
          </div>
          
          <button className="lightbox-nav lightbox-next" onClick={goNext}>
            <ChevronRight size={36} />
          </button>

          <div className="lightbox-counter">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
