import { describe, expect, it } from 'vitest';

import { isTransitionableClick } from './motion';

const location = { origin: 'http://localhost:3000', pathname: '/' };

const plainClick = {
  altKey: false,
  button: 0,
  ctrlKey: false,
  defaultPrevented: false,
  metaKey: false,
  shiftKey: false,
};

const anchor = (href: string, attributes: Record<string, string> = {}) => {
  const element = document.createElement('a');
  element.setAttribute('href', href);
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
  return element;
};

describe('isTransitionableClick', () => {
  it('animates a plain click to another page on this site', () => {
    expect(isTransitionableClick(plainClick, anchor('/projects'), location)).toBe(true);
  });

  it('leaves the current page, hash jumps and other sites alone', () => {
    expect(isTransitionableClick(plainClick, anchor('/'), location)).toBe(false);
    expect(isTransitionableClick(plainClick, anchor('#main-content'), location)).toBe(false);
    expect(isTransitionableClick(plainClick, anchor('https://github.com'), location)).toBe(false);
    expect(isTransitionableClick(plainClick, anchor('mailto:someone@example.com'), location)).toBe(
      false,
    );
  });

  it('leaves new tabs and downloads to the browser', () => {
    expect(
      isTransitionableClick(plainClick, anchor('/about', { target: '_blank' }), location),
    ).toBe(false);
    expect(
      isTransitionableClick(plainClick, anchor('/resume.pdf', { download: '' }), location),
    ).toBe(false);
    expect(
      isTransitionableClick({ ...plainClick, metaKey: true }, anchor('/about'), location),
    ).toBe(false);
    expect(isTransitionableClick({ ...plainClick, button: 1 }, anchor('/about'), location)).toBe(
      false,
    );
  });

  it('defers to anything that already handled the click', () => {
    expect(
      isTransitionableClick({ ...plainClick, defaultPrevented: true }, anchor('/about'), location),
    ).toBe(false);
  });
});
