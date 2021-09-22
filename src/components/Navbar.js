import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';
import $ from 'jquery'

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
                <ul className={'navbar-nav'} id={'nav'}>
                    <li className="nav-item menu-item active" id="home" style={styles} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
                        {mobile ? (
                            <Link className="link" to="/">Home</Link>
                        ) : (
                            <Link className="link" to="/">Home</Link>
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
                            <Link className="link" to="/photography">Photos</Link>
                        ) : (
                            <Link className="link" to="/photography">Photos</Link>
                        )}
                    </li>
                    <li className="nav-item menu-item" id="games" style={styles} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        {mobile ? (
                            <Link className="link" to="/games">Games</Link>
                        ) : (
                            <Link className="link" to="/games">Games</Link>
                        )}
                    </li>
                </ul>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
