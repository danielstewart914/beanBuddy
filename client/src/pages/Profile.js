import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER_EMAIL, UPDATE_USER_PASSWORD } from '../utils/mutations';
import Auth from '../utils/auth';
import DeleteUserDialog from '../components/DeleteUserDialog';

import styles from './Profile.module.css';

const Profile = () => {

  const { loading, data } = useQuery( QUERY_ME);

  const user = data?.me || {};

  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  }

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
      toggleEditPassword();
    } else {
      setPasswordErrorMessage('Password must be between 5 & 15 characters.')
    }
  };

  if (!Auth.loggedIn()) {
    return <Navigate to='/login' />;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const bullets = () => {
    return [...Array(12)].map( ( e, i ) => <span key={ i }>&bull;</span> )
  };

  return (
    <main className={styles.Main}>
      <h2 className={ styles.Header }>
        Welcome Back {`${user.username}`}!.
      </h2>
      <h3 className={styles.Prompt}>
        What would you like to do?
      </h3>
      <div className={ styles.UserInfo }>
        {
          editEmail ? (
            <> 
              <div style={ { textAlign: 'center' } }>
                <input className={ styles.Input } type='text' onChange={handleEmailFormChange}/>
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
        {
          editPassword ? (
            <> 
              <div style={ { textAlign: 'center' } }>
                <input className={ styles.Input } type='password' onChange={handlePasswordFormChange}/>
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
        <button className='CancelButton' onClick={handleClickOpenDeleteDialog}>Delete My Account</button>
      </div>
      <DeleteUserDialog 
          open={openDeleteDialog}
          close={handleCloseDeleteDialog}
          styles={styles}
        />
    </main>
  );
};

export default Profile;