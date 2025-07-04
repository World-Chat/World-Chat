import { MiniKit, PayCommandInput, Tokens, tokenToDecimals, MiniAppPaymentSuccessPayload } from '@worldcoin/minikit-js';
import { initiatePayment, confirmPayment } from '../api/initiate-payment';
import { PaymentRequest } from '../types/messaging';

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
    // Check if we're running inside World App's webview
    const isInWorldApp = typeof window !== 'undefined' && 
      (window.navigator.userAgent.includes('WorldApp') || 
       window.navigator.userAgent.includes('Worldcoin') ||
       window.location.href.includes('worldcoin') ||
       window.location.href.includes('worldapp') ||
       // Check if MiniKit is available in the global scope
       typeof (window as unknown as { MiniKit?: unknown }).MiniKit !== 'undefined');
    
    // Debug logging to help troubleshoot
    console.log('World App detection:', {
      userAgent: window?.navigator?.userAgent,
      location: window?.location?.href,
      isInWorldApp,
      miniKitInstalled: MiniKit.isInstalled()
    });
    
    // If we're in World App's webview, consider it "installed"
    if (isInWorldApp) {
      return true;
    }
    
    // Otherwise, use the standard check
    return MiniKit.isInstalled();
  }

  async getUserByAddress(address: string) {
    try {
      // For now, return mock user data since MiniKit doesn't have getUserByAddress
      return {
        address,
        username: `${address.slice(0, 6)}...${address.slice(-4)}.world`,
        profilePicture: 'https://via.placeholder.com/40',
      };
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

  async sendPayment(paymentRequest: PaymentRequest): Promise<MiniAppPaymentSuccessPayload | { status: 'error'; error_code: string }> {
    try {
      if (!this.isInstalled()) {
        throw new Error('World App is not available. Please make sure you are using World App.');
      }

      const payload: PayCommandInput = {
        reference: paymentRequest.reference,
        to: paymentRequest.to,
        tokens: paymentRequest.tokens.map(token => ({
          symbol: token.symbol === 'WLD' ? Tokens.WLD : Tokens.USDC,
          token_amount: token.token_amount,
        })),
        description: paymentRequest.description,
      };

      const { finalPayload } = await MiniKit.commandsAsync.pay(payload);
      return finalPayload;
    } catch (error) {
      console.error('Failed to send payment:', error);
      throw error;
    }
  }

  async confirmPayment(payload: MiniAppPaymentSuccessPayload): Promise<{ success: boolean }> {
    try {
      return await confirmPayment(payload);
    } catch (error) {
      console.error('Failed to confirm payment:', error);
      throw error;
    }
  }

  tokenToDecimals(amount: number, token: 'WLD' | 'USDC'): string {
    const tokenType = token === 'WLD' ? Tokens.WLD : Tokens.USDC;
    return tokenToDecimals(amount, tokenType).toString();
  }

  getCurrentUser() {
    // For now, return mock user data since MiniKit doesn't expose user info directly
    // In a real app, you'd get this from your authentication system
    return {
      address: '0x1234567890123456789012345678901234567890',
      username: 'user.world',
      profilePicture: 'https://via.placeholder.com/40',
    };
  }
} 