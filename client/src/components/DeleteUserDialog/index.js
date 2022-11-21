import React from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import styles from './DeleteUserDialog.module.css';

const DeleteUserDialog = ({ open, close }) => {

  const [deleteUser] = useMutation(DELETE_USER);

  const handleClose = () => {
    close();
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

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle 
        className={ styles.Header }
      >Delete Profile</DialogTitle>
      <p className={ styles.BodyText }>Are you sure?</p>
      <p className={ styles.BodyText }>
        This will delete everything in your account, including your Flavor Profile and all your reviews
      </p>
      <p className={ styles.BodyText }>
        This action cannot be reversed!
      </p>
      <button 
        className='CancelButton'
        onClick={handleDeleteUser}
      >
        Yes, Delete My Account!
      </button>
      <button 
        className='Button'
        onClick={handleClose}
      >
        No, I changed my mind
      </button>
    </Dialog>
  )
}

export default DeleteUserDialog;