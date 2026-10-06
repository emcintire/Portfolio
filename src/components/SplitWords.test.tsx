import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SplitWords } from './SplitWords';

describe('SplitWords', () => {
  it('keeps the heading readable as one plain sentence', () => {
    render(
      <h1>
        <SplitWords text="Come with me if you want to" /> <SplitWords from={7} text="ship." />
      </h1>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Come with me if you want to ship.' }),
    ).toBeInTheDocument();
  });

  it('staggers words in order, continuing from where an earlier run left off', () => {
    const { container } = render(<SplitWords from={3} text="one two" />);
    const indices = [...container.querySelectorAll<HTMLElement>('.split-word')].map((word) =>
      word.style.getPropertyValue('--word-index'),
    );

    expect(indices).toEqual(['3', '4']);
  });
});
