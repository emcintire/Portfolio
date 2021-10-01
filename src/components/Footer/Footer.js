import React from "react";
import "./Footer.css";

function Footer() {
    const d = new Date();
    const currentYear = d.getFullYear();

    return (
        <footer id="footer">
            &copy; Copyright {currentYear}, Everett Gregory Shourt McIntire
        </footer>
    );
}

export default Footer;
