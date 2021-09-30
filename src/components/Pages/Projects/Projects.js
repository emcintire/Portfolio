import React, { useEffect } from "react";
import ParticlesBg from "particles-bg";
import { Image } from "react-bootstrap";
import $ from "jquery";
import "./Projects.css";
import roomeo from "../../../images/roomeo.svg";
import github from "../../../images/github2.svg";
import eye from "../../../images/eye2.svg";
import flappy_frank from "../../../images/flappy_frank.png";
import slackr from "../../../images/slackr.png";
import unCaged from "../../../images/unCaged.jpg";

function Projects() {
    const resizeBg = () => {
        const height = $("#projects-page").height();
        const width = $("#projects-page").width();
        $("#projects-page .particles-bg-canvas-self").height(height);
        $("#projects-page .particles-bg-canvas-self").width(width);
    };

    useEffect(() => {
        setTimeout(() => {
            resizeBg();
        }, 20);
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
                        <div id="uncaged-card" className="card project-cards">
                            <Image src={unCaged} className="card-img-top" />
                            <div className="card-body" id="">
                                <h3 className="card-title project-title">
                                    unCaged
                                </h3>
                                <p className="card-text project-desc">
                                    - My current side project is crafting a
                                    Nicolas Cage movie suggesting app <br />
                                    - Engineering the frontend with React native
                                    and the backend with Node.js <br />
                                </p>
                                <div id="card-btns">
                                    <a
                                        href="https://github.com/emcintire/"
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
                                        href="https://youtu.be/NFsc-Adl50w"
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
                                <h3 className="card-title project-title">
                                    Roomeo
                                </h3>
                                <p className="card-text project-desc">
                                    - Lead backend developer on a team that
                                    built a roommate finding web app <br />
                                    - Engineered a REST API using Node.js and
                                    Express <br />
                                    - Implemented multiple frontend features in
                                    React.js <br />
                                    - Integrated MongoDB as the data management
                                    platform <br />
                                    - Acted as the scrum leader in an Agile
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
                        <div id="slackr-card" className="card project-cards">
                            <Image src={slackr} className="card-img-top" />
                            <div className="card-body" id="">
                                <h3 className="card-title project-title">
                                    Slackr Messaging App
                                </h3>
                                <p className="card-text project-desc">
                                    - Coordinated with four person team to
                                    create a backend REST API for the app using
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
                        <div id="flappy-card" className="card project-cards">
                            <Image
                                src={flappy_frank}
                                className="card-img-top"
                            />
                            <div className="card-body" id="">
                                <h3 className="card-title project-title">
                                    Flappy Frank
                                </h3>
                                <p className="card-text project-desc">
                                    - I used Illustrator to make all the
                                    graphics and Pygame to create the game
                                    physics <br />
                                    - I had never used Pygame prior to this
                                    project so it was a great introduction to
                                    game devlopment <br />- In the end, I came
                                    up with a simple Flappy Bird game with Frank
                                    Reynolds as the main character
                                </p>
                                <div id="card-btns">
                                    <a
                                        href="https://github.com/emcintire/FlappyFrank"
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
                                        href="https://youtu.be/8NHuylK6O78"
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
                        color="#ffffff"
                        id="particles"
                        num={200}
                    />
                </div>
            </div>
        </>
    );
}

export default Projects;
