import styled from 'styled-components';

export const BackArrowStyled = styled.button`
    position: absolute;
    top: 2rem;
    left: 2rem;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 69;

    @media (max-width: 600px) {
        top: 1.8rem;
        left: 1.5rem;
    }
`;
