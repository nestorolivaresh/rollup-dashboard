import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import { useAccount, useWriteContract } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { toast } from 'react-toastify';
import { Faucet } from '.';

// Mock the imported modules
jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  useWriteContract: jest.fn(),
}));

jest.mock('@rainbow-me/rainbowkit', () => ({
  useConnectModal: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Faucet Component', () => {
  const mockWriteContract = jest.fn();
  const mockOpenConnectModal = jest.fn();
  beforeEach(() => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: false });
    (useWriteContract as jest.Mock).mockReturnValue({ 
      writeContract: mockWriteContract,
      isPending: false,
      error: null,
      data: null,
    });
    (useConnectModal as jest.Mock).mockReturnValue({ openConnectModal: mockOpenConnectModal });
  });

  it('renders the component correctly', () => {
    render(<Faucet />);
    expect(screen.getByText('Faucet')).toBeInTheDocument();
    expect(screen.getByText('Request gas tokens into your wallet (max every 30 min)')).toBeInTheDocument();
  });

  it('displays "Connect Wallet" button when not connected', () => {
    render(<Faucet />);
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });

  it('opens connect modal when "Connect Wallet" is clicked', () => {
    render(<Faucet />);
    fireEvent.click(screen.getByText('Connect Wallet'));
    expect(mockOpenConnectModal).toHaveBeenCalled();
  });

  it('displays "Request" button when connected', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: true });
    render(<Faucet />);
    expect(screen.getByText('Request')).toBeInTheDocument();
  });

  it('calls writeContract when "Request" is clicked', async () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: true });
    render(<Faucet />);
    await act(async () => {
      fireEvent.click(screen.getByText('Request'));
    });
    expect(mockWriteContract).toHaveBeenCalled();
  });

  it('shows success toast when tokens are requested successfully', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: true });
    const { rerender } = render(<Faucet />);
    
    // Simulate successful token request
    (useWriteContract as jest.Mock).mockReturnValue({ 
      writeContract: mockWriteContract,
      isPending: false,
      error: null,
      data: '0xtransactionhash',
    });
    
    rerender(<Faucet />);
    expect(toast.success).toHaveBeenCalledWith('Tokens requested successfully');
  });

  it('shows error toast when token request fails', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: true });
    const { rerender } = render(<Faucet />);
    
    (useWriteContract as jest.Mock).mockReturnValue({ 
      writeContract: mockWriteContract,
      isPending: false,
      error: new Error('Transaction failed'),
      data: null,
    });
    
    rerender(<Faucet />);
    expect(toast.error).toHaveBeenCalledWith('An error occurred while requesting tokens. Please try again later.');
  });

  it('disables the "Request" button while transaction is pending', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: true });
    (useWriteContract as jest.Mock).mockReturnValue({ 
      writeContract: mockWriteContract,
      isPending: true,
      error: null,
      data: null,
    });
    
    render(<Faucet />);
    expect(screen.getByText('Request')).toBeDisabled();
  });
});