import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

import styles from './Profile.module.css';



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

  return (
    <div>
      <h2 className={ styles.Header }>
        Welcome Back {`${user.username}`}!.
      </h2>
    </div>
  );
};

export default Profile;
