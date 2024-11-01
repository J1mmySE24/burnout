import React, { Component } from 'react';
import { Container, Fill } from './nav';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default class Navbar extends Component {
  render() {
    return (
      <>
        <Container>
          
            <div className="brand">
              <a href='/'>
                <LocalFireDepartmentIcon fontSize="large" className="fire-icon" />
                <span>BURNOUT</span>
              </a>
            </div>
            <div className="auth-links">
              <a href='/signin'>Sign In</a>
              <a href='/signup'>Sign Up</a>
            </div>
          
        </Container>
        <Fill />
      </>
    );
  }
}
