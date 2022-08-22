import React from 'react';
import Form from '../Form';
import FormAvatarUpload from '../Form/FormAvatarUpload';
import FormTextField from '../Form/FormTextField';
import FormPassword from '../Form/FormPassword';
import FormButton from '../Form/FormButton';
import { Box, Typography } from '@mui/material';
import schema from './schema';
import AuthService from '../../services/AuthService';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../app/routes';

const SignUp = () => {
  const handleSuccess = () => {
    return <Navigate to={AppRoutes.LOGIN} />;
  };
  return (
    <Form
      serviceCallback={AuthService.register}
      validationSchema={schema}
      defaultValues={{
        avatar: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSuccess={handleSuccess}
      data-testid='sign-up-form'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <FormAvatarUpload name='avatar' label='Avatar' />
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '.5rem' }}>
          <FormTextField
            name='first_name'
            type='text'
            label='First Name'
            required
            inputProps={{
              'data-testid': 'first_name'
            }}
          />
          <FormTextField
            name='last_name'
            type='text'
            label='Last Name'
            required
            inputProps={{
              'data-testid': 'last_name'
            }}
          />
        </Box>
        <FormTextField
          name='email'
          type='email'
          label='Email'
          required
          inputProps={{
            'data-testid': 'email'
          }}
        />
        <FormPassword
          name='password'
          label='Password'
          required
          inputProps={{
            'data-testid': 'password'
          }}
        />

        <FormPassword
          name='confirm_password'
          label='Confirm Password'
          required
          inputProps={{
            'data-testid': 'confirm_password'
          }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FormButton
            type='submit'
            variant='contained'
            color='success'
            sx={{ color: 'white' }}
            animated
            data-testid='submit'>
            <Typography variant='button'>Sign Up</Typography>
          </FormButton>
        </Box>
      </Box>
    </Form>
  );
};

export default SignUp;
