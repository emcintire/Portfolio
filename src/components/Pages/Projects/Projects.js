import ParticlesBg from 'particles-bg';
import React from 'react'
import './Projects.css'

function Projects() {
    return (
        <>
            <div id="projects-container">
                <ParticlesBg type="cobweb" bg={false} color="#FFFFFF" id="particles" />
            </div>
        </>
    );
}

export default Projects