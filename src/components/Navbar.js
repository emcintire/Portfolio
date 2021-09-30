import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { useMediaQuery } from "react-responsive";
import "material-icons/iconfont/round.css";
import "./Navbar.css";
import $ from "jquery";
import Burger from "./Burger.js";

function Navbar() {
    const isMobile = useMediaQuery({ query: `(max-width: 600px)` });
    const navStyles = { transform: "translateX(0)" };
    const [open, setOpen] = useState(false);

    let location = useLocation();

    useEffect(() => {
        let pName = location.pathname.split("/", 2)[1];

        switch (pName) {
            case "":
                $("#nav").find(".active").removeClass("active");
                $("#home").addClass("active");
                break;
            case "projects":
                $("#nav").find(".active").removeClass("active");
                $("#projects").addClass("active");
                break;
            case "photography":
                $("#nav").find(".active").removeClass("active");
                $("#photography").addClass("active");
                break;
            case "games":
                $("#nav").find(".active").removeClass("active");
                $("#games").addClass("active");
                break;
            default:
                break;
        }
    });

    return (
        <>
            <IconContext.Provider value={{ color: "white" }}>
                {isMobile ? <Burger open={open} setOpen={setOpen} /> : null}
                <ul
                    className={"navbar-nav"}
                    id={"nav"}
                    style={open ? navStyles : null}
                >
                    <li className="nav-item menu-item" id="home" title="Home">
                        <Link
                            className="link"
                            to="/"
                            onClick={() => {
                                setOpen(!open);
                                window.localStorage.removeItem("category");
                                window.localStorage.removeItem("album");
                            }}
                        >
                            <i
                                className="material-icons-round nav-icons"
                                aria-hidden="true"
                            >
                                home
                            </i>
                        </Link>
                    </li>
                    <li
                        className="nav-item menu-item"
                        id="projects"
                        title="Projects"
                    >
                        <Link
                            className="link"
                            to="/projects"
                            onClick={() => {
                                setOpen(!open);
                                window.localStorage.removeItem("category");
                                window.localStorage.removeItem("album");
                            }}
                        >
                            <i
                                className="material-icons-round nav-icons"
                                aria-hidden="true"
                            >
                                code
                            </i>
                        </Link>
                    </li>
                    <li
                        className="nav-item menu-item"
                        id="photography"
                        title="Photography Portfolio"
                    >
                        <Link
                            className="link"
                            to="/photography"
                            onClick={() => {
                                setOpen(!open);
                            }}
                        >
                            <i
                                className="material-icons-round nav-icons"
                                aria-hidden="true"
                            >
                                photo_library
                            </i>
                        </Link>
                    </li>
                </ul>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
