import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../page';
import { act } from 'react-dom/test-utils';

describe('Home', () => {
  it('should render the input field', () => {
    render(<Home />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('should render the mask button', () => {
    render(<Home />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('should render the box with the appropriate text', () => {
    render(<Home />);

    const box = screen.getByText('Masked URL will appear here');
    expect(box).toBeInTheDocument();
  });

  it('should render the mask button with the text "Mask"', () => {
    render(<Home />);

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Mask');
  });

  it('should render input placeholder correctly', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText('Enter URL here');

    expect(input).toBeInTheDocument();
  });

  it('should validate the input correctly (is not empty)', () => {
    render(<Home />);

    const button = screen.getByRole('button');

    act(() => {
        button.click();
    });

    const snackbar = screen.getByText('Please enter a URL.');

    expect(snackbar).toBeInTheDocument();
  });

  it('should validate the input correctly (contains http tag)', () => {
    render(<Home />);

    const input: HTMLInputElement = screen.getByRole('textbox');
    const button: HTMLButtonElement = screen.getByRole('button');

    act(() => {
        fireEvent.change(input, { target: { value: 'google.com'}});
        button.click();
    });

    const snackbar = screen.getByText(`The URL must contain 'http://' or 'https://' at the beginning.`);

    expect(snackbar).toBeInTheDocument();
  });

  it('should validate the input correctly (contains a dot)', () => {
    render(<Home />);

    const input: HTMLInputElement = screen.getByRole('textbox');
    const button: HTMLButtonElement = screen.getByRole('button');

    act(() => {
        fireEvent.change(input, { target: { value: 'http://googlecom'}});
        button.click();
    });

    const snackbar = screen.getByText('Please enter a valid URL.');

    expect(snackbar).toBeInTheDocument();
  });
});
