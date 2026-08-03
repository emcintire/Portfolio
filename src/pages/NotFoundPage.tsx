import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <div className="page-container not-found__inner">
        <p className="eyebrow">404</p>
        <h1>This trail ends here.</h1>
        <p>The page may have moved, or the address may be incomplete.</p>
        <Link className="button button--primary" to="/">
          Return home
        </Link>
      </div>
    </section>
  );
}
