import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SignUp from '../components/SignUp';

describe('SignUp', () => {
  const mockInputValue = 'abc';
  let container = null;
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    ({ container } = render(<SignUp />));
  });
  // Testing the availability of the form
  it('should be able to render sign up form', () => {
    expect(container.innerHTML).toMatchSnapshot();
    expect(screen.getByTestId('sign-up-form')).toBeInTheDocument();
  });
  // Testing the availability of the form fields
  it('should be able to enter data in the form fields', () => {
    const avatarInput = screen.getByTestId('avatar');
    const firstNameInput = screen.getByTestId('first_name');
    const lastNameInput = screen.getByTestId('last_name');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const confirmPasswordInput = screen.getByTestId('confirm_password');
    userEvent.type(firstNameInput, mockInputValue);
    userEvent.type(lastNameInput, mockInputValue);
    userEvent.type(emailInput, mockInputValue);
    userEvent.type(passwordInput, mockInputValue);
    userEvent.type(confirmPasswordInput, mockInputValue);
    expect(firstNameInput.value).toBe(mockInputValue);
    expect(lastNameInput.value).toBe(mockInputValue);
    expect(emailInput.value).toBe(mockInputValue);
    expect(passwordInput.value).toBe(mockInputValue);
    expect(confirmPasswordInput.value).toBe(mockInputValue);
  });

  // Testing the validation of the form
  it('should be able to all errors when the form is submitted without filling in all fields', () => {
    userEvent.click(screen.getByTestId('sign-up-form-submit'));
    expect(screen.getByTestId('first_name-error')).toBeInTheDocument();
    expect(screen.getByTestId('last_name-error')).toBeInTheDocument();
    expect(screen.getByTestId('email-error')).toBeInTheDocument();
    expect(screen.getByTestId('password-error')).toBeInTheDocument();
    expect(screen.getByTestId('confirm_password-error')).toBeInTheDocument();
  });
});
