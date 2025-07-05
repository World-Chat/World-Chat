import { PaymentRequest } from '../types/messaging';
import { initiatePayment, confirmPayment } from '../api/initiate-payment';
import { MiniKit, PayCommandInput, TokensPayload } from '@worldcoin/minikit-js';

// World App User type from the documentation
export type WorldAppUser = {
  walletAddress?: string;
  username?: string;
  profilePictureUrl?: string;
  permissions?: {
    notifications: boolean;
    contacts: boolean;
  };
  optedIntoOptionalAnalytics?: boolean;
  worldAppVersion?: number;
  deviceOS?: string;
};

// Mock token conversion
const tokenToDecimals = (amount: number, token: string): string => {
  const decimals = token === 'WLD' ? 8 : 6;
  return (amount * Math.pow(10, decimals)).toString();
};

export class WorldcoinService {
  private static instance: WorldcoinService;
  private currentUser: WorldAppUser | null = null;
  
  private constructor() {}
  
  public static getInstance(): WorldcoinService {
    if (!WorldcoinService.instance) {
      WorldcoinService.instance = new WorldcoinService();
    }
    return WorldcoinService.instance;
  }

  isInstalled(): boolean {
    try {
      return MiniKit.isInstalled();
    } catch (error) {
      console.warn('MiniKit not available:', error);
      return false;
    }
  }

  async authenticateWithWallet(): Promise<WorldAppUser | null> {
    try {
      if (!this.isInstalled()) {
        console.log('World App not installed, using fallback');
        return null;
      }

      // Check if MiniKit has user data available
      if (typeof MiniKit.user !== 'undefined' && MiniKit.user) {
        // Use MiniKit user data directly
        const user = MiniKit.user as WorldAppUser;
        
        this.currentUser = {
          walletAddress: user.walletAddress,
          username: user.username,
          profilePictureUrl: user.profilePictureUrl,
          permissions: user.permissions,
          optedIntoOptionalAnalytics: user.optedIntoOptionalAnalytics,
          worldAppVersion: user.worldAppVersion,
          deviceOS: user.deviceOS,
        };

        console.log('Using MiniKit user data:', this.currentUser);
        return this.currentUser;
      } else {
        console.warn('MiniKit user data not available');
        return null;
      }
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }

  async getUserByAddress(address: string): Promise<WorldAppUser | null> {
    try {
      if (!this.isInstalled()) {
        return null;
      }

      const user = await MiniKit.getUserByAddress(address);
      return user;
    } catch (error) {
      console.error('Failed to get user by address:', error);
      return null;
    }
  }

  async getUserByUsername(username: string): Promise<WorldAppUser | null> {
    try {
      if (!this.isInstalled()) {
        return null;
      }

      const user = await MiniKit.getUserByUsername(username);
      return user;
    } catch (error) {
      console.error('Failed to get user by username:', error);
      return null;
    }
  }

  getCurrentUser(): WorldAppUser | null {
    // Return the authenticated user if we have one
    if (this.currentUser) {
      return this.currentUser;
    }

    // Fallback for desktop testing
    return {
      walletAddress: '0x1234567890123456789012345678901234567890',
      username: 'Desktop User',
      profilePictureUrl: 'https://via.placeholder.com/40',
    };
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
} 