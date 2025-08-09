/*import React, { useState } from 'react';
import './ImageCarousel.css'

export default function ImageCarousel({ listing }) {
    if (!listing || !listing.images || listing.images.length === 0) {
        return null;
    }
    const [activeIndex, setActiveIndex] = useState(0)

    // Separate featured and regular images
    const featuredImages = listing.images.filter(image => image.featured);
    const regularImages = listing.images.filter(image => !image.featured);
    const allImages = [...featuredImages, ...regularImages];
    const totalImages = allImages.length;

    return (
        <div className="image-carousel">
            {totalImages > 1 && 
                allImages.map((image, index) => {
                    const distance = Math.abs(index-activeIndex)
                    const offset = (index - activeIndex) * 40; // px shift
                    const zIndex = totalImages - distance;
                    const scale = 1 - distance * 0.1;
                        return (
                        <img 
                        key={index}
                        src={image.url}
                        alt={image.filename}
                        style={{ 
                            height : '20rem',
                            width : '20rem',
                            borderRadius: '20px',
                            transform: `scale(${scale})`, //translateX(${offset}px) 
                            zIndex : zIndex,
                            opacity: distance > 3 ? 0 : 1, // fade far images
                        }}
                        />
                    )   
                })
            }
            <br />  
            <button onClick={() => setActiveIndex((prevIndex) => (prevIndex-1+totalImages)%totalImages)}>prev</button>
            <button onClick={() => setActiveIndex((prevIndex) => (prevIndex+1)%totalImages)}>next</button>
        </div>
    )   
};*/


import React, { useState, useEffect, useMemo, useRef } from 'react';
import './ImageCarousel.css';

export default function ImageCarousel({ listing }) {
  if (!listing?.images?.length) return null;

  const images = listing.images;

  // Keep featured first (same as your idea)
  const allImages = useMemo(() => {
    const featured = images.filter(img => img.featured);
    const regular = images.filter(img => !img.featured);
    return [...featured, ...regular];
  }, [images]);

  const total = allImages.length;

  // start at first image (since we put featured first, that's the featured)
  const [activeIndex, setActiveIndex] = useState(0);

  // Clamp/reset activeIndex if images change
  useEffect(() => {
    if (activeIndex >= total) setActiveIndex(Math.max(0, total - 1));
  }, [total, activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setActiveIndex(p => (p + 1) % total);
      if (e.key === 'ArrowLeft') setActiveIndex(p => (p - 1 + total) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  // Simple touch/swipe
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => touchStartX.current = e.touches[0].clientX;
  const handleTouchEnd = (e) => {
    const start = touchStartX.current;
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    const threshold = 40;
    if (dx > threshold) setActiveIndex(p => (p - 1 + total) % total);
    else if (dx < -threshold) setActiveIndex(p => (p + 1) % total);
    touchStartX.current = null;
  };

  const offsetGap = 80;       // px per step (tweak)
  const visibleRange = 4;     // how many around active we render/keep visible

  return (
    <div
      className="image-carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {allImages.map((image, index) => {
        // Circular signed distance so items near array ends wrap visually
        let diff = index - activeIndex;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        const signed = diff;
        const distance = Math.abs(signed);

        // Skip rendering extremely-far images to save DOM/paint (optional)
        if (distance > Math.max(visibleRange, Math.floor(total / 2))) return null;

        const offset = signed * offsetGap;
        // clamp scale so it never becomes negative
        const scale = Math.max(0.6, 1 - distance * 0.08);
        const zIndex = total - distance; // center gets highest z
        const isActive = distance === 0;
        const hidden = distance > visibleRange;

        return (
          <img
            key={image.id || image.url || index}
            className={`carousel-img ${isActive ? 'active' : ''}`}
            src={image.url}
            alt={image.alt || image.filename || `Image ${index + 1}`}
            loading={distance <= 1 ? 'eager' : 'lazy'}
            onClick={() => setActiveIndex(index)}
            aria-hidden={hidden}
            style={{
              zIndex,
              // center first, then shift & scale (GPU accelerated)
              transform: `translate(-50%, -50%) translate3d(${offset}px, 0, 0) scale(${scale})`,
              opacity: hidden ? 0 : 1,
              pointerEvents: isActive ? 'auto' : 'none',
            }}
          />
        );
      })}

      {total > 1 && (
        <>
          <button
            className="carousel-btn prev"
            onClick={() => setActiveIndex(p => (p - 1 + total) % total)}
            aria-label="Previous image"
          >
            &#8592;
          </button>
          <button
            className="carousel-btn next"
            onClick={() => setActiveIndex(p => (p + 1) % total)}
            aria-label="Next image"
          >
            &#8594;
          </button>
        </>
      )}
    </div>
  );
}

