import { Message } from '../types/messaging';
import { WalrusStorageService, WalrusStorageResult } from './walrusStorageService';
import { SmartContractService, MessageRecord } from './smartContractService';
import { getComethConnectService } from './comethConnectService';
import { getComethConfig } from '../config/cometh';
import { ComethTransactionService } from './comethTransactionService';
import { getMongoDBService } from './mongoDBService';

export interface DecentralizedMessagingConfig {
  walrus: {
    aggregatorUrl: string;
    publisherUrl: string;
    network: 'mainnet' | 'testnet';
    mockMode?: boolean;
  };
  smartContract: {
    contractAddress: string;
    network: 'mainnet' | 'testnet';
    rpcUrl: string;
  };
}

export class DecentralizedMessagingServiceCometh {
  private walrusService: WalrusStorageService;
  private smartContractService: SmartContractService; // For reading only
  private comethConnectService: any; // For transactions only
  private mongoDBService: any; // For tracking

  constructor(config: DecentralizedMessagingConfig) {
    this.walrusService = new WalrusStorageService(config.walrus);
    this.smartContractService = new SmartContractService(config.smartContract);
    
    // Initialize MongoDB service for tracking
    try {
      console.log('🔌 Initializing MongoDB service for tracking...');
      this.mongoDBService = getMongoDBService();
      console.log('✅ MongoDB service initialized successfully');
    } catch (error) {
      console.warn('⚠️ MongoDB service not available, tracking will be disabled');
      console.error('❌ MongoDB initialization error:', error);
      this.mongoDBService = null;
    }
    
    // Initialize Cometh Connect service for transactions
    try {
      console.log('🔧 Initializing Cometh Connect service...');
      const comethConfig = getComethConfig();
      console.log('📋 Cometh config loaded:', {
        apiKey: comethConfig.apiKey ? '✅ Set' : '❌ Missing',
        bundlerUrl: comethConfig.bundlerUrl,
        paymasterUrl: comethConfig.paymasterUrl,
      });
      
      this.comethConnectService = getComethConnectService();
      console.log('✅ Cometh Connect service created successfully');
    } catch (error) {
      console.warn('⚠️ Cometh Connect service not available, falling back to read-only mode');
      console.error('❌ Cometh Connect initialization error:', error);
      this.comethConnectService = null;
    }
  }

  /**
   * Send a message using decentralized storage with Cometh Connect and MongoDB tracking
   * 1. Store message record in MongoDB
   * 2. Store message content in Walrus
   * 3. Store metadata in smart contract via Cometh Connect
   * 4. Update MongoDB record with results
   */
  async sendMessage(
    message: Message, 
    senderAddress: string,
    transactionService?: ComethTransactionService
  ): Promise<{
    walrusResult: WalrusStorageResult;
    contractTxHash: string;
    mongoDBRecordId?: string;
  }> {
    try {
      console.log(`📤 Sending decentralized message from ${senderAddress} via Cometh Connect with MongoDB tracking`);

      // Step 1: Store message record in MongoDB for tracking
      let mongoDBRecordId: string | undefined;
      if (this.mongoDBService) {
        try {
          mongoDBRecordId = await this.mongoDBService.storeMessageRecord(message, senderAddress);
          console.log(`📝 Message record stored in MongoDB: ${mongoDBRecordId}`);
        } catch (error) {
          console.warn('⚠️ Failed to store message record in MongoDB:', error);
          // Continue with the process even if MongoDB fails
        }
      }

      // Step 2: Store message content in Walrus
      const walrusResult = await this.walrusService.storeMessage(message, senderAddress);
      console.log(`✅ Message stored in Walrus with blob ID: ${walrusResult.blobId}`);

      // Step 3: Update MongoDB record with Walrus blob ID
      if (this.mongoDBService && mongoDBRecordId) {
        try {
          await this.mongoDBService.updateMessageRecord(message.id, walrusResult.blobId);
          console.log(`📝 Updated MongoDB record with Walrus blob ID: ${walrusResult.blobId}`);
        } catch (error) {
          console.warn('⚠️ Failed to update MongoDB record with Walrus blob ID:', error);
        }
      }

      // Step 4: Store metadata in smart contract via Cometh Connect
      let contractTxHash = 'pending';
      
      if (transactionService) {
        console.log('🔧 Cometh transaction service is available, attempting transaction...');
        try {
          console.log('📝 Calling storeMessageMetadata via Cometh transaction service...');
          
          const result = await transactionService.storeMessageMetadata(
            walrusResult.blobId,
            message.conversationId,
            message.messageType,
            senderAddress
          );
          
          console.log('📊 Cometh transaction result:', result);
          
          if (result.success) {
            contractTxHash = result.transactionHash || 'pending';
            console.log(`✅ Message metadata stored via Cometh Connect: ${contractTxHash}`);
          } else {
            console.warn(`⚠️ Cometh transaction failed: ${result.error}`);
            contractTxHash = 'failed';
          }
        } catch (error) {
          console.error('❌ Cometh Connect transaction error:', error);
          contractTxHash = 'error';
        }
      } else if (this.comethConnectService) {
        console.log('🔧 Cometh Connect service is available, but no transaction service provided');
        console.log('✅ Cometh Connect service is ready for transactions');
        contractTxHash = 'cometh_ready_no_service';
      } else {
        console.warn('⚠️ Cometh Connect service not available, skipping contract storage');
        console.log('🔍 Cometh Connect service status:', this.comethConnectService);
        contractTxHash = 'cometh_unavailable';
      }

      // Step 5: Update MongoDB record with contract transaction hash
      if (this.mongoDBService && mongoDBRecordId) {
        try {
          await this.mongoDBService.updateMessageRecord(message.id, walrusResult.blobId, contractTxHash);
          console.log(`📝 Updated MongoDB record with contract transaction hash: ${contractTxHash}`);
        } catch (error) {
          console.warn('⚠️ Failed to update MongoDB record with contract transaction hash:', error);
        }
      }

      return {
        walrusResult,
        contractTxHash,
        mongoDBRecordId,
      };
    } catch (error) {
      console.error('❌ Error sending decentralized message:', error);
      
      let errorMessage = 'Unknown error occurred while sending message';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        if ('error' in error) {
          errorMessage = String(error.error);
        } else if ('message' in error) {
          errorMessage = String(error.message);
        } else {
          errorMessage = JSON.stringify(error);
        }
      }
      
      throw new Error(errorMessage);
    }
  }

  /**
   * Send payment with MongoDB tracking
   */
  async sendPayment(
    paymentId: string,
    messageId: string,
    conversationId: string,
    senderId: string,
    senderAddress: string,
    recipientAddress: string,
    amount: number,
    token: 'WLD' | 'USDC',
    description?: string,
    transactionService?: ComethTransactionService
  ): Promise<{
    transactionHash?: string;
    mongoDBRecordId?: string;
  }> {
    try {
      console.log(`💰 Sending payment with MongoDB tracking...`);
      console.log(`   Payment ID: ${paymentId}`);
      console.log(`   Sender: ${senderAddress}`);
      console.log(`   Recipient: ${recipientAddress}`);
      console.log(`   Amount: ${amount} ${token}`);

      // Step 1: Store payment record in MongoDB
      let mongoDBRecordId: string | undefined;
      if (this.mongoDBService) {
        try {
          mongoDBRecordId = await this.mongoDBService.storePaymentRecord(
            paymentId,
            messageId,
            conversationId,
            senderId,
            senderAddress,
            recipientAddress,
            amount,
            token,
            description
          );
          console.log(`📝 Payment record stored in MongoDB: ${mongoDBRecordId}`);
        } catch (error) {
          console.warn('⚠️ Failed to store payment record in MongoDB:', error);
        }
      }

      // Step 2: Send payment via Cometh Connect
      let transactionHash: string | undefined;
      if (transactionService) {
        try {
          const result = await transactionService.sendPayment(recipientAddress, amount.toString(), token);
          
          if (result.success) {
            transactionHash = result.transactionHash;
            console.log(`✅ Payment sent successfully: ${transactionHash}`);
          } else {
            console.warn(`⚠️ Payment failed: ${result.error}`);
          }
        } catch (error) {
          console.error('❌ Payment transaction error:', error);
        }
      } else {
        console.warn('⚠️ No transaction service available for payment');
      }

      // Step 3: Update MongoDB record with transaction hash
      if (this.mongoDBService && mongoDBRecordId) {
        try {
          await this.mongoDBService.updatePaymentRecord(paymentId, transactionHash);
          console.log(`📝 Updated payment record in MongoDB with transaction hash: ${transactionHash}`);
        } catch (error) {
          console.warn('⚠️ Failed to update payment record in MongoDB:', error);
        }
      }

      return {
        transactionHash,
        mongoDBRecordId,
      };
    } catch (error) {
      console.error('❌ Error sending payment:', error);
      throw error;
    }
  }

  /**
   * Request money with MongoDB tracking
   */
  async requestMoney(
    requestId: string,
    messageId: string,
    conversationId: string,
    requesterId: string,
    requesterAddress: string,
    amount: number,
    token: 'WLD' | 'USDC',
    description: string
  ): Promise<{
    mongoDBRecordId?: string;
  }> {
    try {
      console.log(`📋 Requesting money with MongoDB tracking...`);
      console.log(`   Request ID: ${requestId}`);
      console.log(`   Requester: ${requesterAddress}`);
      console.log(`   Amount: ${amount} ${token}`);
      console.log(`   Description: ${description}`);

      // Store payment request record in MongoDB
      let mongoDBRecordId: string | undefined;
      if (this.mongoDBService) {
        try {
          mongoDBRecordId = await this.mongoDBService.storePaymentRequestRecord(
            requestId,
            messageId,
            conversationId,
            requesterId,
            requesterAddress,
            amount,
            token,
            description
          );
          console.log(`📝 Payment request record stored in MongoDB: ${mongoDBRecordId}`);
        } catch (error) {
          console.warn('⚠️ Failed to store payment request record in MongoDB:', error);
        }
      }

      return {
        mongoDBRecordId,
      };
    } catch (error) {
      console.error('❌ Error requesting money:', error);
      throw error;
    }
  }

  /**
   * Accept money request with MongoDB tracking
   */
  async acceptMoneyRequest(
    requestId: string,
    responseTransactionHash?: string
  ): Promise<void> {
    try {
      console.log(`✅ Accepting money request: ${requestId}`);

      // Update payment request record in MongoDB
      if (this.mongoDBService) {
        try {
          await this.mongoDBService.updatePaymentRequestRecord(
            requestId,
            'accepted',
            responseTransactionHash
          );
          console.log(`📝 Updated payment request record in MongoDB: ${requestId}`);
        } catch (error) {
          console.warn('⚠️ Failed to update payment request record in MongoDB:', error);
        }
      }
    } catch (error) {
      console.error('❌ Error accepting money request:', error);
      throw error;
    }
  }

  /**
   * Decline money request with MongoDB tracking
   */
  async declineMoneyRequest(requestId: string): Promise<void> {
    try {
      console.log(`❌ Declining money request: ${requestId}`);

      // Update payment request record in MongoDB
      if (this.mongoDBService) {
        try {
          await this.mongoDBService.updatePaymentRequestRecord(requestId, 'declined');
          console.log(`📝 Updated payment request record in MongoDB: ${requestId}`);
        } catch (error) {
          console.warn('⚠️ Failed to update payment request record in MongoDB:', error);
        }
      }
    } catch (error) {
      console.error('❌ Error declining money request:', error);
      throw error;
    }
  }

  /**
   * Retrieve message content from Walrus using blob ID
   */
  async retrieveMessage(blobId: string): Promise<Message> {
    try {
      console.log(`📥 Retrieving message content from Walrus: ${blobId}`);
      return await this.walrusService.retrieveMessage(blobId);
    } catch (error) {
      console.error('❌ Error retrieving message from Walrus:', error);
      throw error;
    }
  }

  /**
   * Get message history from MongoDB first, then fallback to smart contract + Walrus
   */
  async getMessageHistory(userAddress: string): Promise<Message[]> {
    try {
      console.log(`📨 Getting message history for user: ${userAddress}`);

      // Step 1: Try to get messages from MongoDB first
      if (this.mongoDBService) {
        try {
          const mongoMessages = await this.mongoDBService.getMessageHistory(userAddress);
          console.log(`📨 Found ${mongoMessages.length} messages in MongoDB`);
          
          if (mongoMessages.length > 0) {
            // Convert MongoDB records to Message format
            const messages: Message[] = mongoMessages.map(record => ({
              id: record.messageId,
              conversationId: record.conversationId,
              senderId: record.senderId,
              content: record.content,
              timestamp: record.timestamp,
              messageType: record.messageType,
              paymentData: record.paymentData,
              moneyRequestData: record.moneyRequestData,
            }));
            
            console.log(`✅ Returning ${messages.length} messages from MongoDB`);
            return messages;
          }
        } catch (error) {
          console.warn('⚠️ Failed to get messages from MongoDB, falling back to smart contract:', error);
        }
      }

      // Step 2: Fallback to smart contract + Walrus (existing logic)
      console.log('🔄 Falling back to smart contract + Walrus retrieval...');
      const messageRecords = await this.smartContractService.getMessageHistory(userAddress);
      console.log(`Found ${messageRecords.length} message records in smart contract`);

      if (messageRecords.length === 0) {
        console.log('No message records found in smart contract');
        return [];
      }

      // Step 3: Retrieve message content from Walrus for each record
      const messages: Message[] = [];
      const failedRetrievals: string[] = [];
      
      for (const record of messageRecords) {
        try {
          const message = await this.walrusService.retrieveMessage(record.blobId);
          messages.push(message);
          console.log(`✅ Successfully retrieved message: ${record.blobId}`);
        } catch (error) {
          console.error(`Failed to retrieve message with blob ID ${record.blobId}:`, error);
          failedRetrievals.push(record.blobId);
          
          // Create a fallback message from the smart contract record
          const fallbackMessage: Message = {
            id: record.blobId, // Use blob ID as message ID
            conversationId: record.conversationId,
            senderId: record.senderId,
            content: `[Message content unavailable - Blob ID: ${record.blobId}]`,
            timestamp: new Date(record.timestamp),
            messageType: record.messageType,
          };
          messages.push(fallbackMessage);
          console.log(`📝 Created fallback message for blob ID: ${record.blobId}`);
        }
      }

      console.log(`Successfully processed ${messages.length} messages (${failedRetrievals.length} fallbacks)`);
      
      if (failedRetrievals.length > 0) {
        console.log(`⚠️ Failed Walrus retrievals: ${failedRetrievals.join(', ')}`);
      }
      
      return messages;
    } catch (error) {
      console.error('❌ Error getting message history:', error);
      throw error;
    }
  }

  /**
   * Get conversation messages from MongoDB first, then fallback to smart contract + Walrus
   */
  async getConversationMessages(conversationId: string): Promise<Message[]> {
    try {
      console.log(`📨 Getting conversation messages for: ${conversationId}`);

      // Step 1: Try to get messages from MongoDB first
      if (this.mongoDBService) {
        try {
          const mongoMessages = await this.mongoDBService.getConversationMessages(conversationId);
          console.log(`📨 Found ${mongoMessages.length} messages in MongoDB for conversation`);
          
          if (mongoMessages.length > 0) {
            // Convert MongoDB records to Message format
            const messages: Message[] = mongoMessages.map(record => ({
              id: record.messageId,
              conversationId: record.conversationId,
              senderId: record.senderId,
              content: record.content,
              timestamp: record.timestamp,
              messageType: record.messageType,
              paymentData: record.paymentData,
              moneyRequestData: record.moneyRequestData,
            }));
            
            console.log(`✅ Returning ${messages.length} messages from MongoDB`);
            return messages;
          }
        } catch (error) {
          console.warn('⚠️ Failed to get conversation messages from MongoDB, falling back to smart contract:', error);
        }
      }

      // Step 2: Fallback to smart contract + Walrus (existing logic)
      console.log('🔄 Falling back to smart contract + Walrus retrieval...');
      const messageRecords = await this.smartContractService.getConversationMessages(conversationId);
      console.log(`Found ${messageRecords.length} message records in smart contract for conversation`);

      if (messageRecords.length === 0) {
        console.log('No message records found in smart contract for conversation');
        return [];
      }

      // Step 3: Retrieve message content from Walrus for each record
      const messages: Message[] = [];
      const failedRetrievals: string[] = [];
      
      for (const record of messageRecords) {
        try {
          const message = await this.walrusService.retrieveMessage(record.blobId);
          messages.push(message);
          console.log(`✅ Successfully retrieved message: ${record.blobId}`);
        } catch (error) {
          console.error(`Failed to retrieve message with blob ID ${record.blobId}:`, error);
          failedRetrievals.push(record.blobId);
          
          // Create a fallback message from the smart contract record
          const fallbackMessage: Message = {
            id: record.blobId, // Use blob ID as message ID
            conversationId: record.conversationId,
            senderId: record.senderId,
            content: `[Message content unavailable - Blob ID: ${record.blobId}]`,
            timestamp: new Date(record.timestamp),
            messageType: record.messageType,
          };
          messages.push(fallbackMessage);
          console.log(`📝 Created fallback message for blob ID: ${record.blobId}`);
        }
      }

      console.log(`Successfully processed ${messages.length} messages (${failedRetrievals.length} fallbacks)`);
      
      if (failedRetrievals.length > 0) {
        console.log(`⚠️ Failed Walrus retrievals: ${failedRetrievals.join(', ')}`);
      }
      
      return messages;
    } catch (error) {
      console.error('❌ Error getting conversation messages:', error);
      throw error;
    }
  }

  /**
   * Get user conversations from smart contract (keeping existing logic)
   */
  async getUserConversations(userAddress: string): Promise<any[]> {
    try {
      console.log(`💬 Getting user conversations for: ${userAddress}`);
      return await this.smartContractService.getUserConversations(userAddress);
    } catch (error) {
      console.error('❌ Error getting user conversations:', error);
      throw error;
    }
  }

  /**
   * Get payment history from MongoDB
   */
  async getPaymentHistory(userAddress: string): Promise<any[]> {
    try {
      console.log(`💰 Getting payment history for user: ${userAddress}`);
      
      if (this.mongoDBService) {
        try {
          const payments = await this.mongoDBService.getPaymentHistory(userAddress);
          console.log(`✅ Retrieved ${payments.length} payments from MongoDB`);
          return payments;
        } catch (error) {
          console.warn('⚠️ Failed to get payment history from MongoDB:', error);
        }
      }
      
      console.log('ℹ️ No MongoDB service available, returning empty payment history');
      return [];
    } catch (error) {
      console.error('❌ Error getting payment history:', error);
      throw error;
    }
  }

  /**
   * Get payment request history from MongoDB
   */
  async getPaymentRequestHistory(userAddress: string): Promise<any[]> {
    try {
      console.log(`📋 Getting payment request history for user: ${userAddress}`);
      
      if (this.mongoDBService) {
        try {
          const paymentRequests = await this.mongoDBService.getPaymentRequestHistory(userAddress);
          console.log(`✅ Retrieved ${paymentRequests.length} payment requests from MongoDB`);
          return paymentRequests;
        } catch (error) {
          console.warn('⚠️ Failed to get payment request history from MongoDB:', error);
        }
      }
      
      console.log('ℹ️ No MongoDB service available, returning empty payment request history');
      return [];
    } catch (error) {
      console.error('❌ Error getting payment request history:', error);
      throw error;
    }
  }

  /**
   * Check if Cometh Connect is available
   */
  isComethAvailable(): boolean {
    return this.comethConnectService !== null;
  }

  /**
   * Get Cometh Connect service
   */
  getComethService() {
    return this.comethConnectService;
  }

  /**
   * Check if MongoDB is available
   */
  isMongoDBAvailable(): boolean {
    return this.mongoDBService !== null;
  }

  /**
   * Get MongoDB service
   */
  getMongoDBService() {
    return this.mongoDBService;
  }
} 