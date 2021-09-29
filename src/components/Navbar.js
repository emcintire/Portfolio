import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons/lib";
import $ from "jquery";

function Navbar() {
    // eslint-disable-next-line
    const [mobile, setMobile] = useState(true);
    const [styles, setStyles] = useState({});

    const onMouseEnter = () => {
        setStyles({
            width: "400px",
        });
    };

    const onMouseLeave = () => {
        setStyles({});
    };

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
                <ul className={"navbar-nav"} id={"nav"}>
                    <li
                        className="nav-item menu-item"
                        id="home"
                        style={styles}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        {mobile ? (
                            <Link
                                className="link"
                                to="/"
                                onClick={() => {
                                    window.localStorage.removeItem("category");
                                    window.localStorage.removeItem("album");
                                }}
                            >
                                Home
                            </Link>
                        ) : (
                            <Link
                                className="link"
                                to="/"
                                onClick={() => {
                                    window.localStorage.removeItem("category");
                                    window.localStorage.removeItem("album");
                                }}
                            >
                                Home
                            </Link>
                        )}
                    </li>
                    <li
                        className="nav-item menu-item"
                        id="projects"
                        style={styles}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        {mobile ? (
                            <Link
                                className="link"
                                to="/projects"
                                onClick={() => {
                                    window.localStorage.removeItem("category");
                                    window.localStorage.removeItem("album");
                                }}
                            >
                                Projects
                            </Link>
                        ) : (
                            <Link
                                className="link"
                                to="/projects"
                                onClick={() => {
                                    window.localStorage.removeItem("category");
                                    window.localStorage.removeItem("album");
                                }}
                            >
                                Projects
                            </Link>
                        )}
                    </li>
                    <li
                        className="nav-item menu-item"
                        id="photography"
                        style={styles}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        {mobile ? (
                            <Link className="link" to="/photography">
                                Photos
                            </Link>
                        ) : (
                            <Link className="link" to="/photography">
                                Photos
                            </Link>
                        )}
                    </li>
                    <li
                        className="nav-item menu-item"
                        id="games"
                        style={styles}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        {mobile ? (
                            <Link
                                className="link"
                                to="/games"
                                onClick={() => {
                                    window.localStorage.removeItem("category");
                                    window.localStorage.removeItem("album");
                                }}
                            >
                                Games
                            </Link>
                        ) : (
                            <Link
                                className="link"
                                to="/games"
                                onClick={() => {
                                    window.localStorage.removeItem("category");
                                    window.localStorage.removeItem("album");
                                }}
                            >
                                Games
                            </Link>
                        )}
                    </li>
                </ul>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
