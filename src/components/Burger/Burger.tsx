import './Burger.css';

export const Burger = ({ open, setOpen }: { open: boolean; setOpen(open: boolean): void }) => {
  return (
    <button
      className={`burger${open ? ' open' : ''}`}
      id='burger'
      onClick={() => setOpen(!open)}
      aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={open}
    >
      <div />
      <div />
      <div />
    </button>
  );
}
