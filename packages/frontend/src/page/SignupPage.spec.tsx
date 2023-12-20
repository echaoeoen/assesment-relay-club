import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from './SignupPage';

describe('SignupPage', () => {
  test('renders learn react link', () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );

    const element = screen.getByTestId('signup-page');
    expect(element).toBeInTheDocument();
  });
});
