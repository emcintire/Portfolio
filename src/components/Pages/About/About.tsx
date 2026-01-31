import './About.css';
import { useRef } from 'react';
import { Image } from 'react-bootstrap';
import { Button, Grid, IconButton, Stack } from '@mui/material';
import { Download, GitHub, LinkedIn, NearMe } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profilePic from '@/assets/images/pp.jpg';
import resume from '@/assets/images/resume.pdf';
import Skills from './Skills/Skills';
import Experience from './Experience/Experience';
import { map } from 'lodash';
import { useRevealOnIntersect } from '../../../helpers';

const gridSize = { xs: 12, sm: 12, md: 12, lg: 10 };

const links = [{
  icon: LinkedIn,
  name: 'LinkedIn',
  url: 'https://www.linkedin.com/in/everettgsm',
}, {
  icon: GitHub,
  name: 'Github',
  url: 'https://github.com/emcintire',
}];

export function About() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const getRevealRef = useRevealOnIntersect({ threshold: 0.2 });

  const clickContact = () => {
    if (!textAreaRef.current) {
      return;
    }
    textAreaRef.current.select();
    document.execCommand('copy');
    toast('everettgmcintire@gmail.com copied to your clipboard!', { type: 'success' });
  };

  return (
    <div id='about-page'>
      <Grid container className="about-container" display="flex" alignItems="center" flexDirection="column" spacing={10}>
        <div
          className="header-container reveal-item"
          ref={getRevealRef(0)}
        >
          <h1>
            Hi, I'm Everett McIntire!
          </h1>
          <h3>Full Stack Software Engineer</h3>
        </div>
        <Stack
          direction="row"
          spacing={2}
          paddingBottom={4}
          className="reveal-item"
          ref={getRevealRef(1)}
        >
          <Button className="contact-btn" variant="contained" onClick={clickContact}>
            Contact Me
            <NearMe className="btn-icon" />
          </Button>
          <a href={resume} target="_blank" rel="noreferrer" download="EverettMcIntire.pdf">
            <Button className="contact-btn" variant="contained">
              Resume
              <Download className="btn-icon" />
            </Button>
          </a>
        </Stack>
        <div
          className="profile-card reveal-item"
          ref={getRevealRef(2)}
        >
          <Image src={profilePic} className="profile-pic" />
          <div className="profile-body">
            <h1 className="profile-header">
              About Me
            </h1>
            <p className="profile-desc">
              I am a full stack software engineer with experience designing and delivering end-to-end features across React,
              React Native, Node.js, and .NET. I’ve led small development efforts, contributed to large, long-running
              enterprise systems, and independently launched mobile applications on both major app stores. My work typically
              spans the full lifecycle, from translating product requirements into scalable backend services and intuitive
              front-end experiences to deploying, monitoring, and iterating based on real user feedback.
              <br />
              <br />
              I’m motivated by opportunities where I can take ownership, collaborate closely with product and engineering
              teams, and build software that people actively rely on. I enjoy solving complex problems, refining user
              experiences, and continuously improving systems as products evolve. I’m looking to contribute to a team where
              I can ship meaningful work, keep growing technically, and help deliver high-quality products that create real
              impact for users.
              <br />
              <br />
              I spend my free time working on side projects, watching films, listening to music, taking photos,
              snowboarding in the winter, and hiking in the summer.
            </p>
            <Grid container spacing={2} display="flex" alignItems="center" justifyContent="space-evenly" paddingTop={2}>
              {map(links, (link) => (
                <Grid size={{ xs: 4, md: 2 }} display="flex" justifyContent="center">
                  <a href={link.url} target="_blank" rel="noreferrer" aria-label={link.name}>
                    <IconButton className="btn">
                      <link.icon className="icon" fontSize="large" />
                    </IconButton>
                  </a>
                </Grid>
              ))}
            </Grid>
          </div>
          <textarea
            style={{ position: 'absolute', left: '-5000px' }}
            ref={textAreaRef}
            value='everettgmcintire@gmail.com'
          />
        </div>
        <Grid
          size={gridSize}
          display="flex"
          alignItems="center"
          flexDirection="column"
          className="reveal-item"
          ref={getRevealRef(3)}
        >
          <Experience />
        </Grid>
        <Grid
          size={gridSize}
          display="flex"
          alignItems="center"
          flexDirection="column"
          className="reveal-item"
          ref={getRevealRef(4)}
        >
          <Skills />
        </Grid>
      </Grid>
    </div>
  );
}
