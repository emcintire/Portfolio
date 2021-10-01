import React from "react";
import { BackArrowStyled } from "./BackArrow.styled";
import "material-icons/iconfont/round.css";

const BackArrow = () => {
    return (
        <BackArrowStyled
            id="back-arrow-btn"
            onClick={() => {
                window.history.back();
            }}
        >
            <i className="material-icons-round back-arrow">
                arrow_back_ios_new
            </i>
        </BackArrowStyled>
    );
};

export default BackArrow;
