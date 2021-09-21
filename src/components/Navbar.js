import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { MdArrowDropDown } from 'react-icons/md';
// import { AwesomeButton } from 'react-awesome-button';
// import 'react-awesome-button/dist/styles.css';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';
import $ from 'jquery'
// import github from '../images/github.png';
// import linkedin from '../images/linkedin.png';
// import resume_logo from '../images/resume_logo.png';
// import resume from '../images/resume.pdf';

function Navbar() {
    const [mobile, setMobile] = useState(true);
    const [styles, setStyles] = useState({})


    const onMouseEnter = () => {
        setStyles({
            "width": "400px",
        })
    }

    const onMouseLeave = () => {
        setStyles({})
    }

    $(".menu-item").on("click", function(){
        $("#nav").find(".active").removeClass("active");
        $(this).addClass("active");
     });
    
    return (
        <>
            <IconContext.Provider value={{ color: 'white' }}>
                <nav className="navbar" id="navbar">
                    <ul className={'navbar-nav'} id={'nav'}>
                        <li className="nav-item menu-item active" id="home" style={styles} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
                            {mobile ? (
                                <Link className="link" to="/">Home</Link>
                            ) : (
                                <Link className="link" to="/">Home</Link>
                            )}
                        </li>
                        <li className="nav-item menu-item" id="about" style={styles} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                            {mobile ? (
                                <Link className="link" to="/about">About</Link>
                            ) : (
                                <Link className="link" to="/about">About</Link>
                            )}
                        </li>
                        <li className="nav-item menu-item" id="projects" style={styles} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                            {mobile ? (
                                <Link className="link" to="/projects">Projects</Link>
                            ) : (
                                <Link className="link" to="/projects">Projects</Link>
                            )}
                        </li>
                        <li className="nav-item menu-item" id="pictures" style={styles} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                            {mobile ? (
                                <Link className="link" to="/pictures">Pictures</Link>
                            ) : (
                                <Link className="link" to="/pictures">Pictures</Link>
                            )}
                        </li>
                        <li className="nav-item menu-item" id="games" style={styles} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                            {mobile ? (
                                <Link className="link" to="/pictures">Games</Link>
                            ) : (
                                <Link className="link" to="/pictures">Games</Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
