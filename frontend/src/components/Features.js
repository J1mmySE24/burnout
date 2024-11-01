import React from 'react';
import styled from 'styled-components';
// Import your images here
// import feature_1 from './assets/img/feature_1.jpg';
import feature_2 from './assets/img/feature_2.jpg';
import feature_3 from './assets/img/feature_3.jpg';
import feature_4 from './assets/img/feature_4.jpg';
import feature_5 from './assets/img/feature_5.jpg';
import feature_6 from './assets/img/feature_6.jpg';

const companies = [
  { src: feature_2, alt: 'Feature' },
  { src: feature_3, alt: 'Feature' },
  { src: feature_4, alt: 'Feature' },
  { src: feature_5, alt: 'Feature' },
  { src: feature_6, alt: 'Feature' },
];

const Section = styled.div`
  padding: 40px 20px;
  text-align: center;
`;

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap; /* Optional: Wrap if screen size is too small */
  margin-bottom: 20px;
`;

const Logo = styled.div`
  max-width: 100px; /* Control the size of each logo */
  img {
    width: 100%;
    height: auto;
    filter: grayscale(100%); /* Optional: Apply grayscale to match style */
  }
`;

const Description = styled.p`
          font-style: normal;
          font-weight: bold;
          font-size: 20px;
          line-height: 27px;
          text-align: center;
`;


const Feature = () => {
  return (
    <Section>
      <LogosContainer>
        {companies.map((company, index) => (
          <Logo key={index}>
            <img src={company.src} alt={company.alt} />
          </Logo>
        ))}
      </LogosContainer>
      <Description>
          The one platform for fitness goals <br/> Fitness Companion | Progress Log | Calorie Count | Custom Diet and Fitness | Food Insights
      </Description>
    </Section>
  );
};

export default Feature;
