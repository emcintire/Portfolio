import { BackArrowStyled } from './BackArrow.styled.ts';
import 'material-icons/iconfont/round.css';

export function BackArrow() {
  return (
    <BackArrowStyled
      id='back-arrow-btn'
      onClick={() => {
        window.history.back();
      }}>
      <i className='material-icons-round back-arrow'>arrow_back_ios_new</i>
    </BackArrowStyled>
  );
};
