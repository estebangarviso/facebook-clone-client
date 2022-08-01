import React, { useContext } from 'react';
import { Avatar } from '@mui/material';
import { BACKEND_URL } from '../../app/config';
import GlobalContext from '../../context';
const UserAvatar = ({ relativePath, ...otherProps }) => {
  const { auth } = useContext(GlobalContext);
  if (relativePath) {
    return <Avatar src={BACKEND_URL + relativePath} {...otherProps} />;
  }
  return <Avatar src={BACKEND_URL + auth.currentUser?.avatar} {...otherProps} />;
};

export default UserAvatar;
