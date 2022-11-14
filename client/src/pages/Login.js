import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Signup-Login.module.css';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
  <Container as='main'>
    <Row>
      <Col xs={12} lg={10}>
        <Card className='card rounded-0'>
          <Card.Title className={ styles.Title }>Login</Card.Title>
          <Card.Body>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to='/'>back to the homepage.</Link>
              </p>
            ) : (
              <Form onSubmit={handleFormSubmit}>
                <Row xs={1} md={2}>
                  <Col>
                    <Form.Control
                      className={ styles.Input }
                      placeholder='Your email'
                      name='email'
                      type='email'
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      className={ styles.Input }
                      placeholder='password'
                      name='password'
                      type='password'
                      value={formState.password}
                      onChange={handleChange}
                    />
                  </Col>
                  
                </Row>
                <Row>
                  <Col className='text-end'>
                    <Button
                      className='Button'
                      type='submit'
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}

            {error && (
              <div className='my-3 p-3 bg-danger text-white'>
                {error.message}
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
    
  );
};

export default Login;
