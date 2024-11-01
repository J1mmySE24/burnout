import React from 'react';

import { Container, Call, Image, Main } from './land';
import Navbar from './Navbar';

import landingImage from './assets/img/landing.jpg';
import Feature from './Features';

const LandingPage = () => {
  return (
    <Container>
    <Navbar />
      <Image>
        <img src={landingImage} alt='Loql' cover center />
        <section>
          <h1>Get fit with us!</h1>
          <p>
            Burnout is your daily health companion, designed to help users achieve their wellness goals
          </p>
        </section>
      </Image>
      <br /><br />
      <Feature />
      <Main>
        <Call>
          <h1>CSC 510 Software Engineering</h1>
          <p>
            Project 2 : Team 96<br/>
            Jinming Xing | Krisha Patel | Shreyas Devaraj
          </p>
        </Call>
      </Main>

    </Container>
  );
};

export default LandingPage;
