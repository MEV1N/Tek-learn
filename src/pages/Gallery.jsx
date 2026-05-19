import { useState } from 'react';
import { useData } from '../context/DataContext';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
  const { events } = useData();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = (e) => {
    e.stopPropagation();
    if (selectedEvent && selectedEvent.images) {
      setLightboxIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }
  };

  const goPrev = (e) => {
    e.stopPropagation();
    if (selectedEvent && selectedEvent.images) {
      setLightboxIndex((prev) => (prev === 0 ? selectedEvent.images.length - 1 : prev - 1));
    }
  };

  return (
    <div className="gallery-page">
      <header className="gallery-hero">
        <div className="gallery-hero-glow"></div>
        <div className="gallery-hero-glow-2"></div>
        <div className="container">
          {selectedEvent ? (
            <div className="selected-event-header">
              <button className="btn-back" onClick={() => setSelectedEvent(null)}>
                <ArrowLeft size={20} /> Back to Events
              </button>
              <h1 className="gallery-title">{selectedEvent.title}</h1>
              <p className="gallery-subtitle">{selectedEvent.date}</p>
            </div>
          ) : (
            <>
              <h1 className="gallery-title">
                Our <span className="text-gradient-accent">Events</span>
              </h1>
              <p className="gallery-subtitle">
                Moments captured from our events, workshops, and community gatherings.
              </p>
            </>
          )}
        </div>
      </header>

      <section className="gallery-content container">
        {!selectedEvent ? (
          /* Events List View */
          <>
            {(!events || events.length === 0) ? (
              <div className="gallery-empty">
                <div className="empty-icon">📅</div>
                <h3>No events yet</h3>
                <p>Events and albums will appear here once added by an admin.</p>
              </div>
            ) : (
              <div className="events-grid">
                {events.map((ev, index) => (
                  <div 
                    key={ev.id} 
                    className="event-album-card"
                    onClick={() => setSelectedEvent(ev)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="album-cover">
                      <img src={ev.coverImage} alt={ev.title} loading="lazy" />
                      <div className="album-overlay">
                        <span>View Album</span>
                      </div>
                    </div>
                    <div className="album-info">
                      <h3>{ev.title}</h3>
                      <p>{ev.date}</p>
                      <span className="photo-count">{(ev.images || []).length} Photos</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Specific Event Images View */
          <>
            {(!selectedEvent.images || selectedEvent.images.length === 0) ? (
              <div className="gallery-empty">
                <div className="empty-icon">📸</div>
                <h3>No images yet</h3>
                <p>Images for this event will appear here once added by an admin.</p>
              </div>
            ) : (
              <div className="gallery-masonry">
                {selectedEvent.images.map((img, index) => (
                  <div
                    key={img.id}
                    className="gallery-item"
                    onClick={() => openLightbox(index)}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <img src={img.src} alt={img.caption || 'Gallery image'} loading="lazy" />
                    {img.caption && (
                      <div className="gallery-item-overlay">
                        <span className="gallery-item-caption">{img.caption}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && selectedEvent && selectedEvent.images && selectedEvent.images[lightboxIndex] && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <X size={28} />
          </button>
          
          {selectedEvent.images.length > 1 && (
            <button className="lightbox-nav lightbox-prev" onClick={goPrev}>
              <ChevronLeft size={36} />
            </button>
          )}
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedEvent.images[lightboxIndex].src}
              alt={selectedEvent.images[lightboxIndex].caption || 'Gallery image'}
            />
            {selectedEvent.images[lightboxIndex].caption && (
              <div className="lightbox-caption">
                <p>{selectedEvent.images[lightboxIndex].caption}</p>
              </div>
            )}
          </div>
          
          {selectedEvent.images.length > 1 && (
            <button className="lightbox-nav lightbox-next" onClick={goNext}>
              <ChevronRight size={36} />
            </button>
          )}

          <div className="lightbox-counter">
            {lightboxIndex + 1} / {selectedEvent.images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
