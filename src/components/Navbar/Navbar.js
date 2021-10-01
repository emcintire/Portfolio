import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import "material-icons/iconfont/round.css";
import "./Navbar.css";
import $ from "jquery";
import Burger from "../Buttons/Burger";

function Navbar() {
    const [open, setOpen] = useState(false);

    let location = useLocation();

    useEffect(() => {
        let pName = location.pathname.split("/", 2)[1];

        if (open) {
            document.getElementById("cover").classList.toggle("covering");
            document.getElementById("nav").classList.toggle("open");
        } else {
            document.getElementById("cover").classList.remove("covering");
            document.getElementById("nav").classList.remove("open");
        }

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
                <Burger open={open} setOpen={setOpen} />
                <ul className={"navbar-nav"} id={"nav"}>
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
