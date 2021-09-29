import React, { useEffect } from "react";
import ParticlesBg from "particles-bg";
import { Image } from "react-bootstrap";
import $ from "jquery";
import "./Projects.css";
import roomeo from "../../../images/roomeo.svg";
import github from "../../../images/github.svg";
import eye from "../../../images/eye.svg";

function Projects() {
    const resizeBg = () => {
        const height = $("#projects-page").height();
        $("#projects-page .particles-bg-canvas-self").height(height);
    };

    useEffect(() => {
        setTimeout(() => {
            resizeBg();
        }, 5);
    });

    $(window).on("resize", resizeBg);

    return (
        <>
            <div id="projects-page">
                <div id="projects-container">
                    <h1 className="header" id="projects-header">
                        Projects
                    </h1>
                    <ul id="projects-list">
                        <div id="roomeo-card" className="card project-cards">
                            <Image src={roomeo} className="card-img-top" />
                            <div className="card-body" id="">
                                <h4 className="card-title project-title">
                                    Roomeo
                                </h4>
                                <p className="card-text project-desc">
                                    - Lead backend developer on a team building
                                    a roommate finding web app <br />
                                    - Engineered a REST API using Node.js and
                                    the Express module <br />
                                    - Integrated MongoDB as the data management
                                    platform <br />
                                    - Acted as scrum leader in an Agile
                                    environment <br />
                                </p>
                                <div id="card-btns">
                                    <a
                                        href="https://github.com/emcintire/Roomeo"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            src={github}
                                            alt="github logo"
                                            className="logos"
                                        />
                                    </a>
                                    <a
                                        href="https://youtu.be/8K4hWoyijkA"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            src={eye}
                                            alt="eye icon"
                                            className="logos"
                                            id="eye-btn"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div id="roomeo-card" className="card project-cards">
                            <Image src={roomeo} className="card-img-top" />
                            <div className="card-body" id="">
                                <h4 className="card-title project-title">
                                    Roomeo
                                </h4>
                                <p className="card-text project-desc">
                                    - Lead backend developer on a team building
                                    a roommate finding web app <br />
                                    - Engineered a REST API using Node.js and
                                    the Express module <br />
                                    - Integrated MongoDB as the data management
                                    platform <br />
                                    - Acted as scrum leader in an Agile
                                    environment <br />
                                </p>
                                <div id="card-btns">
                                    <a
                                        href="https://github.com/emcintire/Roomeo"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            src={github}
                                            alt="github logo"
                                            className="logos"
                                        />
                                    </a>
                                    <a
                                        href="https://youtu.be/8K4hWoyijkA"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            src={eye}
                                            alt="eye icon"
                                            className="logos"
                                            id="eye-btn"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div id="roomeo-card" className="card project-cards">
                            <Image src={roomeo} className="card-img-top" />
                            <div className="card-body" id="">
                                <h4 className="card-title project-title">
                                    Slackr Messaging App
                                </h4>
                                <p className="card-text project-desc">
                                    - Coordinated with four person team to
                                    create back end REST API for the app using
                                    Python and Flask <br />
                                    - Functions as a social app with messaging
                                    and channels
                                    <br />
                                    - Gained experience working on a team in an
                                    Agile environment
                                    <br />
                                </p>
                                <div id="card-btns">
                                    <a
                                        href="https://github.com/emcintire/slackr"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            src={github}
                                            alt="github logo"
                                            className="logos"
                                        />
                                    </a>
                                    <a
                                        href="https://youtu.be/5f4oiveHwqg"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            src={eye}
                                            alt="eye icon"
                                            className="logos"
                                            id="eye-btn"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div id="roomeo-card" className="card project-cards">
                            <Image src={roomeo} className="card-img-top" />
                            <div className="card-body" id="">
                                <h4 className="card-title project-title">
                                    Roomeo
                                </h4>
                                <p className="card-text project-desc">
                                    - Lead backend developer on a team building
                                    a roommate finding web app <br />
                                </p>
                                <div id="card-btns">
                                    <a
                                        href="https://github.com/emcintire/Roomeo"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            src={github}
                                            alt="github logo"
                                            className="logos"
                                        />
                                    </a>
                                    <a
                                        href="https://youtu.be/8K4hWoyijkA"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            src={eye}
                                            alt="eye icon"
                                            className="logos"
                                            id="eye-btn"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </ul>
                    <ParticlesBg
                        type="cobweb"
                        bg={false}
                        color="#FFFFFF"
                        id="particles"
                    />
                </div>
            </div>
        </>
    );
}

export default Projects;
