import { useCallback, useEffect, useRef } from 'react';

type RevealOptions = IntersectionObserverInit;

const getThresholdKey = (threshold: RevealOptions['threshold']) => {
  if (Array.isArray(threshold)) {
    return threshold.join(',');
  }
  if (threshold === undefined) return '';
  return String(threshold);
};

export const useRevealOnIntersect = (options: RevealOptions = { threshold: 0.2 }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Record<number, HTMLElement | null>>({});

  const getRevealRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      const prev = elementsRef.current[index];
      if (prev && observerRef.current) {
        observerRef.current.unobserve(prev);
      }
      elementsRef.current[index] = el;
      if (el && observerRef.current) {
        observerRef.current.observe(el);
      }
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        }
      },
      options,
    );

    observerRef.current = observer;

    for (const el of Object.values(elementsRef.current)) {
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
      observerRef.current = null;
      elementsRef.current = {};
    };
  }, [options.root, options.rootMargin, getThresholdKey(options.threshold)]);

  return getRevealRef;
};
