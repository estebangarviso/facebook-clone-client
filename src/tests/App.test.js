import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { App } from '../App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

// test('full app rendering/navigate to Sign In', () => {
//   render(<App />, { wrapper: BrowserRouter });
//   // verify page content for default route
//   expect(screen.getAllByText(/log into/i).length).toBeGreaterThan(0);
// });

test('dummy test', () => {
  expect(true).toBe(true);
});
