import { type CSSProperties, Fragment } from 'react';

type SplitWordsProps = {
  /** Where this run's stagger starts, to continue one begun by an earlier run. */
  from?: number;
  text: string;
};

/**
 * Wraps each word in a clipping mask so headings can rise into place word by
 * word (`.split-word` in globals.css). The spaces stay real text between the
 * masks, so the line wraps normally and the heading's accessible name is the
 * plain sentence.
 */
export function SplitWords({ from = 0, text }: SplitWordsProps) {
  const words = text.split(' ');

  return words.map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      <span className="split-word" style={{ '--word-index': from + index } as CSSProperties}>
        <span>{word}</span>
      </span>
      {index < words.length - 1 && ' '}
    </Fragment>
  ));
}
