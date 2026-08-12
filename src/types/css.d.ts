// Next's bundler handles global stylesheet imports, and its shipped types only
// declare `*.module.css`. This project keeps `noUncheckedSideEffectImports` on,
// which makes TypeScript check side-effect-only imports like the layout's
// `import './globals.css'`, so the pattern needs declaring.
declare module '*.css';
