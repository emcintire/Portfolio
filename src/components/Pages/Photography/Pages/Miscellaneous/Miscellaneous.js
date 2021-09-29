import React, { useEffect } from "react";
import "./Miscellaneous.css";
import "../../../../Navbar";

function Miscellaneous() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div id="misc-container">
                <section id="photos">
                    <img src="https://i.imgur.com/yjeIJxbh.jpg" alt="" />
                    <img
                        src="https://i.imgur.com/FcaDpuvh.jpg"
                        alt="Boston skyline"
                    />
                    <img
                        src="https://i.imgur.com/zW9U6cHh.jpg"
                        alt="Band performing"
                    />
                    <img
                        src="https://i.imgur.com/u7vZcPLh.jpg"
                        alt="Audience cheering at concert"
                    />
                    <img
                        src="https://i.imgur.com/TTnJL0ih.jpg"
                        alt="Old plane in field"
                    />
                    <img src="https://imgur.com/UTwAaa2h.jpg" alt="" />
                    <img src="https://imgur.com/tYSLAdTh.jpg" alt="" />
                    <img src="https://imgur.com/OTH2KDph.jpg" alt="" />
                    <img src="https://imgur.com/u4ZUXlGh.jpg" alt="" />
                </section>
            </div>
        </>
    );
}

export default Miscellaneous;
