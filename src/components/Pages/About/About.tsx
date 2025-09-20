import { useRef, useState } from 'react';
import './About.css';
import { Image } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
// import { AwesomeButton } from 'react-awesome-button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Buttons/aws-btn.css';
import ai from '../../../assets/ai.svg';
import asp from '../../../assets/asp.svg';
import c from '../../../assets/c.svg';
import css from '../../../assets/css.svg';
import downAarrow from '../../../assets/down-arrow.png';
import flask from '../../../assets/flask.svg';
import ts from '../../../assets/ts.svg';
import linkedin from '../../../assets/linkedin.svg';
import mobile_name from '../../../assets/mobile_name.svg';
import mongo from '../../../assets/mongo.svg';
import name from '../../../assets/name2.svg';
import node from '../../../assets/node.svg';
import post from '../../../assets/post.svg';
import profilePic from '../../../assets/pp.jpg';
import ps from '../../../assets/ps.svg';
import python from '../../../assets/python.svg';
import resume from '../../../assets/resume.pdf';
import resumeLogo from '../../../assets/resume.svg';
import reactLogo from '../../../assets/react.svg';

export function Home() {
  const [showContact, setShowContact] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const isMobile = useMediaQuery({ query: `(max-width: 600px)` });

  const clickContact = () => {
    if (!showContact && textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand('copy');
      setShowContact(!showContact);
      toast('Copied to Clipboard!', { type: 'success' });
    } else {
      setShowContact(!showContact);
    }
  };

  // const resizeBg = () => {
  //     const height = $("#profile-container").height();
  //     const width = $("#home-page").width();
  //     $("#profile-container .particles-bg-canvas-self").height(height);
  //     $(".particles-bg-canvas-self").width(width);
  // };

  // useEffect(() => {
  //     setTimeout(() => {
  //         resizeBg();
  //     }, 10);
  // });

  // $(window).on("resize", resizeBg);

  return (
    <div id='home-page'>
      <div className='home-container'>
        <div id='name-container'>
          <Image src={isMobile ? mobile_name : name} alt='Everett McIntire' id='name' />
        </div>
        <Image src={downAarrow} alt='Down Arrows' id='down-arrow' className='bounce' />
        {/* <ParticlesBg
                    type="cobweb"
                    num={50}
                    bg={false}
                    color="#ffffff"
                /> */}
      </div>
      <div className='home-container' id='profile-container'>
        <div id='bio-container'>
          <div id='bio-card' className='card'>
            <Image src={profilePic} className='card-img-top profile-pic' />
            <div className='card-body' id='bio-body'>
              <p className='card-text' id='bio'>
                Hi how are ya, I am a full stack software developer, specializing in React/Typescript, and .NET/C#. I
                have a Bachelor's Degree in Computer Science, a minor in Graphic Design, and a passion for development.
                <br />
                <br />I spend my free time watching movies, working on side projects, taking pictures of stuff, and
                spending time in nature.
              </p>
              <textarea
                style={{ position: 'absolute', left: '-5000px' }}
                ref={textAreaRef}
                value='everettgmcintire@gmail.com'
              />
              <div id='bio-btns'>
                <div className='resume-btns'>
                  <a href={resume} target='_blank' rel='noreferrer' download='EverettMcIntire'>
                    <Image src={resumeLogo} alt='resume logo' className='logos' />
                  </a>
                  <a href='https://www.linkedin.com/in/everettgsm' target='_blank' rel='noreferrer'>
                    <Image src={linkedin} alt='linkedin logo' className='logos' />
                  </a>
                </div>
                {showContact ? (
                  <div id='contact-info'>
                    {/* <AwesomeButton className='aws-btn' type='primary' onPress={clickContact}> */}
                      everettgmcintire@gmail.com
                    {/* </AwesomeButton> */}
                  </div>
                ) : (
                  // <AwesomeButton className='aws-btn' type='primary' onPress={clickContact}>
                    'Contact'
                  // </AwesomeButton>
                )}
              </div>
            </div>
          </div>
        </div>
        <div id='skills-container'>
          <h1 className='header' id='skills-header'>
            Skills
          </h1>
          <ul id='skills-list'>
            <div className='skill-container'>
              <Image className='skill-icon' src={reactLogo} />
              <h4 className='skill-label'>React</h4>
            </div>
            <div className='skill-container'>
              <Image className='skill-icon' src={ts} />
              <h4 className='skill-label'>Typescript</h4>
            </div>
            <div className='skill-container'>
              <Image className='skill-icon' src={node} />
              <h4 className='skill-label'>Node.js</h4>
            </div>
            <div className='skill-container'>
              <Image className='skill-icon' src={c} />
              <h4 className='skill-label'>C#</h4>
            </div>
            <div className='skill-container'>
              <Image className='skill-icon' src={asp} />
              <h4 className='skill-label'>ASP.Net</h4>
            </div>
            <div className='skill-container'>
              <Image className='skill-icon' src={python} />
              <h4 className='skill-label'>Python</h4>
            </div>
            <div className='skill-container'>
              <Image className='skill-icon' src={flask} />
              <h4 className='skill-label'>Flask</h4>
            </div>
            <div className='skill-container'>
              <Image className='skill-icon' src={css} />
              <h4 className='skill-label'>CSS</h4>
            </div>
            <div className='skill-container'>
              <Image className='skill-icon' src={mongo} />
              <h4 className='skill-label'>MongoDB</h4>
            </div>
            <div className='skill-container'>
              <Image className='skill-icon' src={post} />
              <h4 className='skill-label'>SQL</h4>
            </div>
            <div className='skill-container'>
              <Image className='skill-icon' src={ps} />
              <h4 className='skill-label'>Photoshop</h4>
            </div>
            <div className='skill-container'>
              <Image className='skill-icon' src={ai} />
              <h4 className='skill-label'>Illustrator</h4>
            </div>
          </ul>
        </div>
        {/* <ParticlesBg
                    type="cobweb"
                    num={50}
                    bg={false}
                    color="#ffffff"
                    id="particles"
                /> */}
        <ToastContainer theme='dark' />
      </div>
    </div>
  );
}
