import './About.css';
import { useRef, useState } from 'react';
import { Image } from 'react-bootstrap';
import { ContactPage, LinkedIn } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ai from '@/assets/images/ai.svg';
import asp from '@/assets/images/asp.svg';
import c from '@/assets/images/c.svg';
import css from '@/assets/images/css.svg';
import flask from '@/assets/images/flask.svg';
import ts from '@/assets/images/ts.svg';
import mongo from '@/assets/images/mongo.svg';
import node from '@/assets/images/node.svg';
import post from '@/assets/images/post.svg';
import profilePic from '@/assets/images/pp.png';
import ps from '@/assets/images/ps.svg';
import python from '@/assets/images/python.svg';
import resume from '@/assets/images/resume.pdf';
import reactLogo from '@/assets/images/react.svg';
import { map } from 'lodash';
import { Button, Grid, IconButton, Stack } from '@mui/material';

const gridSize = { xs: 12, sm: 12, md: 12, lg: 4 };

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
      <Grid container className="about-container" display="flex" justifyContent="space-evenly" spacing={4}>
        <Grid size={gridSize} maxWidth="650px" display="flex" alignItems="center" flexDirection="column">
          <Image src={profilePic} className="profile-pic" />
          <Stack width="100%" direction="column">
            <p className="card-text bio">
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
            <Grid container spacing={2} display="flex" alignItems="center">
              <Grid size={{ xs: 6, md: 3 }}>
                <a href={resume} target="_blank" rel="noreferrer" download="EverettMcIntire" aria-label="Resume">
                  <IconButton className="btn">
                    <ContactPage className="icon" fontSize="large" />
                  </IconButton>
                </a>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <a href="https://www.linkedin.com/in/everettgsm" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <IconButton className="btn">
                    <LinkedIn className="icon" fontSize="large" />
                  </IconButton>
                </a>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Button className="contact-btn" variant="contained" onClick={clickContact}>
                  {showContact ? 'everettgmcintire@gmail.com' : 'Contact'}
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid size={gridSize} display="flex" alignItems="center" flexDirection="column">
          <h1 className="skills-header">Skills</h1>
          <ul className="skills-list">
            {map(skills, (skill) => (
              <div className="skill-container" key={skill.name}>
                <Image className="skill-icon" src={skill.img} />
                <h4 className="skill-label">{skill.name}</h4>
              </div>
            ))}
          </ul>
        </Grid>
      </Grid>
      <ToastContainer theme="dark" />
    </div>
  );
}
