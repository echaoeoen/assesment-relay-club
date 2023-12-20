import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router-dom';

describe('HomePage', () => {
  test('renders learn react link', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const element = screen.getByTestId('home-page');
    expect(element).toBeInTheDocument();
  });
});
