'use client';

import { useCallback, useId, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

import { runViewTransition } from '@/lib/motion';

const STORAGE_KEY = 'portfolio-photo-columns';
/** Fired on this window when the preference changes; `storage` only reaches other tabs. */
const CHANGE_EVENT = 'portfolio-photo-columns';

const WIDTHS = [
  { auto: 1, max: 2, query: '(max-width: 36rem)' },
  { auto: 2, max: 3, query: '(max-width: 48rem)' },
  { auto: 3, max: 4, query: '(max-width: 64rem)' },
] as const;
const WIDEST = { auto: 4, max: 6 } as const;

const AUTO_SIZES =
  '(max-width: 36rem) 100vw, (max-width: 48rem) 50vw, (max-width: 64rem) 34vw, 25vw';

const widthIndex = () => WIDTHS.findIndex(({ query }) => window.matchMedia(query).matches);

const subscribeToWidth = (onChange: () => void) => {
  const lists = WIDTHS.map(({ query }) => window.matchMedia(query));
  lists.forEach((list) => list.addEventListener('change', onChange));
  return () => lists.forEach((list) => list.removeEventListener('change', onChange));
};

const readPreference = () => {
  try {
    const value = Number(localStorage.getItem(STORAGE_KEY));
    return Number.isInteger(value) && value >= 1 ? value : null;
  } catch {
    return null;
  }
};

const subscribeToPreference = (onChange: () => void) => {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
};

const writePreference = (columns: number) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(columns));
  } catch {
    // Private mode or blocked storage: the choice just won't outlive the page.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

export function usePhotoColumns() {
  // -2 on the server: nothing is known until the browser can be asked.
  const width = useSyncExternalStore(subscribeToWidth, widthIndex, () => -2);
  const preference = useSyncExternalStore(subscribeToPreference, readPreference, () => null);

  const isReady = width !== -2;
  const { auto, max } = width >= 0 ? WIDTHS[width] : WIDEST;
  const columns = isReady && preference ? Math.min(preference, max) : null;

  const setColumns = useCallback((next: number) => {
    // A cross-fade between the two layouts, rather than every photograph
    // jumping to its new column at once.
    runViewTransition('grid', () => flushSync(() => writePreference(next)));
  }, []);

  return {
    columns,
    isReady,
    max,
    setColumns,
    sizes: columns ? `${Math.ceil(100 / columns)}vw` : AUTO_SIZES,
    value: columns ?? auto,
  };
}

type PhotoGridSizeProps = Pick<
  ReturnType<typeof usePhotoColumns>,
  'isReady' | 'max' | 'setColumns' | 'value'
>;

/** The columns slider in an album's header. Script-only, so it renders nothing on the server. */
export function PhotoGridSize({ isReady, max, setColumns, value }: PhotoGridSizeProps) {
  const id = useId();
  if (!isReady) return null;

  return (
    <div className="photo-size">
      <label htmlFor={id}>Columns</label>
      <svg aria-hidden="true" className="photo-size__icon" viewBox="0 0 16 16">
        <rect height="12" rx="1.5" width="12" x="2" y="2" />
      </svg>
      <input
        aria-valuetext={`${value} ${value === 1 ? 'column' : 'columns'}`}
        id={id}
        max={max}
        min={1}
        onChange={(event) => setColumns(Number(event.target.value))}
        step={1}
        type="range"
        value={value}
      />
      <svg aria-hidden="true" className="photo-size__icon" viewBox="0 0 16 16">
        <rect height="5" rx="1" width="5" x="2" y="2" />
        <rect height="5" rx="1" width="5" x="9" y="2" />
        <rect height="5" rx="1" width="5" x="2" y="9" />
        <rect height="5" rx="1" width="5" x="9" y="9" />
      </svg>
      <output aria-hidden="true" className="photo-size__value" htmlFor={id}>
        {value}
      </output>
    </div>
  );
}
