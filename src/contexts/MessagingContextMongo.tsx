import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message, Conversation, User } from '../types/messaging';
import { getMongoService, MongoMessage, MongoConversation } from '../services/mongoService';
import { WorldcoinService } from '../services/worldcoinService';

interface MessagingContextType {
  messages: Message[];
  conversations: Conversation[];
  currentConversation: Conversation | null;
  currentUser: User | null;
  isLoading: boolean;
  
  // Actions
  sendMessage: (content: string, conversationId: string) => Promise<void>;
  sendPayment: (amount: number, token: 'WLD' | 'USDC', conversationId: string) => Promise<void>;
  sendPaymentRequest: (amount: number, token: 'WLD' | 'USDC', description: string, conversationId: string) => Promise<void>;
  sendRecurringPayment: (amount: number, frequency: string, conversationId: string) => Promise<void>;
  sendSplitBill: (amount: number, people: number, conversationId: string) => Promise<void>;
  
  // Navigation
  setCurrentConversation: (conversation: Conversation | null) => void;
  setCurrentUser: (user: User) => void;
  
  // Conversation Management
  createNewConversation: (participantIds: string[], participantUsernames: string[]) => Promise<Conversation | null>;
  findOrCreateConversation: (otherUserId: string, otherUsername: string) => Promise<Conversation | null>;
  shareContactsAndCreateConversation: () => Promise<void>;
  
  // World App Integration
  getWorldContacts: () => Promise<User[]>;
  refreshWorldAccount: () => Promise<void>;
  
  // Utility
  loadMessages: (conversationId: string) => Promise<void>;
  loadConversations: () => Promise<void>;
  markMessageAsRead: (messageId: string) => Promise<void>;
  searchMessages: (query: string) => Promise<Message[]>;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
};

interface MessagingProviderProps {
  children: ReactNode;
}

export const MessagingProvider: React.FC<MessagingProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const mongoService = getMongoService();
  const worldcoinService = WorldcoinService.getInstance();

  // Initialize World account on mount
  useEffect(() => {
    console.log('🌍 Initializing World account...');
    initializeWorldAccount();
  }, []);

  // Load messages when current conversation changes
  useEffect(() => {
    if (currentConversation && currentUser) {
      console.log('💬 Loading messages for conversation:', currentConversation.id);
      loadMessages(currentConversation.id);
    } else {
      setMessages([]);
    }
  }, [currentConversation, currentUser]);

  // Helper function to convert MongoDB message to app message
  const convertMongoMessage = (mongoMsg: MongoMessage): Message => ({
    id: mongoMsg._id || '',
    conversationId: mongoMsg.conversationId,
    senderId: mongoMsg.senderId,
    content: mongoMsg.content,
    timestamp: new Date(mongoMsg.timestamp),
    messageType: mongoMsg.messageType,
    paymentData: mongoMsg.paymentData ? {
      amount: mongoMsg.paymentData.amount || 0,
      token: (mongoMsg.paymentData.token as 'WLD' | 'USDC') || 'WLD',
      recipientAddress: mongoMsg.paymentData.recipientAddress || '',
      transactionHash: mongoMsg.paymentData.transactionHash || '',
      status: (mongoMsg.paymentData.status as 'pending' | 'completed' | 'failed') || 'pending'
    } : undefined,
    moneyRequestData: mongoMsg.moneyRequestData ? {
      id: mongoMsg.moneyRequestData.id || '',
      amount: mongoMsg.moneyRequestData.amount || 0,
      token: (mongoMsg.moneyRequestData.token as 'WLD' | 'USDC') || 'WLD',
      description: mongoMsg.moneyRequestData.description || '',
      requesterId: mongoMsg.moneyRequestData.requesterId || '',
      requesterAddress: mongoMsg.moneyRequestData.requesterAddress || '',
      status: (mongoMsg.moneyRequestData.status as 'pending' | 'accepted' | 'declined') || 'pending',
      createdAt: mongoMsg.moneyRequestData.createdAt || new Date()
    } : undefined
  });

  // Helper function to convert MongoDB conversation to app conversation
  const convertMongoConversation = async (mongoConv: MongoConversation): Promise<Conversation> => {
    // Create User objects for participants
    const participants: User[] = [];
    for (const participantId of mongoConv.participants) {
      if (participantId === currentUser?.id) {
        participants.push(currentUser);
      } else {
        // Try to get user info from World App
        const worldUser = await worldcoinService.getUserByAddress(participantId);
        if (worldUser) {
          participants.push({
            id: participantId,
            username: worldUser.username,
            address: worldUser.address,
            profilePicture: worldUser.profilePicture
          });
        } else {
          // Fallback user
          participants.push({
            id: participantId,
            username: `user_${participantId.slice(-4)}`,
            address: participantId,
            profilePicture: `https://via.placeholder.com/40/3B82F6/FFFFFF?text=${participantId.charAt(0).toUpperCase()}`
          });
        }
      }
    }

    return {
      id: mongoConv._id || '',
      participants,
      unreadCount: 0, // Calculate from messages if needed
      createdAt: new Date(mongoConv.createdAt),
      updatedAt: new Date(mongoConv.updatedAt)
    };
  };

  const initializeWorldAccount = async () => {
    try {
      setIsLoading(true);
      console.log('🚀 Initializing World MiniKit...');
      
      // Initialize MiniKit
      const isInitialized = await worldcoinService.initializeMiniKit();
      if (!isInitialized) {
        console.error('❌ Failed to initialize World MiniKit');
        console.log('🔧 Please open this app in World App to access your account');
        setCurrentUser(null);
        return;
      }

      // Get current user from World App using wallet authentication
      const worldUser = await worldcoinService.getCurrentUser();
      if (worldUser) {
        const user: User = {
          id: worldUser.address,
          username: worldUser.username,
          address: worldUser.address,
          profilePicture: worldUser.profilePicture
        };
        
        setCurrentUser(user);
        console.log('✅ World user authenticated:', user.username);
        console.log('📍 User address:', user.address);
        
        // Load conversations after user is set
        await loadConversations();
      } else {
        console.log('⚠️ World authentication required');
        console.log('🔐 Please authenticate with your World wallet to continue');
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('❌ Failed to initialize World account:', error);
      console.log('🔧 Unable to authenticate with World App');
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshWorldAccount = async () => {
    console.log('🔄 Refreshing World account...');
    await initializeWorldAccount();
  };

  const getWorldContacts = async (): Promise<User[]> => {
    try {
      console.log('👥 Getting contacts from World App...');
      const worldContacts = await worldcoinService.getContacts();
      
      return worldContacts.map(contact => ({
        id: contact.address,
        username: contact.username || `${contact.address.slice(0, 6)}...${contact.address.slice(-4)}`,
        address: contact.address,
        profilePicture: contact.profilePicture
      }));
    } catch (error) {
      console.error('❌ Failed to get World contacts:', error);
      return [];
    }
  };

  const shareContactsAndCreateConversation = async () => {
    try {
      console.log('📱 Opening World App contact sharing...');
      const worldContacts = await getWorldContacts();
      
      if (worldContacts.length === 0) {
        console.log('📭 No contacts shared from World App');
        return;
      }
      
      // Create conversation with the first shared contact
      const firstContact = worldContacts[0];
      console.log('🆕 Creating conversation with:', firstContact.username);
      
      const conversation = await findOrCreateConversation(firstContact.id, firstContact.username);
      if (conversation) {
        console.log('✅ Conversation created with World contact');
      }
    } catch (error) {
      console.error('❌ Failed to share contacts:', error);
      // Don't show error for user cancellation
      if (error instanceof Error && error.message.includes('cancel')) {
        console.log('👤 User cancelled contact sharing');
      }
    }
  };

  const loadConversations = async () => {
    if (!currentUser) {
      console.log('❌ No current user, cannot load conversations');
      return;
    }

    try {
      setIsLoading(true);
      console.log('📱 Fetching conversations from MongoDB for user:', currentUser.id);
      
      const mongoConversations = await mongoService.getConversations(currentUser.id);
      console.log(`📋 Retrieved ${mongoConversations.length} conversations from database`);
      
      if (mongoConversations.length === 0) {
        console.log('📭 No conversations found for user');
        setConversations([]);
        return;
      }

      // Convert MongoDB conversations to app conversations
      const appConversations = await Promise.all(
        mongoConversations.map(conv => convertMongoConversation(conv))
      );

      setConversations(appConversations);
      console.log(`✅ Loaded ${appConversations.length} conversations successfully`);
    } catch (error) {
      console.error('❌ Failed to load conversations:', error);
      setConversations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    if (!currentUser) {
      console.log('❌ No current user, cannot load messages');
      return;
    }

    try {
      console.log('💬 Fetching messages from MongoDB for conversation:', conversationId);
      const mongoMessages = await mongoService.getMessages(conversationId, currentUser.id);
      console.log(`📨 Retrieved ${mongoMessages.length} messages from database`);
      
      const appMessages = mongoMessages.map(msg => convertMongoMessage(msg));
      setMessages(appMessages);
      console.log(`✅ Loaded ${appMessages.length} messages successfully`);
    } catch (error) {
      console.error('❌ Failed to load messages:', error);
      setMessages([]);
    }
  };

  const getReceiverId = (conversationId: string): string => {
    if (!currentUser) return '';
    
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return '';
    
    // For 1:1 conversations, return the other participant
    const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
    return otherParticipant?.id || '';
  };

  const createNewConversation = async (participantIds: string[], participantUsernames: string[]): Promise<Conversation | null> => {
    if (!currentUser) {
      console.error('❌ No current user available for creating conversation');
      return null;
    }

    try {
      console.log('🆕 Creating new conversation with participants:', participantIds);
      
      // Ensure current user is in participants
      const allParticipants = [...new Set([currentUser.id, ...participantIds])];
      
      const mongoConversation = await mongoService.findOrCreateConversation(allParticipants);
      console.log('✅ Conversation created in MongoDB:', mongoConversation._id);
      
      const appConversation = await convertMongoConversation(mongoConversation);
      
      setConversations(prev => [appConversation, ...prev]);
      setCurrentConversation(appConversation);
      
      console.log('🎉 New conversation created and set as current');
      return appConversation;
    } catch (error) {
      console.error('❌ Failed to create conversation:', error);
      return null;
    }
  };

  const findOrCreateConversation = async (otherUserId: string, otherUsername: string): Promise<Conversation | null> => {
    if (!currentUser) return null;

    try {
      // Check if conversation already exists
      const existingConversation = conversations.find(conv => 
        conv.participants.some(p => p.id === otherUserId)
      );

      if (existingConversation) {
        console.log('📋 Found existing conversation:', existingConversation.id);
        setCurrentConversation(existingConversation);
        return existingConversation;
      }

      // Create new conversation
      console.log('🆕 Creating new conversation with:', otherUsername);
      return await createNewConversation([otherUserId], [otherUsername]);
    } catch (error) {
      console.error('❌ Failed to find or create conversation:', error);
      return null;
    }
  };

  const sendMessage = async (content: string, conversationId: string) => {
    if (!currentUser) {
      console.error('❌ No current user available for sending message');
      return;
    }

    try {
      console.log('💬 Sending message to conversation:', conversationId);
      
      const receiverId = getReceiverId(conversationId);
      if (!receiverId) {
        console.error('❌ Could not determine receiver for conversation');
        return;
      }

      const mongoMessage = await mongoService.sendMessage({
        conversationId,
        senderId: currentUser.id,
        receiverId,
        content,
        messageType: 'text'
      });

      const appMessage = convertMongoMessage(mongoMessage);
      setMessages(prev => [...prev, appMessage]);
      
      // Refresh conversations to update last message
      await loadConversations();
      
      console.log('✅ Message sent successfully');
    } catch (error) {
      console.error('❌ Failed to send message:', error);
    }
  };

  const sendPayment = async (amount: number, token: 'WLD' | 'USDC', conversationId: string) => {
    if (!currentUser) {
      console.error('❌ No current user available for sending payment');
      return;
    }

    try {
      console.log('💰 Sending payment:', { amount, token, conversationId });
      
      const receiverId = getReceiverId(conversationId);
      if (!receiverId) {
        console.error('❌ Could not determine receiver for payment');
        return;
      }

      const receiver = conversations
        .find(c => c.id === conversationId)
        ?.participants.find(p => p.id === receiverId);
      
      const content = `Sent ${amount} ${token} to ${receiver?.username || receiverId}`;

      const mongoMessage = await mongoService.sendMessage({
        conversationId,
        senderId: currentUser.id,
        receiverId,
        content,
        messageType: 'payment',
        paymentData: {
          amount,
          token,
          recipientAddress: receiver?.address || '',
          transactionHash: `0x${Math.random().toString(16).slice(2)}`,
          status: 'completed'
        }
      });

      const appMessage = convertMongoMessage(mongoMessage);
      setMessages(prev => [...prev, appMessage]);
      
      await loadConversations();
      console.log('✅ Payment sent successfully');
    } catch (error) {
      console.error('❌ Failed to send payment:', error);
    }
  };

  const sendPaymentRequest = async (amount: number, token: 'WLD' | 'USDC', description: string, conversationId: string) => {
    if (!currentUser) {
      console.error('❌ No current user available for sending payment request');
      return;
    }

    try {
      console.log('💸 Sending payment request:', { amount, token, description, conversationId });
      
      const receiverId = getReceiverId(conversationId);
      if (!receiverId) {
        console.error('❌ Could not determine receiver for payment request');
        return;
      }

      const content = `Requested ${amount} ${token} for ${description}`;

      const mongoMessage = await mongoService.sendMessage({
        conversationId,
        senderId: currentUser.id,
        receiverId,
        content,
        messageType: 'payment_request',
        moneyRequestData: {
          id: `req_${Date.now()}`,
          amount,
          token,
          description,
          requesterId: currentUser.id,
          requesterAddress: currentUser.address,
          status: 'pending',
          createdAt: new Date()
        }
      });

      const appMessage = convertMongoMessage(mongoMessage);
      setMessages(prev => [...prev, appMessage]);
      
      await loadConversations();
      console.log('✅ Payment request sent successfully');
    } catch (error) {
      console.error('❌ Failed to send payment request:', error);
    }
  };

  const sendRecurringPayment = async (amount: number, frequency: string, conversationId: string) => {
    if (!currentUser) return;

    try {
      const receiverId = getReceiverId(conversationId);
      if (!receiverId) return;

      const content = `Set up recurring payment: ${amount} WLD ${frequency}`;

      const mongoMessage = await mongoService.sendMessage({
        conversationId,
        senderId: currentUser.id,
        receiverId,
        content,
        messageType: 'text'
      });

      const appMessage = convertMongoMessage(mongoMessage);
      setMessages(prev => [...prev, appMessage]);
      
      await loadConversations();
      console.log('✅ Recurring payment setup sent');
    } catch (error) {
      console.error('❌ Failed to send recurring payment setup:', error);
    }
  };

  const sendSplitBill = async (amount: number, people: number, conversationId: string) => {
    if (!currentUser) return;

    try {
      const receiverId = getReceiverId(conversationId);
      if (!receiverId) return;

      const perPerson = (amount / people).toFixed(2);
      const content = `Split bill: ${amount} WLD ÷ ${people} people = ${perPerson} WLD each`;

      const mongoMessage = await mongoService.sendMessage({
        conversationId,
        senderId: currentUser.id,
        receiverId,
        content,
        messageType: 'text'
      });

      const appMessage = convertMongoMessage(mongoMessage);
      setMessages(prev => [...prev, appMessage]);
      
      await loadConversations();
      console.log('✅ Split bill message sent');
    } catch (error) {
      console.error('❌ Failed to send split bill message:', error);
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      await mongoService.markMessageAsRead(messageId);
      
      // Update local state
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, isRead: true } : msg
        )
      );
      
      console.log('✅ Message marked as read:', messageId);
    } catch (error) {
      console.error('❌ Failed to mark message as read:', error);
    }
  };

  const searchMessages = async (query: string): Promise<Message[]> => {
    if (!currentUser) return [];

    try {
      console.log('🔍 Searching messages:', query);
      const mongoMessages = await mongoService.searchMessages(query, currentUser.id);
      
      const appMessages = mongoMessages.map(msg => convertMongoMessage(msg));
      
      console.log(`🔍 Found ${appMessages.length} messages matching query`);
      return appMessages;
    } catch (error) {
      console.error('❌ Failed to search messages:', error);
      return [];
    }
  };

  const value: MessagingContextType = {
    messages,
    conversations,
    currentConversation,
    currentUser,
    isLoading,
    
    // Actions
    sendMessage,
    sendPayment,
    sendPaymentRequest,
    sendRecurringPayment,
    sendSplitBill,
    
    // Navigation
    setCurrentConversation,
    setCurrentUser,
    
    // Conversation Management
    createNewConversation,
    findOrCreateConversation,
    shareContactsAndCreateConversation,
    
    // World App Integration
    getWorldContacts,
    refreshWorldAccount,
    
    // Utility
    loadMessages,
    loadConversations,
    markMessageAsRead,
    searchMessages
  };

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  );
}; 