import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export function Burger({ open, setOpen }: { open: boolean; setOpen(open: boolean): void }) {
  return (
    <IconButton onClick={() => setOpen(!open)}>
      <Menu /> 
    </IconButton>
  );
};
