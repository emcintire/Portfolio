import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BackArrow from '../../../../Buttons/BackArrow';
import "./Landscape.css";

function Landscape() {
    const storeLocation = (id) => {
        window.localStorage.removeItem("album");
        window.localStorage.setItem("album", id);
    };

    useEffect(() => {
        if (window.localStorage.getItem("album")) {
            document
                .getElementById(window.localStorage.getItem("album"))
                .scrollIntoView();
        } else {
            window.scrollTo(0, 0);
        }
    }, []);

    return (
        <>
            <div id="landscape-container">
                <BackArrow />
                <ul id="category-list">
                    <div className="category-container" id="roadtrip2022">
                        <Link
                            className="category-link"
                            to="/photography/landscape/roadtrip2022"
                            onClick={() => storeLocation("roadtrip2022")}
                        >
                            Roadtrip
                            <br />
                            <span className="cat-year">2022</span>
                        </Link>
                    </div>
                    <div className="category-container" id="yellowstone">
                        <Link
                            className="category-link"
                            to="/photography/landscape/yellowstone"
                            onClick={() => storeLocation("yellowstone")}
                        >
                            Yellowstone
                            <br />
                            <span className="cat-year">2021</span>
                        </Link>
                    </div>
                    <div className="category-container" id="tetons">
                        <Link
                            className="category-link"
                            to="/photography/landscape/tetons"
                            onClick={() => storeLocation("tetons")}
                        >
                            Grand Tetons <br />
                            <span className="cat-year">2021</span>
                        </Link>
                    </div>
                    <div className="category-container" id="alaska2020">
                        <Link
                            className="category-link"
                            to="/photography/landscape/alaska2020"
                            onClick={() => storeLocation("alaska2020")}
                        >
                            Alaska <br /> <span className="cat-year">2020</span>
                        </Link>
                    </div>
                    <div className="category-container" id="mammoth">
                        <Link
                            className="category-link"
                            to="/photography/landscape/mammoth"
                            onClick={() => storeLocation("mammoth")}
                        >
                            Mammoth <br />
                            <span className="cat-year">2020</span>
                        </Link>
                    </div>
                    <div className="category-container" id="yosemite">
                        <Link
                            className="category-link"
                            to="/photography/landscape/yosemite"
                            onClick={() => storeLocation("yosemite")}
                        >
                            Yosemite <br />
                            <span className="cat-year">2019</span>
                        </Link>
                    </div>
                    <div className="category-container" id="malabar">
                        <Link
                            className="category-link"
                            to="/photography/landscape/malabar"
                            onClick={() => storeLocation("malabar")}
                        >
                            Malabar <br />
                            <span className="cat-year">2019</span>
                        </Link>
                    </div>
                    <div className="category-container" id="roadtrip">
                        <Link
                            className="category-link"
                            to="/photography/landscape/roadtrip"
                            onClick={() => storeLocation("roadtrip")}
                        >
                            Roadtrip <br />
                            <span className="cat-year">2018</span>
                        </Link>
                    </div>
                    <div className="category-container" id="alaska2018">
                        <Link
                            className="category-link"
                            to="/photography/landscape/alaska2018"
                            onClick={() => storeLocation("alaska2018")}
                        >
                            Alaska <br /> <span className="cat-year">2018</span>
                        </Link>
                    </div>
                    <div className="category-container" id="summer">
                        <Link
                            className="category-link"
                            to="/photography/landscape/summer2017"
                            onClick={() => storeLocation("summer2017")}
                        >
                            Summer <br /> <span className="cat-year">2017</span>
                        </Link>
                    </div>
                </ul>
            </div>
        </>
    );
}

export default Landscape;
