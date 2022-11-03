import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container as='main' className='flex-row justify-center mb-4'>
      <Row className='justify-content-center mb-4'>
        <Col xs={12} lg={10}>
          <Card className='card rounded-0'>
            <Card.Title className='card-header bg-dark text-light p-2 rounded-0'>Sign Up</Card.Title>
            <Card.Body>
              {data ? (
                <p>
                  Success! You may now head{' '}
                  <Link to='/'>back to the homepage.</Link>
                </p>
              ) : (
                <Form onSubmit={handleFormSubmit}>
                  <Row xs={1} md={2} lg={3}>
                    <Col>
                      <Form.Control
                        className='m-1 rounded-0'
                        placeholder='Your username'
                        name='username'
                        type='text'
                        value={formState.name}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        className='m-1 rounded-0'
                        placeholder='Your email'
                        name='email'
                        type='email'
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col>            
                      <Form.Control
                        className='m-1 rounded-0'
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
                      className='btn btn-block btn-primary m-1 px-3 rounded-0'
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

export default Signup;
