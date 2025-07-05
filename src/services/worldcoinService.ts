import { PaymentRequest } from '../types/messaging';
import { initiatePayment, confirmPayment } from '../api/initiate-payment';
import { MiniKit, PayCommandInput, TokensPayload } from '@worldcoin/minikit-js';

// Mock MiniKit for development/fallback
class MockMiniKit {
  user = {
    address: '0x1234567890123456789012345678901234567890',
    username: 'user.world',
    profilePicture: 'https://via.placeholder.com/40',
  };

  isInstalled() {
    return false; // Mock as not installed for fallback
  }

  async getUserByAddress(address: string) {
    return {
      address,
      username: `${address.slice(0, 6)}...${address.slice(-4)}.world`,
      profilePicture: 'https://via.placeholder.com/40',
    };
  }

  commandsAsync = {
    pay: async (payload: PayCommandInput) => {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        finalPayload: {
          status: 'success',
          transaction_id: `tx_${Math.random().toString(36).substr(2, 9)}`,
          reference: payload.reference,
        }
      };
    }
  };
}

const mockMiniKit = new MockMiniKit();

// Mock token conversion
const tokenToDecimals = (amount: number, token: string): string => {
  const decimals = token === 'WLD' ? 8 : 6;
  return (amount * Math.pow(10, decimals)).toString();
};

export class WorldcoinService {
  private static instance: WorldcoinService;
  
  private constructor() {}
  
  public static getInstance(): WorldcoinService {
    if (!WorldcoinService.instance) {
      WorldcoinService.instance = new WorldcoinService();
    }
    return WorldcoinService.instance;
  }

  isInstalled(): boolean {
    // Check if MiniKit is available and installed
    try {
      if (typeof MiniKit !== 'undefined' && MiniKit.isInstalled) {
        return MiniKit.isInstalled();
      }
      return false;
    } catch (error) {
      console.warn('MiniKit not available:', error);
      return false;
    }
  }

  async getUserByAddress(address: string) {
    try {
      if (this.isInstalled() && MiniKit.getUserByAddress) {
        return await MiniKit.getUserByAddress(address);
      }
      return await mockMiniKit.getUserByAddress(address);
    } catch (error) {
      console.error('Failed to get user by address:', error);
      throw error;
    }
  }

  async initiatePayment(): Promise<{ id: string }> {
    try {
      return await initiatePayment();
    } catch (error) {
      console.error('Failed to initiate payment:', error);
      throw error;
    }
  }

  async sendPayment(paymentRequest: PaymentRequest): Promise<unknown> {
    try {
      const payload: PayCommandInput = {
        reference: paymentRequest.reference,
        to: paymentRequest.to,
        tokens: paymentRequest.tokens.map(token => ({
          symbol: token.symbol as TokensPayload['symbol'],
          token_amount: token.token_amount,
        })),
        description: paymentRequest.description,
      };

      if (!this.isInstalled()) {
        throw new Error('World App is not installed');
      }

      const { finalPayload } = await MiniKit.commandsAsync.pay(payload);
      return finalPayload;
    } catch (error) {
      console.error('Failed to send payment:', error);
      throw error;
    }
  }

  async confirmPayment(payload: unknown): Promise<{ success: boolean }> {
    try {
      return await confirmPayment(payload);
    } catch (error) {
      console.error('Failed to confirm payment:', error);
      throw error;
    }
  }

  tokenToDecimals(amount: number, token: 'WLD' | 'USDC'): string {
    return tokenToDecimals(amount, token);
  }

  getCurrentUser() {
    // Use real MiniKit if available and installed
    if (this.isInstalled() && MiniKit.user) {
      return MiniKit.user;
    }
    
    // Fallback to mock for desktop testing
    return {
      walletAddress: '0x1234567890123456789012345678901234567890',
      username: 'Desktop User',
      profilePictureUrl: 'https://via.placeholder.com/40',
    };
  }
} 