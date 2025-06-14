import { useRef, useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './PhotoGallery.scss';

interface ImageType {
  id: number;
  url: string;
  alt: string;
  title: string;
}

// Local photobook images (commented out to prevent 404 errors)
const sampleImages: ImageType[] = []; 
/* Array.from({ length: 20 }, (_, i) => {
  const imageNumber = i + 1;
  return {
    id: imageNumber,
    url: `images/photobook%20(${imageNumber}).jpg`,
    alt: `Wedding photo ${imageNumber}`,
    title: `Our Memory #${imageNumber}`
  };
}); */

const PhotoGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Close modal when clicking outside the image or pressing escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedImage]);

  // Handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'placeholder.jpg';
  };

  return (
    <div className="photo-gallery">
      <h2>Our Moments</h2>
      <div className="gallery-rows">
        {/* First row */}
        <div className="gallery-row">
          {sampleImages.slice(0, 10).map((item) => (
            <div key={item.id} className="gallery-item" onClick={() => handleImageClick(item)}>
              <img 
                src={item.url} 
                alt={item.alt}
                loading="lazy"
                onError={handleImageError}
              />
              <div className="image-overlay">
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Second row */}
        <div className="gallery-row">
          {sampleImages.slice(10).map((item) => (
            <div key={item.id} className="gallery-item" onClick={() => handleImageClick(item)}>
              <img 
                src={item.url} 
                alt={item.alt}
                loading="lazy"
                onError={handleImageError}
              />
              <div className="image-overlay">
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image modal */}
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
              onError={handleImageError}
            />
            <div className="image-caption">{selectedImage.title}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
