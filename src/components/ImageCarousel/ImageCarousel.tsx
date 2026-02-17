import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import './ImageCarousel.css';

type Props = {
  images: string[];
  alt: string;
};

export function ImageCarousel({ images, alt }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = trackRef.current.clientWidth * 0.6;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="screenshot-carousel">
      <div className="screenshot-track" ref={trackRef}>
        {images.map((src, i) => (
          <img key={i} src={src} className="screenshot-img" alt={`${alt} screenshot ${i + 1}`} />
        ))}
      </div>
      <button className="screenshot-arrow screenshot-arrow-left" onClick={() => scroll('left')} aria-label="Scroll left">
        <ChevronLeft />
      </button>
      <button className="screenshot-arrow screenshot-arrow-right" onClick={() => scroll('right')} aria-label="Scroll right">
        <ChevronRight />
      </button>
    </div>
  );
}
