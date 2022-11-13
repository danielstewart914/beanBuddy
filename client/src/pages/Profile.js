import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_USER, UPDATE_USER_EMAIL, UPDATE_USER_PASSWORD } from '../utils/mutations';
import Auth from '../utils/auth';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'

import styles from './Profile.module.css';
import Button from 'react-bootstrap/Button';

const Profile = () => {

  const { loading, data } = useQuery( QUERY_ME);

  const user = data?.me || {};
  const [deleteUser] = useMutation(DELETE_USER);

  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [updateEmail] = useMutation(UPDATE_USER_EMAIL, {
    variables: {email: newEmail}
  });

  const handleEmailFormChange = (event) => {
    setNewEmail(event.target.value);
    setEmailErrorMessage('');
  };

  const toggleEditEmail = () => {
    setEditEmail(editEmail ? false : true)
  };

  const handleEmailSubmission = (event) => {
    event.preventDefault();
    if (/.+@.+\..+/.test(newEmail)) {
      updateEmail();
      toggleEditEmail();
    } else {
      setEmailErrorMessage('Please enter a valid email.')
    }
  };

  const [editPassword, setEditPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [updatePassword] = useMutation(UPDATE_USER_PASSWORD, {
    variables: {password: newPassword}
  });

  const handlePasswordFormChange = (event) => {
    setNewPassword(event.target.value);
    setPasswordErrorMessage('');
  };

  const toggleEditPassword = () => {
    setEditPassword(editPassword ? false : true)
  };

  const handlePasswordSubmission = (event) => {
    event.preventDefault();
    if (/.{5,15}/.test(newPassword)) {
      updatePassword();
      console.log(newPassword);
      toggleEditPassword();
    } else {
      setPasswordErrorMessage('Password must be between 5 & 15 characters.')
    }
  };

  if (!Auth.loggedIn()) {
    return <Navigate to='/login' />;
  };
  
  const handleDeleteUser = async () => {
      try {
        await deleteUser();
        Auth.logout(); 
      }
   
  catch (err) {
    console.error(err)
  }
};

  if (loading) {
    return <div>Loading...</div>;
  }

  const DeleteModal = () => {

   const [showDeleteModal, setShowDeleteModal]= useState(false);
   const handleDeleteModalClose = () => setShowDeleteModal(false);
   const handleDeleteModalShow = () => setShowDeleteModal(true);

   return(
    <>
      {showDeleteModal ? 
      
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose} dialogClassName={styles.Modal}>
        <Modal.Header closeButton>
          <Modal.Title>WARNING!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Do you want to delete your User Profile?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteModalClose} className={styles.Button}>Do Not Delete</Button>
          <Button variant="secondary" onClick = {handleDeleteUser} className={styles.Button}>Delete Profile</Button>
        </Modal.Footer>
      </Modal>
      :
      <Button className='Button' onClick={handleDeleteModalShow}
        >
          Delete Profile
          </Button>
    }
    </>
   )
  };

  const bullets = () => {
    return [...Array(12)].map( ( e, i ) => <span key={ i }>&bull;</span> )
  };

  return (
    <Container className={styles.Container}>
      <h2 className={ styles.Header }>
        Welcome Back {`${user.username}`}!.
      </h2>
      <br/>
      <br/>
        <h4 className={styles.Prompt}>
          What would you like to do?
        </h4>
        <br/>
        <br/>
      <Col>
        {
          editEmail ? (
            <> 
              <div>
                <input type='text' onChange={handleEmailFormChange}/>
                <button className='Button' onClick={handleEmailSubmission}>Update Email</button>
                <button className='CancelButton' onClick={toggleEditEmail}>Cancel</button>
              </div>
              <div>{ emailErrorMessage }</div>
            </>
            )
          :
            (
              <>
              <span className={ styles.Label }>{user.email}</span>
              <button
                className='Button' onClick={toggleEditEmail}
              >
                Update Email
              </button> 
            </>
            )
        }
      </Col>
      <Col>
        {
          editPassword ? (
            <> 
              <div>
                <input type='password' onChange={handlePasswordFormChange}/>
                <button className='Button' onClick={handlePasswordSubmission}>Update Password</button>
                <button className='CancelButton' onClick={toggleEditPassword}>Cancel</button>
              </div>
              <div>{ passwordErrorMessage }</div>
            </>
            )
          :
            (
              <> 
              <span className={ styles.Label }>{ bullets() }</span> 
              <button
                className='Button' onClick={toggleEditPassword}
              >
                Update Password
              </button> 
            </>
            )
        }
      </Col>
      <Col>
        <DeleteModal />
      </Col>
    </Container>
  );
};

export default Profile;