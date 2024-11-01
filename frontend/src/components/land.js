import styled from 'styled-components';

export const Container = styled.div`
  padding: 50px 0;
  background-color: #faf6f6;
`;

export const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.5;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  section {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 450px;
    text-align: center;
    margin: 40px;

    h1 {
      font-size: 45px;
      font-weight: 900;
      letter-spacing: -0.02em;
    }

    p {
      font-weight: bold;
      font-size: 20px;
      line-height: 27px;
    }
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

export const Call = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #2f2b27;
  height: 230px;
  color: white;
  justify-content: center;
  align-items: center;
  margin: 43px;
  color: #faf6f6;

  h1 {
    font-weight: 900;
    font-size: 30px;
    line-height: 41px;
    text-align: center;
    letter-spacing: -0.01em;
  }

  p {
    font-weight: normal;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
  }

  a {
    margin-top: 25px;
    padding: 0.3em;
    width: 10em;
    height: 2.1em;
    border-radius: 30px;
    background-color: #6cbf84;
    color: inherit;

    text-decoration: none;
    text-align: center;
    font-weight: 800;
    font-size: 24px;

    transition: border-color 0.4s;

    &:hover {
      border-color: #6cbf84;
    }
  }
`;

export const About = styled.div`
  color: #2f2b27;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-weight: 900;
    font-size: 35px;
    line-height: 37px;

    text-align: center;
    letter-spacing: -0.02em;
  }

  section {
    max-width: 1024px;

    ul {
      list-style: none;
      display: flex;
      flex-direction: row;
      flex: 1;

      @media only screen and (max-width: 768px) {
        flex-direction: column;
      }

      li {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: 200px;
          height: 120px;
          border: 3px solid red;
          margin: 34px 0 20px;
        }

        h4 {
          font-style: normal;
          font-weight: 800;
          font-size: 26px;
          line-height: 32px;

          text-align: center;
          letter-spacing: -0.01em;
        }

        p {
          font-style: normal;
          font-weight: normal;
          font-size: 20px;
          line-height: 27px;
          text-align: center;
        }
        #terms {
          color: inherit;

          &:hover {
            color: #6cbf84;
          }
        }
      }
    }
  }

  #more {
    display: flex;
    margin-top: 42px;
    flex: 1;
    justify-content: center;

    #about {
      margin-top: 25px;
      padding: 0.3em 1.2em;
      width: 10em;
      height: 2.1em;
      border-radius: 30px;
      color: inherit;

      text-decoration: none;
      text-align: center;
      font-weight: 800;
      font-size: 24px;
      border: 3px solid #2f2b27;
      transition: border-color 0.4s;

      &:hover {
        border-color: #6cbf84;
      }
    }
  }
`;
