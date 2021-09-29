import React from "react";
import "./Landscape.css";
import "../../../../Navbar";
import { Link } from "react-router-dom";

function Landscape() {
    return (
        <>
            <div id="landscape-container">
                <ul id="category-list">
                    <div className="category-container" id="yellowstone">
                        <Link
                            className="category-link"
                            to="/photography/landscape/yellowstone"
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
                        >
                            Grand Tetons <br />
                            <span className="cat-year">2021</span>
                        </Link>
                    </div>
                    <div className="category-container" id="alaska2020">
                        <Link
                            className="category-link"
                            to="/photography/landscape/alaska2020"
                        >
                            Alaska <br /> <span className="cat-year">2020</span>
                        </Link>
                    </div>
                    <div className="category-container" id="mammoth">
                        <Link
                            className="category-link"
                            to="/photography/landscape/mammoth"
                        >
                            Mammoth <br />
                            <span className="cat-year">2020</span>
                        </Link>
                    </div>
                    <div className="category-container" id="yosemite">
                        <Link
                            className="category-link"
                            to="/photography/landscape/yosemite"
                        >
                            Yosemite <br />
                            <span className="cat-year">2019</span>
                        </Link>
                    </div>
                    <div className="category-container" id="malabar">
                        <Link
                            className="category-link"
                            to="/photography/landscape/malabar"
                        >
                            Malabar <br />
                            <span className="cat-year">2019</span>
                        </Link>
                    </div>
                    <div className="category-container" id="roadtrip">
                        <Link
                            className="category-link"
                            to="/photography/landscape/roadtrip"
                        >
                            Roadtrip <br />
                            <span className="cat-year">2018</span>
                        </Link>
                    </div>
                    <div className="category-container" id="alaska2018">
                        <Link
                            className="category-link"
                            to="/photography/landscape/alaska2018"
                        >
                            Alaska <br /> <span className="cat-year">2018</span>
                        </Link>
                    </div>
                    <div className="category-container" id="summer">
                        <Link
                            className="category-link"
                            to="/photography/landscape/summer2017"
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
