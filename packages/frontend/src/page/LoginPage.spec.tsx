import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  test('renders learn react link', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    const element = screen.getByTestId('login-page');
    expect(element).toBeInTheDocument();
  });
});
