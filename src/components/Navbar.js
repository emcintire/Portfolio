import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { MdArrowDropDown } from 'react-icons/md';
// import { AwesomeButton } from 'react-awesome-button';
// import 'react-awesome-button/dist/styles.css';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';
// import github from '../images/github.png';
// import linkedin from '../images/linkedin.png';
// import resume_logo from '../images/resume_logo.png';
// import resume from '../images/resume.pdf';

function Navbar() {
    const [click, setClick] = useState(true);
    const [button, setButton] = useState(true);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const onMouseEnter = () => {
        if (window.innerWidth <= 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth <= 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <IconContext.Provider value={{ color: 'white' }}>
                <nav className="navbar">
                    <ul className={'navbar-nav'} id={'nav'}>
                        <li className="nav-item active menu-item" id="home">
                            {button ? (
                                <Link to="/">Home</Link>
                            ) : (
                                <Link to="/">Home</Link>
                            )}
                        </li>
                        <li className="nav-item menu-item" id="about">
                            {button ? (
                                <Link to="/about">About</Link>
                            ) : (
                                <Link to="/about">About</Link>
                            )}
                        </li>
                        <li className="nav-item menu-item" id="projects">
                            {button ? (
                                <Link to="/projects">Projects</Link>
                            ) : (
                                <Link to="/projects">Projects</Link>
                            )}
                        </li>
                        <li className="nav-item menu-item" id="pictures">
                            {button ? (
                                <Link to="/pictures">Pictures</Link>
                            ) : (
                                <Link to="/pictures">Pictures</Link>
                            )}
                        </li>
                        <li className="nav-item menu-item" id="games">
                            {button ? (
                                <Link to="/pictures">Games</Link>
                            ) : (
                                <Link to="/pictures">Games</Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
