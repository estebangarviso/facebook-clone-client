import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SignIn from '../components/SignIn';

describe('SignIn', () => {
  let container = null;
  beforeEach(() => {
    ({ container } = render(<SignIn />));
  });

  it('should be able to render sign in form', () => {
    expect(container.innerHTML).toMatchSnapshot();
    expect(screen.getByTestId('sign-in-form')).toBeInTheDocument();
  });

  it('should be able to enter email', () => {
    const emailInput = screen.getByTestId('email');
    userEvent.type(emailInput, 'abc');
    expect(emailInput.value).toBe('abc');
  });

  it('should be able to visualize password if user clicks on toggle password button', () => {
    const passwordInput = screen.getByTestId('password');
    const iconButton = screen.getByTestId('password-toggle-password');
    userEvent.click(iconButton);
    expect(passwordInput.type).toBe('text');
  });
});
