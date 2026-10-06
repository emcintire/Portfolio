import Link from 'next/link';

const TRAIL = 'M8 70C60 70 70 20 120 24s60 52 110 46 50-50 100-44 60 40 82 30';

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="page-container not-found__inner">
        <svg aria-hidden="true" className="not-found__trail" viewBox="0 0 420 90">
          <path className="not-found__trail-path" d={TRAIL} />
          <circle className="not-found__hiker" r="6">
            <animateMotion dur="9s" path={TRAIL} repeatCount="indefinite" rotate="auto" />
          </circle>
        </svg>
        <p className="eyebrow">404</p>
        <h1>
          The journey doesn&apos;t end here. 404 is just another path, one that we all must take.
        </h1>
        <p>The page may have moved, or the address may be incomplete.</p>
        <Link className="button button--primary" href="/">
          Return home
        </Link>
      </div>
    </section>
  );
}
