import React, { useEffect } from "react";
import "./Portraits.css";
import { Link } from "react-router-dom";

function Portraits() {
    const storeLocation = (id) => {
        window.localStorage.removeItem("album");
        window.localStorage.setItem("album", id);
    };

    useEffect(() => {
        if (window.localStorage.getItem("album")) {
            if (
                !document.getElementById(window.localStorage.getItem("album"))
            ) {
                window.localStorage.removeItem("album");
                window.scrollTo(0, 0);
            } else {
                document
                    .getElementById(window.localStorage.getItem("album"))
                    .scrollIntoView();
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, []);

    return (
        <>
            <div id="portraits-container">
                <ul id="category-list">
                    <div className="category-container" id="teddy-12m">
                        <Link
                            className="category-link"
                            to="/photography/portraits/teddy12m"
                            onClick={() => storeLocation("teddy-12m")}
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
                            onClick={() => storeLocation("teddy-18m")}
                        >
                            Teddy Year <br />
                            and a Half
                            <br />
                            <span className="cat-year">2018</span>
                        </Link>
                    </div>
                    <div className="category-container" id="beach">
                        <Link
                            className="category-link"
                            to="/photography/portraits/TrudyBeachMat"
                            onClick={() => storeLocation("beach")}
                        >
                            Trudy Beach <br /> Maternity
                            <br />
                            <span className="cat-year">2019</span>
                        </Link>
                    </div>
                    <div className="category-container" id="snow">
                        <Link
                            className="category-link"
                            to="/photography/portraits/TrudySnowMat"
                            onClick={() => storeLocation("snow")}
                        >
                            Trudy Snow <br /> Maternity
                            <br />
                            <span className="cat-year">2019</span>
                        </Link>
                    </div>
                    <div className="category-container" id="rio-3m">
                        <Link
                            className="category-link"
                            to="/photography/portraits/rio3m"
                            onClick={() => storeLocation("rio-3m")}
                        >
                            Rio Three <br /> Months
                            <br />
                            <span className="cat-year">2019</span>
                        </Link>
                    </div>
                    <div className="category-container" id="rio-8m">
                        <Link
                            className="category-link"
                            to="/photography/portraits/rio8m"
                            onClick={() => storeLocation("rio-8m")}
                        >
                            Rio Eight <br /> Months
                            <br />
                            <span className="cat-year">2019</span>
                        </Link>
                    </div>
                    <div className="category-container" id="rio-15m">
                        <Link
                            className="category-link"
                            to="/photography/portraits/rio15m"
                            onClick={() => storeLocation("rio-15m")}
                        >
                            Rio Fifteen
                            <br /> Months
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
