import { useState } from 'react';

import { siteMetadata } from '@/data/site';

export function CopyEmailButton() {
  const [status, setStatus] = useState('');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteMetadata.email);
      setStatus('Email address copied.');
    } catch {
      setStatus(`Copying is unavailable. Email ${siteMetadata.email}.`);
    }
  };

  return (
    <>
      <button className="button button--secondary" onClick={copyEmail} type="button">
        Copy email
      </button>
      <span aria-live="polite" className="sr-only" role="status">
        {status}
      </span>
    </>
  );
}
