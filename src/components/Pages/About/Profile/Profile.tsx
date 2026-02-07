import './Profile.css';
import { useRef } from 'react';
import { Button, IconButton, Stack } from '@mui/material';
import { Download, NearMe } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profilePic from '@/assets/images/pp.jpg';
import resume from '@/assets/images/resume.pdf';
import { useRevealOnIntersect } from '@/helpers';
import { socialLinks } from '@/data/socialLinks';

export default function Profile() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const revealRef = useRevealOnIntersect();

  const clickContact = () => {
    if (!textAreaRef.current) {
      return;
    }
    textAreaRef.current.select();
    document.execCommand('copy');
    toast('everettgmcintire@gmail.com copied to your clipboard!', { type: 'success' });
  };

  return (
    <>
      <div
        className="header-container reveal-item"
        ref={revealRef}
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
        ref={revealRef}
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
        ref={revealRef}
      >
        <img src={profilePic} className="profile-pic" alt="Everett McIntire" />
        <div className="profile-body">
          <h1 className="profile-header">
            About Me
          </h1>
          <p className="profile-desc">
            I am a full stack software engineer with experience designing and delivering end-to-end features across React,
            React Native, Node.js, and .NET. I've led teams through feature development, contributed to large, long-running
            enterprise systems, and independently launched multiple mobile applications to both iOS and Android app stores. My work typically
            spans the full lifecycle, from translating product requirements into scalable backend services and intuitive
            front-end experiences to deploying, monitoring, and iterating based on real user feedback.
            <br />
            <br />
            I'm motivated by opportunities where I can take ownership, collaborate closely with product and engineering
            teams, and build software that people actively rely on. I enjoy solving complex problems, refining user
            experiences, and continuously improving systems as products evolve. I'm looking to contribute to a team where
            I can ship meaningful work, keep growing technically, and help deliver high-quality products that create real
            impact for users.
            <br />
            <br />
            I spend my free time watching films, listening to music, working on side projects, taking photos,
            snowboarding in the winter, and hiking in the summer.
          </p>
          <Stack direction="row" spacing={2} justifyContent="space-evenly" paddingTop={2}>
            {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noreferrer" aria-label={link.name}>
                <IconButton className="btn" aria-hidden="true" tabIndex={-1}>
                  <link.icon className="icon" fontSize="large" />
                </IconButton>
              </a>
            ))}
          </Stack>
        </div>
        <textarea
          style={{ position: 'absolute', left: '-5000px' }}
          ref={textAreaRef}
          value='everettgmcintire@gmail.com'
          aria-hidden="true"
          tabIndex={-1}
          readOnly
        />
      </div>
      <div className="testimonial reveal-item" ref={revealRef}>
        <blockquote className="testimonial-quote">
          "Everett is an excellent developer and a consummate professional. I have seen him rescue
          foundering projects quickly, structure over a year's worth of work with ease, and build
          useful and elegant tools that his coworkers readily adopted. When Everett was in charge of a feature,
          it was completed quickly with a robust UI using maintainable code. He has always been kind,
          calm, warm, and affable, and is well respected by his colleagues. I would not hesitate to
          collaborate with Everett again."
        </blockquote>
        <p className="testimonial-attribution">
          — Aaron McDavid (Manager), Center for Applied Management Practices
        </p>
      </div>
    </>
  );
}
