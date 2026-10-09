/**
 * Shared plumbing for the site's motion: the reduced-motion check every effect
 * defers to, and a View Transitions wrapper that degrades to a plain update.
 */

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** A mouse or trackpad — the pointer that hover-driven effects are written for. */
export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Which transition is running, as `html[data-transition]`. The stylesheet keys
 * the page wipe and the theme reveal off it, since both animate the same
 * ::view-transition-*(root) pseudo-elements. `grid` (the photo grid's column
 * slider) has no rules of its own and gets the browser's default cross-fade.
 */
export type TransitionKind = 'grid' | 'page' | 'theme';

type ViewTransitionLike = { finished: Promise<void>; ready: Promise<void> };
type DocumentWithViewTransitions = Document & {
  startViewTransition?: (update: () => Promise<void> | void) => ViewTransitionLike;
};

/** Whether a view transition would actually run, rather than fall back to a plain update. */
export const canViewTransition = () =>
  typeof document !== 'undefined' &&
  typeof (document as DocumentWithViewTransitions).startViewTransition === 'function' &&
  !prefersReducedMotion();

/**
 * Runs `update` inside a view transition when `canViewTransition()`; otherwise
 * just runs it. Returns the transition so callers can drive extra animation
 * once it is `ready`.
 */
export function runViewTransition(
  kind: TransitionKind,
  update: () => Promise<void> | void,
): ViewTransitionLike | null {
  const doc = document as DocumentWithViewTransitions;

  if (!canViewTransition() || !doc.startViewTransition) {
    void update();
    return null;
  }

  const root = document.documentElement;
  root.dataset.transition = kind;
  const transition = doc.startViewTransition.call(doc, update);
  // Skipped transitions reject `finished`; the update has still run.
  transition.finished.catch(() => undefined).finally(() => delete root.dataset.transition);
  return transition;
}

/**
 * Whether a click on `anchor` should become an animated in-app navigation:
 * a plain left click on a same-origin link to a different page. Everything
 * else — new tabs, downloads, hash jumps, mailto — is left to the browser.
 */
export function isTransitionableClick(
  event: Pick<
    MouseEvent,
    'altKey' | 'button' | 'ctrlKey' | 'defaultPrevented' | 'metaKey' | 'shiftKey'
  >,
  anchor: HTMLAnchorElement,
  location: Pick<Location, 'origin' | 'pathname'>,
) {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target && anchor.target !== '_self') return false;
  if (anchor.hasAttribute('download')) return false;

  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('#')) return false;

  const url = new URL(anchor.href, location.origin);
  if (url.origin !== location.origin) return false;

  return url.pathname !== location.pathname;
}
