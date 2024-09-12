import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContractItem } from '.';
import { useRollupContext } from "../../../../context/useRollupContext";
import { ARBITRUM_SEPOLIA_TESTNET_URL } from "../../../../constants/rollup";

// Mock the useRollupContext hook
jest.mock("../../../../context/useRollupContext", () => ({
  useRollupContext: jest.fn(),
}));

// Mock the Tooltip component
jest.mock('react-tooltip', () => ({
  Tooltip: jest.fn(() => null),
}));

describe('ContractItem', () => {
  const mockProps = {
    label: 'Test Contract',
    address: '0x1234567890123456789012345678901234567890',
    isL2: true,
  };

  const mockRollup = {
    urls: {
      l2: {
        explorer: 'https://l2-explorer.com/',
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRollupContext as jest.Mock).mockReturnValue({ rollup: mockRollup, loadingRollupData: false });
  });

  it('renders correctly with provided props', () => {
    render(<ContractItem {...mockProps} />);
    
    expect(screen.getByText('Contract Name')).toBeInTheDocument();
    expect(screen.getByText('Test Contract')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText(mockProps.address)).toBeInTheDocument();
  });

  it('renders skeleton when loading', () => {
    (useRollupContext as jest.Mock).mockReturnValue({ loadingRollupData: true });
    render(<ContractItem {...mockProps} />);
    
    expect(screen.getAllByTestId('skeleton')).toHaveLength(2);
  });

  it('uses correct explorer URL for L2', () => {
    render(<ContractItem {...mockProps} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `${mockRollup.urls.l2.explorer}address/${mockProps.address}`);
  });

  it('uses correct explorer URL for L1', () => {
    render(<ContractItem {...mockProps} isL2={false} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `${ARBITRUM_SEPOLIA_TESTNET_URL}address/${mockProps.address}`);
  });

  it('copies address to clipboard when copy button is clicked', async () => {
    const mockClipboard = {
      writeText: jest.fn().mockResolvedValue(undefined),
    };
    Object.assign(navigator, {
      clipboard: mockClipboard,
    });

    render(<ContractItem {...mockProps} />);
    
    const copyButton = screen.getByRole('button');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(mockClipboard.writeText).toHaveBeenCalledWith(mockProps.address);
    });

    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });

  it('shows error in console if copying fails', async () => {
    const mockClipboard = {
      writeText: jest.fn().mockRejectedValue(new Error('Copy failed')),
    };
    Object.assign(navigator, {
      clipboard: mockClipboard,
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<ContractItem {...mockProps} />);
    
    const copyButton = screen.getByRole('button');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to copy text: ', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});