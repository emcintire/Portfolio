import type { ReactNode } from 'react';

import type { SocialIcon } from '@/types';

type IconName =
  | SocialIcon
  | 'arrow-left'
  | 'arrow-right'
  | 'close'
  | 'download'
  | 'external'
  | 'menu'
  | 'moon'
  | 'sun';

type IconProps = {
  name: IconName;
  size?: number;
};

const paths: Record<IconName, ReactNode> = {
  'arrow-left': <path d="M15 18l-6-6 6-6M9 12h10" />,
  'arrow-right': <path d="M9 18l6-6-6-6m6 6H5" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  download: <path d="M12 3v12m0 0l5-5m-5 5l-5-5M5 21h14" />,
  external: <path d="M14 4h6v6m0-6l-9 9M20 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h5" />,
  github: (
    <path
      d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.82a9.6 9.6 0 012.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0012 2z"
      fill="currentColor"
      stroke="none"
    />
  ),
  instagram: (
    <>
      <rect height="16" rx="4" width="16" x="4" y="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" fill="currentColor" r="1" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect height="16" rx="2" width="16" x="4" y="4" />
      <path d="M8 10v7m0-10v.01M12 17v-4a3 3 0 016 0v4m-6-7v7" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  moon: <path d="M20 15.5A8.5 8.5 0 118.5 4 7 7 0 0020 15.5z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3l1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3l1.42-1.42" />
    </>
  ),
};

export function Icon({ name, size = 20 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  );
}
