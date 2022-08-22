import React, { useContext } from 'react';
import Form from '../Form';
import { Box, Typography } from '@mui/material';
import GlobalContext from '../../context';
import AuthService from '../../services/AuthService';
import FormTextField from '../Form/FormTextField';
import FormButton from '../Form/FormButton';
import schema from './schema';
import FormPassword from '../Form/FormPassword';

const SignIn = () => {
  const { auth } = useContext(GlobalContext);
  const handleSuccess = (res) => {
    auth.login(res.data.token);
  };
  return (
    <Form
      serviceCallback={AuthService.login}
      validationSchema={schema}
      defaultValues={{
        email: '',
        password: ''
      }}
      onSuccess={handleSuccess}
      autoComplete='off'
      data-testid='sign-in-form'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Typography variant='h5'>Sign In</Typography>
        <FormTextField name='email' label='Email' variant='outlined' inputProps={{ 'data-testid': 'email' }} />
        <FormPassword name='password' label='Password' variant='outlined' inputProps={{ 'data-testid': 'password' }} />
        <FormButton type='submit' variant='contained' color='primary' animated data-testid='submit'>
          <Typography variant='button'>Log In</Typography>
        </FormButton>
      </Box>
    </Form>
  );
};

export default SignIn;
