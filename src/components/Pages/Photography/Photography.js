import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Photography.scss';

function Photography() {
    const storeLocation = (id) => {
        window.localStorage.removeItem('category');
        window.localStorage.removeItem('album');
        window.localStorage.setItem('category', id);
    };

    useEffect(() => {
        if (window.localStorage.getItem('category')) {
            document
                .getElementById(window.localStorage.getItem('category'))
                .scrollIntoView();
        } else {
            window.scrollTo(0, 0);
        }
    }, []);

    return (
        <>
            <div id="photography-container">
                <ul id="category-list">
                    <div className="category-container" id="landscape">
                        <Link
                            className="category-link"
                            to="/photography/landscape"
                            onClick={() => storeLocation('landscape')}
                        >
                            Landscape
                        </Link>
                    </div>
                    <div className="category-container" id="portraits">
                        <Link
                            className="category-link"
                            to="/photography/portraits"
                            onClick={() => storeLocation('portraits')}
                        >
                            <span className="link-text">Portraits</span>
                        </Link>
                    </div>
                    <div className="category-container" id="animals">
                        <Link
                            className="category-link"
                            to="/photography/animals"
                            onClick={() => storeLocation('animals')}
                        >
                            Animals
                        </Link>
                    </div>
                    <div className="category-container" id="misc">
                        <Link
                            className="category-link"
                            to="/photography/miscellaneous"
                            onClick={() => storeLocation('misc')}
                        >
                            Misc
                        </Link>
                    </div>
                </ul>
            </div>
        </>
    );
}

export default Photography;
