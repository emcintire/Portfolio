import './About.css';
import { useRef } from 'react';
import { Image } from 'react-bootstrap';
import { Button, Grid, Stack } from '@mui/material';
import { Download, NearMe } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profilePic from '@/assets/images/pp.jpg';
import resume from '@/assets/images/resume.pdf';
import Skills from './Skills/Skills';
import Experience from './Experience/Experience';

const gridSize = { xs: 12, sm: 12, md: 12, lg: 10 };

export function About() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
      <Grid container className="about-container" display="flex" alignItems="center" flexDirection="column" spacing={8}>
        <Grid size={gridSize} display="flex" alignItems="center" flexDirection="column">
          <Stack width="100%" direction="column" alignItems="center" spacing={3}>
            <div className="header-container">
              <h1>
                Hi, I'm Everett McIntire!
              </h1>
              <h3>Full Stack Software Engineer</h3>
            </div>
            <Image src={profilePic} className="profile-pic" />
            <textarea
              style={{ position: 'absolute', left: '-5000px' }}
              ref={textAreaRef}
              value='everettgmcintire@gmail.com'
            />
            <Stack direction="row" spacing={2} marginTop={2}>
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
              {/* {map(links, (link) => (
                <Grid size={{ xs: 4, md: 2 }}>
                  <a href={link.url} target="_blank" rel="noreferrer" download="EverettMcIntire.pdf" aria-label={link.name}>
                    <IconButton className="btn">
                      <link.icon className="icon" fontSize="large" />
                    </IconButton>
                  </a>
                </Grid>
              ))} */}
            </Stack>
          </Stack>
        </Grid>
        <Grid size={gridSize} display="flex" alignItems="center" flexDirection="column">
          <Experience />
        </Grid>
        <Grid size={gridSize} display="flex" alignItems="center" flexDirection="column">
          <Skills />
        </Grid>
      </Grid>
    </div>
  );
}
