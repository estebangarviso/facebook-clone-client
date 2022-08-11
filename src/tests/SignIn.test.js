import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SignIn from '../components/SignIn';

test('should render sign in form', () => {
  render(<SignIn />);
  expect(screen.getByTestId('sign-in-form')).toBeInTheDocument();
});

test('should be able to enter email', () => {
  render(<SignIn />);
  const formTextField = screen.getByTestId('email');
  const emailInput = formTextField.querySelector('input');
  fireEvent.change(emailInput, { target: { value: 'abc' } });
  expect(emailInput.value).toBe('abc');
});

test('should be able to visualize password if we click on InputProps.endAdornment of the FormPassword component', () => {
  render(<SignIn />);
  const formPassword = screen.getByTestId('password');
  const iconButton = formPassword.querySelector('button.MuiIconButton-edgeEnd');
  fireEvent.click(iconButton);
  expect(formPassword.querySelector('input[type="text"]')).toBeInTheDocument();
});
