import { StyledBurger } from './Burger.styled.ts';

export function Burger({ open, setOpen }: { open: boolean; setOpen(open: boolean): void }) {
  return (
    <StyledBurger open={open} id='burger' onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};
