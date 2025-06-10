import React, { useRef, useEffect, useState, useCallback } from 'react';
import { FaTimes } from 'react-icons/fa';
import './PhotoGallery.scss';

interface VirtualizedGridProps<T> {
  items: T[];
  itemWidth: number;
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  buffer?: number;
}

// Simple virtualization component
const VirtualizedGrid = <T extends { id: number | string }>({ 
  items, 
  itemWidth, 
  itemHeight, 
  renderItem, 
  buffer = 2 
}: VirtualizedGridProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const itemsPerRow = Math.max(1, Math.floor(dimensions.width / itemWidth));
  const rowCount = Math.ceil(items.length / itemsPerRow);
  const totalHeight = rowCount * itemHeight;

  const updateVisibleRange = useCallback(() => {
    if (!containerRef.current) return;
    
    const scrollTop = containerRef.current.scrollTop;
    const containerHeight = containerRef.current.clientHeight;
    
    const startRow = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
    const endRow = Math.min(
      rowCount - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + buffer
    );
    
    setVisibleRange({
      start: Math.max(0, startRow * itemsPerRow),
      end: Math.min(items.length - 1, (endRow + 1) * itemsPerRow - 1)
    });
  }, [itemHeight, itemsPerRow, rowCount, items.length, buffer]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
      updateVisibleRange();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateVisibleRange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', updateVisibleRange, { passive: true });
    return () => container.removeEventListener('scroll', updateVisibleRange);
  }, [updateVisibleRange]);

  // Only render visible items and a buffer
  const visibleItems = items.slice(visibleRange.start, visibleRange.end + 1);
  const offsetY = Math.floor(visibleRange.start / itemsPerRow) * itemHeight;

  return (
    <div 
      ref={containerRef} 
      className="virtualized-container"
      style={{ overflowY: 'auto', height: '100%' }}
    >
      <div 
        className="virtualized-content" 
        style={{
          position: 'relative',
          height: `${totalHeight}px`,
          width: '100%'
        }}
      >
        <div 
          className="virtualized-items"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `translateY(${offsetY}px)`,
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${itemWidth}px, 1fr))`,
            gridAutoRows: itemHeight,
            width: '100%',
            gap: '1rem',
            padding: '0 1.5rem',
            boxSizing: 'border-box'
          }}
        >
          {visibleItems.map((item, index) => (
            <div key={item.id} style={{ width: '100%', height: '100%' }}>
              {renderItem(item, visibleRange.start + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ImageType {
  id: number;
  url: string;
  alt: string;
  title: string;
}

// Local photobook images
const sampleImages: ImageType[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  url: `/images/photobook (${i + 1}).jpg`,
  alt: `웨딩사진 ${i + 1}`,
  title: `소중한 추억 ${i + 1}`
}));

const PhotoGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
      containerRef.current.style.userSelect = 'none';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.removeProperty('user-select');
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.removeProperty('user-select');
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Close modal when clicking outside the image
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('mousedown', handleClickOutside);
      // Close on escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [selectedImage]);

  const renderGalleryItem = useCallback((image: ImageType) => (
    <div 
      className="gallery-item"
      onClick={() => handleImageClick(image)}
      onMouseDown={(e) => e.preventDefault()} // Prevent text selection
    >
      <img 
        src={image.url} 
        alt={image.alt} 
        title={image.title}
        loading="lazy"
        width={180}
        height={200}
        decoding="async"
      />
      <div className="image-overlay">
        <span>{image.title}</span>
      </div>
    </div>
  ), [handleImageClick]);

  return (
    <div className="photo-gallery">
      <h2>우리의 추억</h2>
      <div 
        ref={containerRef}
        className="gallery-container"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <VirtualizedGrid
          items={sampleImages}
          itemWidth={180}
          itemHeight={200}
          renderItem={renderGalleryItem}
        />
      </div>

      {selectedImage && (
        <div className="image-modal">
          <div className="modal-content" ref={modalRef}>
            <button className="close-button" onClick={closeModal}>
              <FaTimes />
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.alt}
              className="enlarged-image"
            />
            <div className="image-caption">{selectedImage.title}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
