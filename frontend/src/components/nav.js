import styled from 'styled-components';

export const Fill = styled.div`
  height: 75px;
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  background-color: #fff;
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 6px rgba(192, 169, 168, 0.5);

  div {
    display: flex;
    width: 100%;
    padding-left: 300px;
    padding-right: 40px;
    max-width: 1024px;
    align-items: center;

  }

  .brand {
    display: flex;
    align-items: center;
    margin: auto;
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
    font-size: 30px; /* Increased font size */
    font-weight: 900; /* Extra bold font */
    color: #544b3f;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #544b3f;
      &:hover {
        color: orange;
      }

      .fire-icon {
        margin-right: 8px; /* Space between icon and text */
        color: #ff5722; /* Fire icon color */
      }

      span {
        font-size: 32px; /* Increased font size for "BURNOUT" */
        font-weight: 900;
      }
    }
  }

  .auth-links {
    display: flex;
    gap: 20px;

    a {
      text-decoration: none;
      font-weight: 600;
      font-size: 18px;
      color: #544b3f;
      transition: color 0.2s;

      &:hover {
        color: orange;
      }
    }
  }
`;
