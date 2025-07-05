/**
 * MongoDB Atlas Data API Service - Frontend Compatible
 * Uses MongoDB Atlas Data API for direct frontend access
 */

export interface MongoMessage {
  _id?: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  messageType: 'text' | 'payment' | 'payment_request';
  timestamp: Date;
  paymentData?: {
    amount?: number;
    token?: string;
    recipientAddress?: string;
    transactionHash?: string;
    status?: string;
  };
  moneyRequestData?: {
    id?: string;
    amount?: number;
    token?: string;
    description?: string;
    requesterId?: string;
    requesterAddress?: string;
    status?: string;
    createdAt?: Date;
  };
  isRead: boolean;
  isDelivered: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MongoConversation {
  _id?: string;
  participants: string[];
  lastMessage?: string;
  lastMessageAt: Date;
  unreadCount: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

export class MongoService {
  private baseUrl: string;
  private apiKey: string;
  private dataSource: string;
  private database: string;

  constructor() {
    // These should be set via environment variables
    this.baseUrl = import.meta.env.VITE_MONGODB_DATA_API_URL || 'https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1';
    this.apiKey = import.meta.env.VITE_MONGODB_DATA_API_KEY || '';
    this.dataSource = import.meta.env.VITE_MONGODB_DATA_SOURCE || 'Cluster0';
    this.database = import.meta.env.VITE_MONGODB_DATABASE || 'chatterbox';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async makeRequest(action: string, collection: string, data: Record<string, unknown>): Promise<any> {
    const url = `${this.baseUrl}/action/${action}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': this.apiKey
        },
        body: JSON.stringify({
          dataSource: this.dataSource,
          database: this.database,
          collection: collection,
          ...data
        })
      });

      if (!response.ok) {
        throw new Error(`MongoDB API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('MongoDB API request failed:', error);
      throw error;
    }
  }

  // Message operations
  async sendMessage(messageData: {
    conversationId: string;
    senderId: string;
    receiverId: string;
    content: string;
    messageType?: 'text' | 'payment' | 'payment_request';
    paymentData?: {
      amount: number;
      token: string;
      recipientAddress: string;
      transactionHash: string;
      status: string;
    };
    moneyRequestData?: {
      id: string;
      amount: number;
      token: string;
      description: string;
      requesterId: string;
      requesterAddress: string;
      status: string;
      createdAt: Date;
    };
  }): Promise<MongoMessage> {
    try {
      const message = {
        ...messageData,
        messageType: messageData.messageType || 'text',
        timestamp: new Date(),
        isRead: false,
        isDelivered: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await this.makeRequest('insertOne', 'messages', {
        document: message
      });

      // Update conversation
      await this.updateConversation(
        messageData.conversationId,
        [messageData.senderId, messageData.receiverId],
        result.insertedId
      );

      return { ...message, _id: result.insertedId };
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  async getMessages(conversationId: string, currentUserId: string): Promise<MongoMessage[]> {
    try {
      const result = await this.makeRequest('find', 'messages', {
        filter: { conversationId },
        sort: { timestamp: 1 },
        limit: 100
      });

      return result.documents || [];
    } catch (error) {
      console.error('Failed to get messages:', error);
      throw error;
    }
  }

  async getConversations(userId: string): Promise<MongoConversation[]> {
    try {
      const result = await this.makeRequest('find', 'conversations', {
        filter: { participants: userId },
        sort: { lastMessageAt: -1 }
      });

      return result.documents || [];
    } catch (error) {
      console.error('Failed to get conversations:', error);
      throw error;
    }
  }

  async findOrCreateConversation(participants: string[]): Promise<MongoConversation> {
    try {
      // Sort participants to ensure consistent conversation ID
      const sortedParticipants = participants.sort();
      
      // Try to find existing conversation
      const findResult = await this.makeRequest('findOne', 'conversations', {
        filter: { participants: { $all: sortedParticipants } }
      });

      if (findResult.document) {
        return findResult.document;
      }

      // Create new conversation
      const newConversation = {
        participants: sortedParticipants,
        lastMessage: null,
        lastMessageAt: new Date(),
        unreadCount: {},
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const insertResult = await this.makeRequest('insertOne', 'conversations', {
        document: newConversation
      });

      return { ...newConversation, _id: insertResult.insertedId };
    } catch (error) {
      console.error('Failed to find or create conversation:', error);
      throw error;
    }
  }

  async markMessageAsRead(messageId: string): Promise<void> {
    try {
      await this.makeRequest('updateOne', 'messages', {
        filter: { _id: { $oid: messageId } },
        update: { $set: { isRead: true, updatedAt: new Date() } }
      });
    } catch (error) {
      console.error('Failed to mark message as read:', error);
      throw error;
    }
  }

  async getUnreadCount(conversationId: string, userId: string): Promise<number> {
    try {
      const result = await this.makeRequest('countDocuments', 'messages', {
        filter: {
          conversationId,
          receiverId: userId,
          isRead: false
        }
      });

      return result.count || 0;
    } catch (error) {
      console.error('Failed to get unread count:', error);
      return 0;
    }
  }

  private async updateConversation(
    conversationId: string,
    participants: string[],
    lastMessageId: string
  ): Promise<void> {
    try {
      await this.makeRequest('updateOne', 'conversations', {
        filter: { _id: { $oid: conversationId } },
        update: {
          $set: {
            lastMessage: lastMessageId,
            lastMessageAt: new Date(),
            updatedAt: new Date()
          }
        }
      });
    } catch (error) {
      console.error('Failed to update conversation:', error);
      // Don't throw error here as message was already sent
    }
  }

  async searchMessages(query: string, userId: string): Promise<MongoMessage[]> {
    try {
      const result = await this.makeRequest('find', 'messages', {
        filter: {
          $and: [
            { $or: [{ senderId: userId }, { receiverId: userId }] },
            { content: { $regex: query, $options: 'i' } }
          ]
        },
        sort: { timestamp: -1 },
        limit: 50
      });

      return result.documents || [];
    } catch (error) {
      console.error('Failed to search messages:', error);
      return [];
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const result = await this.makeRequest('findOne', 'messages', {
        filter: {},
        limit: 1
      });
      return true;
    } catch (error) {
      console.error('MongoDB health check failed:', error);
      return false;
    }
  }
}

// Singleton instance
let mongoServiceInstance: MongoService | null = null;

export const getMongoService = (): MongoService => {
  if (!mongoServiceInstance) {
    mongoServiceInstance = new MongoService();
  }
  return mongoServiceInstance;
}; 