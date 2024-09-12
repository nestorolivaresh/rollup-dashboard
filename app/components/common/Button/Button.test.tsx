import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '.';

jest.mock('../CircleLoader', () => ({
  CircleLoader: () => <div data-testid="circle-loader">Loading...</div>,
}));

describe('Button Component', () => {
  const mockOnClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders button with children', () => {
    render(<Button onClick={mockOnClick}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    render(<Button onClick={mockOnClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('renders with custom className', () => {
    render(<Button onClick={mockOnClick} className="custom-class">Click me</Button>);
    expect(screen.getByText('Click me')).toHaveClass('custom-class');
  });

  test('renders as disabled when disabled prop is true', () => {
    render(<Button onClick={mockOnClick} disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
    expect(screen.getByText('Click me')).toHaveClass('opacity-50 cursor-not-allowed');
  });

  test('renders CircleLoader when loading prop is true', () => {
    render(<Button onClick={mockOnClick} loading>Click me</Button>);
    expect(screen.getByTestId('circle-loader')).toBeInTheDocument();
    expect(screen.queryByText('Click me')).not.toBeInTheDocument();
  });

  test('renders icon with children when icon prop is provided', () => {
    const icon = <span data-testid="test-icon">🔍</span>;
    render(<Button onClick={mockOnClick} icon={icon}>Search</Button>);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('applies default styles', () => {
    render(<Button onClick={mockOnClick}>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('w-full h-[40px] bg-[#ccbfb6] py-[10px] rounded-md text-[#000] text-sm font-medium hover:opacity-90 cursor-pointer');
  });

  test('does not call onClick when disabled', () => {
    render(<Button onClick={mockOnClick} disabled>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('passes additional props to button element', () => {
    render(<Button onClick={mockOnClick} data-testid="custom-button">Click me</Button>);
    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
  });
});