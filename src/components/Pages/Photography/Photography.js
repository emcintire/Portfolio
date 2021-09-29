import React from "react";
import { Link } from "react-router-dom";
import "./Photography.scss";
import "../../Navbar";

function Photography() {
    return (
        <>
            <div id="photography-container">
                <ul id="category-list">
                    <div className="category-container" id="landscape">
                        <Link
                            className="category-link"
                            to="/photography/landscape"
                        >
                            Landscape
                        </Link>
                    </div>
                    <div className="category-container" id="portraits">
                        <Link
                            className="category-link"
                            to="/photography/portraits"
                        >
                            Portraits
                        </Link>
                    </div>
                    <div className="category-container" id="animals">
                        <Link
                            className="category-link"
                            to="/photography/animals"
                        >
                            Animals
                        </Link>
                    </div>
                    <div className="category-container" id="misc">
                        <Link
                            className="category-link"
                            to="/photography/miscellaneous"
                        >
                            Miscellaneous
                        </Link>
                    </div>
                </ul>
            </div>
        </>
    );
}

export default Photography;
