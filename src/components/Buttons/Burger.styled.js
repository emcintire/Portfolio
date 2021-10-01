import styled from "styled-components";

export const StyledBurger = styled.button`
    position: absolute;
    top: 2rem;
    right: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 696969;

    &:focus {
        outline: none;
    }

    div {
        width: 2rem;
        height: 0.25rem;
        background: white;
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;

        :first-child {
            transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
        }

        :nth-child(2) {
            opacity: ${({ open }) => (open ? "0" : "1")};
            transform: ${({ open }) =>
                open ? "translateX(20px)" : "translateX(0)"};
        }

        :nth-child(3) {
            transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
        }
    }

    @media (max-width: 600px) {
        top: 1.8rem;
        right: 1.8rem;
        width: auto;
        height: 1.6rem;
        div {
            width: 1.6rem;
            height: 0.25rem;
        }
    }
`;
