import React from 'react'
import './Home.css'
import '../../Navbar'
import img from '../../../images/home-bg.jpg'

function Home() {
    return (
        <>
        <div id="home-container">
            <img src={img} alt="Mountains" id="home-bg"></img>
        </div>
        </>
    );
}

export default Home