import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home', () => {
  it('should render the input field', () => {
    render(<Home />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });
});
