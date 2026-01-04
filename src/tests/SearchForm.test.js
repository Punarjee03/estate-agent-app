/**
 * SearchForm Component Tests
 * 
 * Tests the search form functionality including:
 * - Component rendering
 * - Form submission
 * - Reset functionality
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../components/SearchForm';

describe('SearchForm Component', () => {
  
  test('renders search form heading', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const heading = screen.getByRole('heading', { name: /Search Properties/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders price range label', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);
    
    expect(screen.getByText(/Price Range/i)).toBeInTheDocument();
  });

  test('renders postcode input field', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const postcodeInput = screen.getByPlaceholderText(/e.g. BR1, NW1, SW1/i);
    expect(postcodeInput).toBeInTheDocument();
  });

  test('renders search button', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const searchButton = screen.getByRole('button', { name: /Search Properties/i });
    expect(searchButton).toBeInTheDocument();
  });

  test('renders reset button', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const resetButton = screen.getByRole('button', { name: /Reset/i });
    expect(resetButton).toBeInTheDocument();
  });

  test('calls onSearch when form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const searchButton = screen.getByRole('button', { name: /Search Properties/i });
    fireEvent.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalled();
  });

  test('postcode input accepts text input', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const postcodeInput = screen.getByPlaceholderText(/e.g. BR1, NW1, SW1/i);
    fireEvent.change(postcodeInput, { target: { value: 'NW1' } });
    
    expect(postcodeInput.value).toBe('NW1');
  });

  test('calls onSearch when reset button is clicked', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const resetButton = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButton);
    
    expect(mockOnSearch).toHaveBeenCalled();
  });
});