import './Burger.css';

export const Burger = ({ open, setOpen }: { open: boolean; setOpen(open: boolean): void }) => {
  return (
    <button className={`burger${open ? ' open' : ''}`} id='burger' onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </button>
  );
}
