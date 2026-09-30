import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="page-container not-found__inner">
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
