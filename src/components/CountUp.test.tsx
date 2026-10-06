import { describe, expect, it } from 'vitest';

import { parseStat } from './CountUp';

describe('parseStat', () => {
  it('separates the number to count from the text around it', () => {
    expect(parseStat('10k+')).toEqual({ decimals: 0, prefix: '', suffix: 'k+', target: 10 });
    expect(parseStat('40×')).toEqual({ decimals: 0, prefix: '', suffix: '×', target: 40 });
    expect(parseStat('$2.5M')).toEqual({ decimals: 1, prefix: '$', suffix: 'M', target: 2.5 });
  });

  it('declines values with nothing to count', () => {
    expect(parseStat('Many')).toBeNull();
  });
});
