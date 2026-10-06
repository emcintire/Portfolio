'use client';

import { useEffect, useRef } from 'react';

import { hasFinePointer, prefersReducedMotion } from '@/lib/motion';

/** Elements that summon the cursor bubble; the attribute's value is its label. */
const LABEL_SELECTOR = '[data-cursor-label]';
/** Fraction of the remaining distance the bubble covers each frame — its lag. */
const BUBBLE_EASING = 0.3;

type Point = { x: number; y: number };

/**
 * Mouse-only flourishes, all off for touch and under reduced motion:
 *
 * - Over `[data-cursor-label]` cards, a bubble with that label trails the
 *   cursor, standing in for it there (the stylesheet hides the native one).
 * - Elements with the `pointer-field` class get `--pointer-x/-y` (-1 to 1
 *   across the viewport), which the hero's contour rings use for parallax.
 *   They're set per element rather than on :root so a move restyles only those.
 */
export function PointerEffects() {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bubble = bubbleRef.current;
    const label = labelRef.current;
    if (!bubble || !label || !hasFinePointer() || prefersReducedMotion()) return undefined;

    const fields = document.getElementsByClassName(
      'pointer-field',
    ) as HTMLCollectionOf<HTMLElement>;
    const pointer: Point = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const bubblePosition: Point = { ...pointer };
    let frame = 0;
    let labelled: HTMLElement | null = null;

    const updateBubble = (target: Element | null) => {
      const element = target?.closest<HTMLElement>(LABEL_SELECTOR) ?? null;
      if (element === labelled) return;
      labelled = element;
      if (element) label.textContent = element.dataset.cursorLabel ?? '';
      bubble.dataset.state = element ? 'visible' : 'hidden';
    };

    const tick = () => {
      bubblePosition.x += (pointer.x - bubblePosition.x) * BUBBLE_EASING;
      bubblePosition.y += (pointer.y - bubblePosition.y) * BUBBLE_EASING;
      bubble.style.transform = `translate3d(${bubblePosition.x}px, ${bubblePosition.y}px, 0)`;

      const px = ((pointer.x / window.innerWidth) * 2 - 1).toFixed(3);
      const py = ((pointer.y / window.innerHeight) * 2 - 1).toFixed(3);
      for (const field of fields) {
        field.style.setProperty('--pointer-x', px);
        field.style.setProperty('--pointer-y', py);
      }

      const settled =
        Math.abs(pointer.x - bubblePosition.x) < 0.1 &&
        Math.abs(pointer.y - bubblePosition.y) < 0.1;
      frame = settled ? 0 : window.requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      updateBubble(event.target as Element | null);
      schedule();
    };

    // Scrolling moves the page under a still cursor without any pointermove.
    const handleScroll = () => {
      updateBubble(document.elementFromPoint(pointer.x, pointer.y));
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      updateBubble(null);
    };

    // The card is about to become a different page; don't carry its label over.
    const handleClick = () => updateBubble(null);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerout', handlePointerOut);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div aria-hidden="true" className="cursor-bubble" data-state="hidden" ref={bubbleRef}>
      <span className="cursor-bubble__label" ref={labelRef} />
    </div>
  );
}
