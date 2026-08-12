/**
 * Renders a schema.org block. Server component, so the structured data is in
 * the prerendered HTML where crawlers read it rather than injected after
 * hydration.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        // Only ever fed build-time data from src/data, never user input. `<` is
        // escaped anyway so a stray "</script>" in copy cannot break out.
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
      type="application/ld+json"
    />
  );
}
