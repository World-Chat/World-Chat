import { MiniAppPaymentSuccessPayload } from '@worldcoin/minikit-js';

// Store reference IDs in memory for verification
// In a real app, this would be stored in a database
const paymentReferences = new Map<string, { 
  id: string; 
  timestamp: Date; 
  verified: boolean; 
}>();

export async function initiatePayment(): Promise<{ id: string }> {
  // Generate a unique reference ID
  const uuid = crypto.randomUUID().replace(/-/g, '');
  
  // Store the reference ID for later verification
  paymentReferences.set(uuid, {
    id: uuid,
    timestamp: new Date(),
    verified: false,
  });
  
  console.log('Payment initiated with reference:', uuid);
  
  return { id: uuid };
}

export async function confirmPayment(payload: MiniAppPaymentSuccessPayload): Promise<{ success: boolean }> {
  try {
    console.log('Confirming payment with payload:', payload);
    
    // Check if we have the reference ID
    const referenceRecord = paymentReferences.get(payload.reference);
    if (!referenceRecord) {
      console.error('Invalid payment reference:', payload.reference);
      return { success: false };
    }
    
    // In a real app, you would call the World App Developer Portal API here
    // to verify the transaction status
    
    // For now, we'll simulate the API call
    const isValidTransaction = await verifyTransactionWithWorldApp(payload);
    
    if (isValidTransaction) {
      // Mark the payment as verified
      referenceRecord.verified = true;
      paymentReferences.set(payload.reference, referenceRecord);
      
      console.log('Payment confirmed successfully:', payload.reference);
      return { success: true };
    } else {
      console.error('Transaction verification failed for:', payload.reference);
      return { success: false };
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    return { success: false };
  }
}

// Simulate the World App Developer Portal API call
async function verifyTransactionWithWorldApp(payload: MiniAppPaymentSuccessPayload): Promise<boolean> {
  // In a real app, this would make an API call to:
  // https://developer.worldcoin.org/api/v2/minikit/transaction/${payload.transaction_id}?app_id=${APP_ID}
  // with proper authorization headers
  
  // For now, we'll simulate a successful verification
  // if the payload has the required fields
  if (payload.transaction_id && payload.reference && payload.status === 'success') {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
  
  return false;
}

// Helper function to get payment status (for debugging)
export function getPaymentStatus(reference: string): { exists: boolean; verified: boolean } {
  const record = paymentReferences.get(reference);
  return {
    exists: !!record,
    verified: record?.verified || false,
  };
} 