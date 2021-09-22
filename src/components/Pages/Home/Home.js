import React, { useState } from 'react'
import './Home.css'
import '../../Navbar'
import { Image } from 'react-bootstrap';
import ParticlesBg from 'particles-bg'
import {AwesomeButton} from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
import name from '../../../images/name.svg'
import profilePic from '../../../images/pp.jpg'
import python from "../../../images/python.png"
import c from "../../../images/c.png"


function Home() {
    const [showContact, setShowContact] = useState(false)

    const clickContact = () => {
        setShowContact(!showContact)
    }

    return (
        <div id="home-page">
            <div className="home-container">
                <div id="img-container">
                    <Image src={name} alt="Everett McIntire" id="name"/>
                </div>
                <ParticlesBg type="cobweb" bg={false} color="#FFFFFF" id="particles" />
            </div>
            <div className="home-container">
                <div id="bio-container" className="card">
                    <Image src={profilePic} className="card-img-top profile-pic"/>
                    <div className="card-body bio-body">
                        <p className="card-text" id="bio">
                            I am a junior level software devloper. 
                            I have a Bachelor's Degree in Computer Science, 
                            a minor in Graphic Design, a passion for full 
                            stack development, and a love of Danny DeVito.
                        </p>
                        {showContact ? (
                            <div id="contact-info">everettgsm@gmail.com</div>
                        ) : (
                            <AwesomeButton className="aws-btn" type="primary" onPress={clickContact}>Contact</AwesomeButton>
                        )}
                    </div>
                </div>
                <div className="skills-container">
                    <h1 className="header" id="skills-header">Skills</h1>
                    <ul className="skills-list">
                        <Image className="skills-icon" src={python} />
                        <Image className="skills-icon" src={python} />
                        <Image className="skills-icon" src={python} />
                        <Image className="skills-icon" src={python} />
                        <Image className="skills-icon" src={python} />
                        <Image className="skills-icon" src={python} />
                    </ul>
                </div>
                <ParticlesBg type="cobweb" bg={false} color="#FFFFFF" id="particles" />
            </div>
        </div>
    );
} 

export default Home