import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { MiniKit } from '@worldcoin/minikit-js';
import { Message, Conversation, User, PaymentRequest, MoneyRequest } from '../types/messaging';
import { WalrusMessageService } from '../services/walrusService';
import { WorldcoinService } from '../services/worldcoinService';
import { backendApi } from '../data/api/backendApi';

interface MessagingContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  sendMessage: (content: string, conversationId: string) => Promise<void>;
  sendPayment: (amount: number, token: 'WLD' | 'USDC', recipientAddress: string, conversationId: string) => Promise<void>;
  requestMoney: (amount: number, token: 'WLD' | 'USDC', description: string, conversationId: string) => Promise<void>;
  acceptMoneyRequest: (messageId: string, conversationId: string) => Promise<void>;
  declineMoneyRequest: (messageId: string, conversationId: string) => Promise<void>;
  createConversation: (participants: User[]) => Promise<Conversation>;
  createConversationWithContacts: () => Promise<void>;
  createFakeConversation: () => Promise<void>;
  selectConversation: (conversationId: string) => void;
  searchMessages: (query: string) => Promise<Message[]>;
  loadMessages: (conversationId: string) => Promise<void>;
  loadConversations: () => Promise<void>;
  isCreatingConversation: boolean;
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
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);

  const walrusService = WalrusMessageService.getInstance();
  const worldcoinService = WorldcoinService.getInstance();

  useEffect(() => {
    initializeApp();
    
    // Listen for custom authentication events
    const handleAuthUpdate = (event: CustomEvent) => {
      const userData = event.detail;
      console.log('🔄 Authentication data updated via custom event:', userData);
      
      // Validate the new user data
      if (userData.id && userData.username && userData.address) {
        setCurrentUser(userData);
        // Reload conversations with the new user
        loadConversations(userData);
      }
    };
    
    window.addEventListener('user-authenticated', handleAuthUpdate as EventListener);
    
    return () => {
      window.removeEventListener('user-authenticated', handleAuthUpdate as EventListener);
    };
  }, []);

  const initializeApp = async () => {
    try {
      setIsLoading(true);
      console.log('=== MESSAGING CONTEXT INITIALIZATION ===');
      
      // First, check if we have user data stored in localStorage (from previous authentication)
      const storedUser = localStorage.getItem('world-app-user');
      console.log('Stored user check:', storedUser ? 'FOUND' : 'NOT FOUND');
      
      if (storedUser) {
        try {
          const userData: User = JSON.parse(storedUser);
          console.log('✅ Parsed stored user data:', {
            id: userData.id,
            username: userData.username,
            address: userData.address
          });
          
          // Validate the stored data has required fields
          if (userData.id && userData.username && userData.address) {
            console.log('✅ Stored user data is valid, using it');
            setCurrentUser(userData);
            
            // Load conversations after user is set
            await loadConversations(userData);
            console.log('✅ Conversations loaded for stored user');
            return;
          } else {
            console.warn('❌ Stored user data is missing required fields:', {
              hasId: !!userData.id,
              hasUsername: !!userData.username,
              hasAddress: !!userData.address
            });
            // Clear invalid stored data
            localStorage.removeItem('world-app-user');
          }
        } catch (parseError) {
          console.warn('❌ Failed to parse stored user data:', parseError);
          console.warn('❌ Stored data content:', storedUser);
          // Clear invalid stored data
          localStorage.removeItem('world-app-user');
        }
      }
      
      // If no stored data, try to authenticate with World App
      if (worldcoinService.isInstalled()) {
        try {
          console.log('World App detected, no stored data - attempting authentication...');
          const authenticatedUser = await worldcoinService.authenticateWithWallet();
          console.log('Authentication result:', authenticatedUser);
          
          if (authenticatedUser && authenticatedUser.walletAddress) {
            console.log('Using authenticated user:', authenticatedUser.walletAddress, authenticatedUser.username);
            
            const currentUserData: User = {
              id: authenticatedUser.walletAddress,
              username: authenticatedUser.username || 'Unknown User',
              address: authenticatedUser.walletAddress,
              profilePicture: authenticatedUser.profilePictureUrl || 'https://via.placeholder.com/40',
            };
            
            // User data is already stored in localStorage by WorldcoinService
            setCurrentUser(currentUserData);
            
            // Load conversations after user is set
            await loadConversations(currentUserData);
            return;
          } else {
            console.warn('Authentication succeeded but no wallet address found');
          }
        } catch (authError) {
          console.warn('World App authentication failed:', authError);
        }
      } else {
        console.log('World App not installed');
      }
      
      // Fallback to desktop user
      const fakeUser: User = {
        id: '0x1234567890123456789012345678901234567890',
        username: 'Desktop User',
        address: '0x1234567890123456789012345678901234567890',
        profilePicture: 'https://via.placeholder.com/40',
      };
      setCurrentUser(fakeUser);
      
      // Load conversations after user is set
      await loadConversations(fakeUser);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize app');
    } finally {
      setIsLoading(false);
    }
  };

  const loadConversations = async (user?: User) => {
    try {
      const userToUse = user || currentUser;
      if (!userToUse) {
        console.warn('No user available to load conversations');
        return;
      }

      // Load conversations from backend API
      try {
        const response = await backendApi.getConversations(userToUse.id);
        const backendConversations = response.conversations || [];
        
        // Convert backend conversations to frontend format
        const conversations: Conversation[] = backendConversations.map((conv: { 
          id: string; 
          users: string; 
          createdAt: string; 
          updatedAt: string; 
        }) => ({
          id: conv.id,
          participants: JSON.parse(conv.users).map((userId: string) => {
            // If it's the current user, use their data
            if (userId === userToUse.id) {
              return userToUse;
            }
            // For other users, create a placeholder user
            return {
              id: userId,
              username: `User ${userId.slice(0, 6)}`,
              address: userId,
              profilePicture: 'https://via.placeholder.com/40',
            };
          }),
          unreadCount: 0,
          createdAt: new Date(conv.createdAt),
          updatedAt: new Date(conv.updatedAt),
        }));
        
        setConversations(conversations);
      } catch (backendError) {
        console.warn('Failed to load conversations from backend:', backendError);
        
        // No fallback conversations - start with empty array
        // User can create new conversations using the "Test Chat" button
        setConversations([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load conversations');
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      setIsLoading(true);
      
      // Load messages from backend API
      try {
        const response = await backendApi.getMessages(conversationId);
        const backendMessages = response.messages || [];
        
        // Convert backend messages to frontend format
        const messages: Message[] = backendMessages.map((msg: {
          id: string;
          conversationId: string;
          sender: string;
          content?: string;
          amount?: string;
          currency?: string;
          timestamp: string;
          type: string;
        }) => ({
          id: msg.id,
          conversationId: msg.conversationId,
          senderId: msg.sender,
          content: msg.content || `${msg.type === 'send_payment' ? 'Sent' : msg.type === 'request_payment' ? 'Requested' : ''} ${msg.amount || ''} ${msg.currency || ''}`.trim(),
          timestamp: new Date(msg.timestamp),
          messageType: msg.type === 'text' ? 'text' : 
                      msg.type === 'send_payment' ? 'payment' : 
                      msg.type === 'request_payment' ? 'payment_request' : 'text',
          paymentAmount: msg.amount ? parseFloat(msg.amount) : undefined,
          paymentToken: msg.currency as 'WLD' | 'USDC' | undefined,
        }));
        
        setMessages(messages);
      } catch (backendError) {
        console.warn('Failed to load messages from backend, using fallback:', backendError);
        
        // Fallback to Walrus service if backend is not available
        const conversationMessages = await walrusService.getMessages(conversationId);
        setMessages(conversationMessages.reverse()); // Show oldest first
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content: string, conversationId: string) => {
    if (!currentUser) {
      console.error('No current user available');
      return;
    }

    try {
      const messageData = {
        type: 'text' as const,
        conversationId,
        sender: currentUser.id,
        content,
      };

      // Send message to backend API
      try {
        const response = await backendApi.postMessage(messageData);
        
        const message: Message = {
          id: response.id,
          conversationId: response.conversationId,
          senderId: response.sender,
          content: response.content,
          timestamp: new Date(response.timestamp),
          messageType: 'text',
        };

        // Update local state
        setMessages(prev => [...prev, message]);

        // Update conversation
        setConversations(prev => 
          prev.map(conv => 
            conv.id === conversationId 
              ? { ...conv, lastMessage: message, updatedAt: new Date() }
              : conv
          )
        );
      } catch (backendError) {
        console.warn('Failed to send message via backend, using fallback:', backendError);
        
        // Fallback to Walrus service if backend is not available
        const message: Message = {
          id: crypto.randomUUID(),
          conversationId,
          senderId: currentUser.id,
          content,
          timestamp: new Date(),
          messageType: 'text',
        };

        // Store in Walrus
        await walrusService.storeMessage(message);

        // Update local state
        setMessages(prev => [...prev, message]);

        // Update conversation
        setConversations(prev => 
          prev.map(conv => 
            conv.id === conversationId 
              ? { ...conv, lastMessage: message, updatedAt: new Date() }
              : conv
          )
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  const sendPayment = async (amount: number, token: 'WLD' | 'USDC', recipientAddress: string, conversationId: string) => {
    if (!currentUser) {
      console.error('No current user available');
      return;
    }

    try {
      setIsLoading(true);

      // Initiate payment
      const { id: reference } = await worldcoinService.initiatePayment();

      // Create payment request
      const paymentRequest: PaymentRequest = {
        reference,
        to: recipientAddress,
        tokens: [{
          symbol: token,
          token_amount: worldcoinService.tokenToDecimals(amount, token),
        }],
        description: `Payment from ${currentUser.username}`,
      };

      // Send payment
      const paymentResult = await worldcoinService.sendPayment(paymentRequest);

      if (paymentResult && typeof paymentResult === 'object' && 'status' in paymentResult && paymentResult.status === 'success') {
        // Confirm payment
        await worldcoinService.confirmPayment(paymentResult);

        // Create payment message via backend API
        const paymentMessageData = {
          type: 'send_payment' as const,
          conversationId,
          sender: currentUser.id,
          content: `Sent ${amount} ${token}`,
          amount: amount.toString(),
          currency: token,
        };

        try {
          const response = await backendApi.postMessage(paymentMessageData);
          
          const message: Message = {
            id: response.id,
            conversationId: response.conversationId,
            senderId: response.sender,
            content: response.content,
            timestamp: new Date(response.timestamp),
            messageType: 'payment',
            paymentAmount: amount,
            paymentToken: token,
            paymentReference: reference,
            paymentStatus: 'success',
          };

          // Update local state
          setMessages(prev => [...prev, message]);

          // Update conversation
          setConversations(prev => 
            prev.map(conv => 
              conv.id === conversationId 
                ? { ...conv, lastMessage: message, updatedAt: new Date() }
                : conv
            )
          );
        } catch (backendError) {
          console.warn('Failed to store payment message via backend, using fallback:', backendError);
          
          // Fallback to local storage
          const message: Message = {
            id: crypto.randomUUID(),
            conversationId,
            senderId: currentUser.id,
            content: `Sent ${amount} ${token}`,
            timestamp: new Date(),
            messageType: 'payment',
            paymentAmount: amount,
            paymentToken: token,
            paymentReference: reference,
            paymentStatus: 'success',
          };

          // Store in Walrus
          await walrusService.storeMessage(message);

          // Update local state
          setMessages(prev => [...prev, message]);

          // Update conversation
          setConversations(prev => 
            prev.map(conv => 
              conv.id === conversationId 
                ? { ...conv, lastMessage: message, updatedAt: new Date() }
                : conv
            )
          );
        }
      } else {
        throw new Error('Payment failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send payment');
    } finally {
      setIsLoading(false);
    }
  };

  const requestMoney = async (amount: number, token: 'WLD' | 'USDC', description: string, conversationId: string) => {
    if (!currentUser) {
      console.error('No current user available');
      return;
    }

    try {
      // Create money request message via backend API
      const requestMessageData = {
        type: 'request_payment' as const,
        conversationId,
        sender: currentUser.id,
        content: `Requested ${amount} ${token}${description ? `: ${description}` : ''}`,
        amount: amount.toString(),
        currency: token,
      };

      try {
        const response = await backendApi.postMessage(requestMessageData);
        
        const message: Message = {
          id: response.id,
          conversationId: response.conversationId,
          senderId: response.sender,
          content: response.content,
          timestamp: new Date(response.timestamp),
          messageType: 'payment_request',
          paymentAmount: amount,
          paymentToken: token,
          requestStatus: 'pending',
        };

        // Update local state
        setMessages(prev => [...prev, message]);

        // Update conversation
        setConversations(prev => 
          prev.map(conv => 
            conv.id === conversationId 
              ? { ...conv, lastMessage: message, updatedAt: new Date() }
              : conv
          )
        );
      } catch (backendError) {
        console.warn('Failed to store money request via backend, using fallback:', backendError);
        
        // Fallback to local storage
        const requestId = crypto.randomUUID();
        const message: Message = {
          id: requestId,
          conversationId,
          senderId: currentUser.id,
          content: `Requested ${amount} ${token}${description ? `: ${description}` : ''}`,
          timestamp: new Date(),
          messageType: 'payment_request',
          paymentAmount: amount,
          paymentToken: token,
          requestStatus: 'pending',
        };

        // Store in Walrus
        await walrusService.storeMessage(message);

        // Update local state
        setMessages(prev => [...prev, message]);

        // Update conversation
        setConversations(prev => 
          prev.map(conv => 
            conv.id === conversationId 
              ? { ...conv, lastMessage: message, updatedAt: new Date() }
              : conv
          )
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to request money');
    }
  };

  const acceptMoneyRequest = async (messageId: string, conversationId: string) => {
    if (!currentUser) {
      console.error('No current user available');
      return;
    }

    try {
      // Find the request message
      const requestMessage = messages.find(m => m.id === messageId);
      if (!requestMessage || requestMessage.messageType !== 'payment_request') {
        throw new Error('Invalid money request');
      }

      // Find the requester (the person who sent the request)
      const requester = currentConversation?.participants.find(p => p.id === requestMessage.senderId);
      if (!requester) {
        throw new Error('Requester not found');
      }

      // Update request status to accepted
      await walrusService.updateMessageStatus(messageId, 'accepted');

      // Send the actual payment to the requester
      await sendPayment(
        requestMessage.paymentAmount!,
        requestMessage.paymentToken!,
        requester.address, // Send to the requester's address
        conversationId
      );

      // Update the request message status
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, requestStatus: 'accepted' }
            : msg
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept money request');
    }
  };

  const declineMoneyRequest = async (messageId: string, conversationId: string) => {
    try {
      // Update request status
      await walrusService.updateMessageStatus(messageId, 'declined');

      // Update the request message status
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, requestStatus: 'declined' }
            : msg
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to decline money request');
    }
  };

  const createConversation = async (participants: User[]): Promise<Conversation> => {
    try {
      // Extract user IDs for the backend API call
      const userIds = participants.map(p => p.id);
      
      // Call backend API to create conversation
      const response = await backendApi.postConversation(userIds);
      
      const conversation: Conversation = {
        id: response.id,
        participants,
        unreadCount: 0,
        createdAt: new Date(response.createdAt),
        updatedAt: new Date(response.updatedAt),
      };

      setConversations(prev => [...prev, conversation]);
      return conversation;
    } catch (error) {
      console.error('Failed to create conversation via backend, falling back to local:', error);
      
      // Fallback to local conversation if backend fails
      const conversation: Conversation = {
        id: crypto.randomUUID(),
        participants,
        unreadCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setConversations(prev => [...prev, conversation]);
      return conversation;
    }
  };

  const createConversationWithContacts = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      setError('World App is not installed. Please install World App to share contacts.');
      return;
    }

    setIsCreatingConversation(true);
    setError(null);

    try {
      const shareContactsPayload = {
        isMultiSelectEnabled: true,
        inviteMessage: "Join me on this secure chat app!",
      };

      const { finalPayload } = await MiniKit.commandsAsync.shareContacts(shareContactsPayload);

      if (finalPayload.status === 'success') {
        const worldAppContacts = finalPayload.contacts;
        
        // Convert World App contacts to User objects
        const selectedUsers: User[] = worldAppContacts.map(contact => ({
          id: contact.walletAddress,
          username: contact.username,
          address: contact.walletAddress,
          profilePicture: contact.profilePictureUrl || undefined,
        }));

        // Create conversation with selected contacts
        if (currentUser && selectedUsers.length > 0) {
          const allParticipants = [currentUser, ...selectedUsers];
          const newConversation = await createConversation(allParticipants);
          selectConversation(newConversation.id);
        }
      } else {
        // Any non-success status is treated as user cancellation
        // Contact sharing errors are almost always user cancellations (closing modal)
        // so we don't show error messages to avoid UX issues
        console.log('Contact sharing cancelled by user');
      }
    } catch (error) {
      // Contact sharing exceptions are almost always user cancellations
      // We don't show any error messages to avoid UX issues
      console.log('Contact sharing cancelled by user');
    } finally {
      setIsCreatingConversation(false);
    }
  }, [currentUser]);

  const createFakeConversation = useCallback(async () => {
    if (!currentUser) {
      setError('No current user available');
      return;
    }

    setIsCreatingConversation(true);
    setError(null);

    try {
      // Create a fake user for testing
      const fakeUser: User = {
        id: 'fake-user-' + Math.random().toString(36).substr(2, 9),
        username: 'Test User ' + Math.floor(Math.random() * 100),
        address: '0x' + Math.random().toString(16).substr(2, 40),
        profilePicture: 'https://via.placeholder.com/40',
      };

      const participants = [currentUser, fakeUser];
      const newConversation = await createConversation(participants);
      selectConversation(newConversation.id);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create fake conversation');
    } finally {
      setIsCreatingConversation(false);
    }
  }, [currentUser]);

  const selectConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
      loadMessages(conversationId);
    }
  };

  const searchMessages = async (query: string): Promise<Message[]> => {
    try {
      return await walrusService.searchMessages(query, currentConversation?.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search messages');
      return [];
    }
  };

  const value: MessagingContextType = {
    conversations,
    currentConversation,
    messages,
    currentUser,
    isLoading,
    error,
    sendMessage,
    sendPayment,
    requestMoney,
    acceptMoneyRequest,
    declineMoneyRequest,
    createConversation,
    createConversationWithContacts,
    createFakeConversation,
    selectConversation,
    searchMessages,
    loadMessages,
    loadConversations,
    isCreatingConversation,
  };

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  );
}; 