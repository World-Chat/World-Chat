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

      // Check if user is already authenticated
      if (MiniKit.user && MiniKit.user.username && MiniKit.user.walletAddress) {
        console.log('User already authenticated with username:', MiniKit.user.username);
        
        this.currentUser = {
          walletAddress: MiniKit.user.walletAddress,
          username: MiniKit.user.username,
          profilePictureUrl: MiniKit.user.profilePictureUrl,
          permissions: MiniKit.user.permissions,
          optedIntoOptionalAnalytics: MiniKit.user.optedIntoOptionalAnalytics,
          worldAppVersion: MiniKit.user.worldAppVersion,
          deviceOS: MiniKit.user.deviceOS,
        };

        console.log('Using existing authenticated user:', this.currentUser);
        return this.currentUser;
      }

      // Trigger wallet authentication to populate MiniKit.user
      console.log('MiniKit.user exists but not populated, triggering wallet auth...');
      
      try {
        const authResult = await MiniKit.commandsAsync.walletAuth({
          nonce: Math.random().toString(36).substring(2, 15),
          requestId: Math.random().toString(36).substring(2, 15),
          expirationTime: new Date(Date.now() + 5 * 60 * 1000),
          notBefore: new Date(),
          statement: 'Sign in to World Chat to access your conversations',
        });

        console.log('Wallet auth result:', authResult);

        if (authResult.finalPayload && authResult.finalPayload.status === 'success') {
          // After successful auth, MiniKit.user should now be populated
          if (MiniKit.user && MiniKit.user.walletAddress) {
            this.currentUser = {
              walletAddress: MiniKit.user.walletAddress,
              username: MiniKit.user.username,
              profilePictureUrl: MiniKit.user.profilePictureUrl,
              permissions: MiniKit.user.permissions,
              optedIntoOptionalAnalytics: MiniKit.user.optedIntoOptionalAnalytics,
              worldAppVersion: MiniKit.user.worldAppVersion,
              deviceOS: MiniKit.user.deviceOS,
            };

            console.log('Wallet auth successful, user data:', this.currentUser);
            
            // Store user data in localStorage
            const userDataForStorage = {
              id: this.currentUser.walletAddress,
              username: this.currentUser.username || 'Unknown User',
              address: this.currentUser.walletAddress,
              profilePicture: this.currentUser.profilePictureUrl || 'https://via.placeholder.com/40',
            };
            
            localStorage.setItem('world-app-user', JSON.stringify(userDataForStorage));
            
            // Dispatch custom event to notify MessagingContext
            const event = new CustomEvent('user-authenticated', {
              detail: userDataForStorage
            });
            window.dispatchEvent(event);
            
            return this.currentUser;
          } else {
            console.warn('Wallet auth succeeded but MiniKit.user still not populated');
            return null;
          }
        } else {
          console.warn('Wallet auth failed:', authResult);
          return null;
        }
      } catch (authError) {
        console.error('Wallet auth error:', authError);
        // If wallet auth fails, check if MiniKit.user got populated anyway
        if (MiniKit.user && MiniKit.user.walletAddress) {
          console.log('Auth failed but MiniKit.user is now available');
          this.currentUser = {
            walletAddress: MiniKit.user.walletAddress,
            username: MiniKit.user.username,
            profilePictureUrl: MiniKit.user.profilePictureUrl,
            permissions: MiniKit.user.permissions,
            optedIntoOptionalAnalytics: MiniKit.user.optedIntoOptionalAnalytics,
            worldAppVersion: MiniKit.user.worldAppVersion,
            deviceOS: MiniKit.user.deviceOS,
          };
          
          // Store user data in localStorage
          const userDataForStorage = {
            id: this.currentUser.walletAddress,
            username: this.currentUser.username || 'Unknown User',
            address: this.currentUser.walletAddress,
            profilePicture: this.currentUser.profilePictureUrl || 'https://via.placeholder.com/40',
          };
          
          localStorage.setItem('world-app-user', JSON.stringify(userDataForStorage));
          
          // Dispatch custom event to notify MessagingContext
          const event = new CustomEvent('user-authenticated', {
            detail: userDataForStorage
          });
          window.dispatchEvent(event);
          
          return this.currentUser;
        }
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
        console.log('World App not installed for getUserByAddress');
        return null;
      }

      console.log('Getting user by address:', address);
      // Use the official method from the documentation
      const worldIdUser = await MiniKit.getUserByAddress(address);
      console.log('getUserByAddress result:', worldIdUser);
      
      return worldIdUser as WorldAppUser;
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