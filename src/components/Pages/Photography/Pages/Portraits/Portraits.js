import React from "react";
import "./Portraits.css";
import "../../../../Navbar";
import { Link } from "react-router-dom";

function Portraits() {
    return (
        <>
            <div id="portraits-container">
                <ul id="category-list">
                    <div className="category-container" id="teddy-12m">
                        <Link
                            className="category-link"
                            to="/photography/portraits/teddy12m"
                        >
                            Teddy One Year
                            <br />
                            <span className="cat-year">2017</span>
                        </Link>
                    </div>
                    <div className="category-container" id="teddy-18m">
                        <Link
                            className="category-link"
                            to="/photography/portraits/teddy18m"
                        >
                            Teddy Year and a Half
                            <br />
                            <span className="cat-year">2018</span>
                        </Link>
                    </div>
                    <div className="category-container" id="beach">
                        <Link
                            className="category-link"
                            to="/photography/portraits/TrudyBeachMat"
                        >
                            Trudy Beach Maternity
                            <br />
                            <span className="cat-year">2019</span>
                        </Link>
                    </div>
                    <div className="category-container" id="snow">
                        <Link
                            className="category-link"
                            to="/photography/portraits/TrudySnowMat"
                        >
                            Trudy Snow Maternity
                            <br />
                            <span className="cat-year">2019</span>
                        </Link>
                    </div>
                    <div className="category-container" id="rio-3m">
                        <Link
                            className="category-link"
                            to="/photography/portraits/rio3m"
                        >
                            Rio Three Months
                            <br />
                            <span className="cat-year">2019</span>
                        </Link>
                    </div>
                    <div className="category-container" id="rio-8m">
                        <Link
                            className="category-link"
                            to="/photography/portraits/rio8m"
                        >
                            Rio Eight Months
                            <br />
                            <span className="cat-year">2019</span>
                        </Link>
                    </div>
                    <div className="category-container" id="rio-15m">
                        <Link
                            className="category-link"
                            to="/photography/portraits/rio15m"
                        >
                            Rio Fifteen Months
                            <br />
                            <span className="cat-year">2020</span>
                        </Link>
                    </div>
                </ul>
            </div>
        </>
    );
}

export default Portraits;
