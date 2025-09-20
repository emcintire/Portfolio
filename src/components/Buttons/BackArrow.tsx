import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export function BackArrow() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <IconButton onClick={goBack}>
      <ArrowBack htmlColor="white" fontSize="large" />
    </IconButton>
  );
}
