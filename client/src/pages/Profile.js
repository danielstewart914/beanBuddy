import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';


import styles from './Profile.module.css';
import Button from 'react-bootstrap/Button';
import { valueFromAST } from 'graphql';
import { UPDATE_USER_EMAIL, UPDATE_USER_PASSWORD } from '../utils/mutations';



const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery( QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/me' />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <Navigate to='/login' />;
  }

  // const updateProfile = async (useState) => {
  //   const [formState, setFormState] = useState({
  //     email: '',
  //     password: '',
  //   });
  //   const [updateEmail, {error, data }] = useMutation(UPDATE_USER_EMAIL);
  //   const [updatePassword, {error, data}] = useMutation(UPDATE_USER_PASSWORD);

  //   const handleChange = (event) => {
  //     const { email, password } = event.target;

  //     setFormState({
  //       ...formState,
  //       [email]: value,
  //       [password]: value,
  //     });
  //   };

  //   const handleFormSubmit = async (event) => {
  //     event.preventDefault();
  //     console.log(formState);

  //     try {
  //       const { email } = await updateEmail({
  //         variables: {...formState },
  //       });
  //       const { password } = await updatePassword({
  //         variables: {...formState }
  //       });
  //       Auth.login(data.token);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  // };

  return (
    <Container className={styles.Container}>
      <h2 className={ styles.Header }>
        Welcome Back {`${user.username}`}!.
      </h2>
      <br/>
      <br/>
        <h4>
          What would you like to do?
        </h4>
        <br/>
        <br/>
      <Col>
        <Button
        className='Button'
        >
          Update Email
          </Button>
        <Button className='Button'
        >
          Update Password
          </Button>
        <Button className='Button'
        >
          Delete Profile
          </Button>
      </Col>
      </Container>
  );
};

export default Profile;
