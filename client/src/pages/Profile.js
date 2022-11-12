import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import Container from 'react-bootstrap/esm/Container';
// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'


import styles from './Profile.module.css';
import Button from 'react-bootstrap/Button';
// import { valueFromAST } from 'graphql';
// import { UPDATE_USER_EMAIL, UPDATE_USER_PASSWORD } from '../utils/mutations';



const Profile = () => {

  const { loading, data } = useQuery( QUERY_ME);

  const user = data?.me || {};
  const [deleteUser] = useMutation(DELETE_USER);

  if (!Auth.loggedIn()) {
    return <Navigate to='/login' />;
  }
  
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
          <Button variant="primary" onClick={handleDeleteModalClose}>Do Not Delete</Button>
          <Button variant="secondary" onClick = {handleDeleteUser} >Delete Profile</Button>
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
      </Col>
      <Col>
        <Button className='Button'
        >
          Update Password
          </Button>
      </Col>
      <Col>
        <DeleteModal />
      </Col>
      </Container>
      
  );
};

export default Profile;
