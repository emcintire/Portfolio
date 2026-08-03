import type { ReactNode } from 'react';

type SectionIntroProps = {
  eyebrow?: string;
  heading: string;
  text?: ReactNode;
};

export function SectionIntro({ eyebrow, heading, text }: SectionIntroProps) {
  return (
    <div className="section-intro">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{heading}</h2>
      {text && <div className="section-intro__text">{text}</div>}
    </div>
  );
}
