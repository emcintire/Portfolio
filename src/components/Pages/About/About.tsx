import './About.css';
import { useRef, useState } from 'react';
import { Image } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ai from '../../../assets/images/ai.svg';
import asp from '../../../assets/images/asp.svg';
import c from '../../../assets/images/c.svg';
import css from '../../../assets/images/css.svg';
import flask from '../../../assets/images/flask.svg';
import ts from '../../../assets/images/ts.svg';
import linkedin from '../../../assets/images/linkedin.svg';
import mongo from '../../../assets/images/mongo.svg';
import node from '../../../assets/images/node.svg';
import post from '../../../assets/images/post.svg';
import profilePic from '../../../assets/images/pp.jpg';
import ps from '../../../assets/images/ps.svg';
import python from '../../../assets/images/python.svg';
import resume from '../../../assets/images/resume.pdf';
import resumeLogo from '../../../assets/images/resume.svg';
import reactLogo from '../../../assets/images/react.svg';
import { map } from 'lodash';

const skills = [
  { name: 'React', img: reactLogo },
  { name: 'Typescript', img: ts },
  { name: 'Node.js', img: node },
  { name: 'C#', img: c },
  { name: 'ASP.Net', img: asp },
  { name: 'Python', img: python },
  { name: 'Flask', img: flask },
  { name: 'CSS', img: css },
  { name: 'MongoDB', img: mongo },
  { name: 'SQL', img: post },
  { name: 'Photoshop', img: ps },
  { name: 'Illustrator', img: ai },
];

export function About() {
  const [showContact, setShowContact] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // const isMobile = useMediaQuery({ query: `(max-width: 600px)` });

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

  return (
    <div id='about-page'>
      <div className='about-container' id='profile-container'>
        <div id='bio-container'>
          <div id='bio-card' className='card'>
            <Image src={profilePic} className='card-img-top profile-pic' />
            <div className='card-body' id='bio-body'>
              <p className='card-text' id='bio'>
                Hello! I am a full stack software developer, specializing in React/Typescript, and .NET/C#. I
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
                    <button className='aws-btn' onClick={clickContact}>
                      everettgmcintire@gmail.com
                    </button>
                  </div>
                ) : (
                  <button className='aws-btn' onClick={clickContact}>
                    Contact
                  </button>
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
            {map(skills, (skill) => (
                <div className='skill-container'>
                <Image className='skill-icon' src={skill.img} />
                <h4 className='skill-label'>{skill.name}</h4>
              </div>
            ))}
          </ul>
        </div>
        <ToastContainer theme='dark' />
      </div>
    </div>
  );
}
