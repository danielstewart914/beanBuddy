import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className='w-100 mt-auto bg-secondary p-4'>
      <Container className='container text-center mb-5'>
        {location.pathname !== '/' && (
          <Button
            className='btn btn-dark mb-3 rounded-0'
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </Button>
        )}
        <h4>Footer</h4>
      </Container>
    </footer>
  );
};

export default Footer;
