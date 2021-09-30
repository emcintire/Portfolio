import React, { useEffect, useState } from "react";
import "./Home.css";
import "../../Navbar";
import $ from "jquery";
import { Image } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import ParticlesBg from "particles-bg";
import { AwesomeButton } from "react-awesome-button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../aws-btn.css";
import emoji from "../../../images/emoji.png";
import name from "../../../images/name2.svg";
import mobile_name from "../../../images/mobile_name.svg";
import profilePic from "../../../images/pp.jpg";
import python from "../../../images/python.svg";
import asp from "../../../images/asp.svg";
import c from "../../../images/c.svg";
import flask from "../../../images/flask.svg";
import node from "../../../images/node.svg";
import js from "../../../images/js.svg";
import html from "../../../images/html.svg";
import css from "../../../images/css.svg";
import mongo from "../../../images/mongo.svg";
import post from "../../../images/post.svg";
import ps from "../../../images/ps.svg";
import ai from "../../../images/ai.svg";
import resumeLogo from "../../../images/resume.svg";
import linkedin from "../../../images/linkedin.svg";
import resume from "../../../images/resume.pdf";

function Home() {
    const [showContact, setShowContact] = useState(false);

    const isMobile = useMediaQuery({ query: `(max-width: 600px)` });

    const clickContact = () => {
        if (!showContact) {
            navigator.clipboard.writeText("everettgmcintire@gmail.com");
            setShowContact(!showContact);
            toast(
                <div>
                    <img src={emoji} alt="weary face" id="emoji" />
                    Copied to Clipboard!
                </div>
            );
        } else {
            setShowContact(!showContact);
        }
    };

    const resizeBg = () => {
        const height = $("#profile-container").height();
        const width = $("#home-page").width();
        $("#profile-container .particles-bg-canvas-self").height(height);
        $(".particles-bg-canvas-self").width(width);
    };

    useEffect(() => {
        setTimeout(() => {
            resizeBg();
        }, 10);
    });

    $(window).on("resize", resizeBg);

    return (
        <div id="home-page">
            <div className="home-container">
                <div id="name-container">
                    {isMobile ? (
                        <Image
                            src={mobile_name}
                            alt="Everett McIntire"
                            id="name"
                        />
                    ) : (
                        <Image src={name} alt="Everett McIntire" id="name" />
                    )}
                </div>
                <ParticlesBg
                    type="cobweb"
                    num={50}
                    bg={false}
                    color="#ffffff"
                />
            </div>
            <div className="home-container" id="profile-container">
                <div id="bio-container">
                    <div id="bio-card" className="card">
                        <Image
                            src={profilePic}
                            className="card-img-top profile-pic"
                        />
                        <div className="card-body" id="bio-body">
                            <p className="card-text" id="bio">
                                Hi how are ya, I am a junior level software
                                devloper. I have a Bachelor's Degree in Computer
                                Science, a minor in Graphic Design, and a
                                passion for full stack development.
                                <br />
                                <br />I spend my time watching Nicolas Cage
                                movies, taking pictures of stuff, and playing in
                                my Guitar Hero band, "Gnome Saying."
                            </p>
                            <div id="bio-btns">
                                <div className="resume-btns">
                                    <a
                                        href={resume}
                                        target="_blank"
                                        rel="noreferrer"
                                        download="EverettMcIntire"
                                    >
                                        <Image
                                            src={resumeLogo}
                                            alt="resume logo"
                                            className="logos"
                                        />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/everettgsm"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            src={linkedin}
                                            alt="linkedin logo"
                                            className="logos"
                                        />
                                    </a>
                                </div>
                                {showContact ? (
                                    <div id="contact-info">
                                        <AwesomeButton
                                            className="aws-btn"
                                            type="primary"
                                            onPress={clickContact}
                                        >
                                            everettgmcintire@gmail.com
                                        </AwesomeButton>
                                    </div>
                                ) : (
                                    <AwesomeButton
                                        className="aws-btn"
                                        type="primary"
                                        onPress={clickContact}
                                    >
                                        Contact
                                    </AwesomeButton>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="skills-container">
                    <h1 className="header" id="skills-header">
                        Skills
                    </h1>
                    <ul id="skills-list">
                        <div className="skill-container">
                            <Image className="skill-icon" src={python} />
                            <h4 className="skill-label">Python</h4>
                        </div>
                        <div className="skill-container">
                            <Image className="skill-icon" src={flask} />
                            <h4 className="skill-label">Flask</h4>
                        </div>
                        <div className="skill-container">
                            <Image className="skill-icon" src={c} />
                            <h4 className="skill-label">C# / F#</h4>
                        </div>
                        <div className="skill-container">
                            <Image className="skill-icon" src={asp} />
                            <h4 className="skill-label">ASP.Net</h4>
                        </div>
                        <div className="skill-container">
                            <Image className="skill-icon" src={js} />
                            <h4 className="skill-label">React.js</h4>
                        </div>
                        <div className="skill-container">
                            <Image className="skill-icon" src={node} />
                            <h4 className="skill-label">Node.js</h4>
                        </div>
                        <div className="skill-container">
                            <Image className="skill-icon" src={html} />
                            <h4 className="skill-label">HTML</h4>
                        </div>
                        <div className="skill-container">
                            <Image className="skill-icon" src={css} />
                            <h4 className="skill-label">CSS</h4>
                        </div>
                        <div className="skill-container">
                            <Image className="skill-icon" src={mongo} />
                            <h4 className="skill-label">MongoDB</h4>
                        </div>
                        <div className="skill-container">
                            <Image className="skill-icon" src={post} />
                            <h4 className="skill-label">PostgreSQL</h4>
                        </div>
                        <div className="skill-container">
                            <Image className="skill-icon" src={ps} />
                            <h4 className="skill-label">Photoshop</h4>
                        </div>
                        <div className="skill-container">
                            <Image className="skill-icon" src={ai} />
                            <h4 className="skill-label">Illustrator</h4>
                        </div>
                    </ul>
                </div>
                <ParticlesBg
                    type="cobweb"
                    num={50}
                    bg={false}
                    color="#ffffff"
                    id="particles"
                />
                <ToastContainer theme="dark" />
            </div>
        </div>
    );
}

export default Home;
