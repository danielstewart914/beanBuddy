import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className='bg-primary text-light mb-4 py-3 flex-row align-center'>
      <Container>
        <Row>
          <Link className='text-light text-decoration-none' to='/'>
            <h1 className='m-0 text-center'>BeanBuddy</h1>
          </Link>
          <p className='m-0 text-center'>An App for People who Love Coffee!</p>
        </Row>
        <Row>
          <Col className='text-end'>
            {Auth.loggedIn() ? (
              <>
                <Link className='btn btn-lg btn-info m-2' to='/me'>
                  {Auth.getProfile().data.username}'s profile
                </Link>
                <Button className='btn btn-lg btn-light m-2' onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link className='btn btn-lg btn-info m-2 rounded-0' to='/login'>
                  Login
                </Link>
                <Link className='btn btn-lg btn-light m-2 rounded-0' to='/signup'>
                  Signup
                </Link>
              </>
            )}
          </Col>
        </Row>
        
      </Container>
    </header>
  );
};

export default Header;
