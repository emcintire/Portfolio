import { useCallback, useEffect, useRef } from 'react';

export const useRevealOnIntersect = (options: IntersectionObserverInit = { threshold: 0.2 }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getObserver = () => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observerRef.current?.unobserve(entry.target);
            }
          }
        },
        options,
      );
    }
    return observerRef.current;
  };

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  return useCallback((el: HTMLElement | null) => {
    if (el) getObserver().observe(el);
  }, []);
};
