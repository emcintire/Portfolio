import React from "react";
import { bool, func } from "prop-types";
import { StyledBurger } from "./Burger.styled.js";

const Burger = ({ open, setOpen }) => {
    return (
        <StyledBurger
            open={open}
            id="burger"
            onClick={() => {
                setOpen(!open);
            }}
        >
            <div />
            <div />
            <div />
        </StyledBurger>
    );
};
Burger.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired,
};
export default Burger;
