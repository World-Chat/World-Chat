import { Conversation, Message, User } from '../types/messaging';

// Mock users
export const MOCK_USERS: User[] = [
  {
    id: 'user1',
    username: 'alice.eth',
    address: '0xa882a2af989de54330f994cf626ea7f5d5edc2fc',
    profilePicture: 'https://via.placeholder.com/40/10B981/FFFFFF?text=A'
  },
  {
    id: 'user2', 
    username: 'bob.world',
    address: '0x582be5da7d06b2bf6d89c5b4499491c5990fafe4',
    profilePicture: 'https://via.placeholder.com/40/3B82F6/FFFFFF?text=B'
  },
  {
    id: 'user3',
    username: 'charlie.dev',
    address: '0x1234567890123456789012345678901234567890',
    profilePicture: 'https://via.placeholder.com/40/EF4444/FFFFFF?text=C'
  },
  {
    id: 'user4',
    username: 'diana.crypto',
    address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    profilePicture: 'https://via.placeholder.com/40/8B5CF6/FFFFFF?text=D'
  }
];

// Mock conversations
export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participants: [MOCK_USERS[0], MOCK_USERS[1]],
    unreadCount: 2,
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-15T15:45:00Z'),
    lastMessage: {
      id: 'msg-1-5',
      conversationId: 'conv-1',
      senderId: 'user2',
      content: 'Thanks for the payment! 🎉',
      timestamp: new Date('2024-01-15T15:45:00Z'),
      messageType: 'text'
    }
  },
  {
    id: 'conv-2',
    participants: [MOCK_USERS[0], MOCK_USERS[2]],
    unreadCount: 0,
    createdAt: new Date('2024-01-14T08:20:00Z'),
    updatedAt: new Date('2024-01-14T16:30:00Z'),
    lastMessage: {
      id: 'msg-2-3',
      conversationId: 'conv-2',
      senderId: 'user1',
      content: 'Let me know when you want to collaborate on that project',
      timestamp: new Date('2024-01-14T16:30:00Z'),
      messageType: 'text'
    }
  },
  {
    id: 'conv-3',
    participants: [MOCK_USERS[0], MOCK_USERS[3]],
    unreadCount: 1,
    createdAt: new Date('2024-01-13T14:15:00Z'),
    updatedAt: new Date('2024-01-13T18:20:00Z'),
    lastMessage: {
      id: 'msg-3-2',
      conversationId: 'conv-3',
      senderId: 'user4',
      content: 'Can you send me 25 WLD for the conference tickets?',
      timestamp: new Date('2024-01-13T18:20:00Z'),
      messageType: 'payment_request'
    }
  }
];

// Mock messages for each conversation
export const MOCK_MESSAGES: { [conversationId: string]: Message[] } = {
  'conv-1': [
    {
      id: 'msg-1-1',
      conversationId: 'conv-1',
      senderId: 'user1',
      content: 'Hey Bob! How are you doing?',
      timestamp: new Date('2024-01-15T10:30:00Z'),
      messageType: 'text'
    },
    {
      id: 'msg-1-2',
      conversationId: 'conv-1',
      senderId: 'user2',
      content: 'I\'m doing great! Just finished working on a new smart contract.',
      timestamp: new Date('2024-01-15T10:35:00Z'),
      messageType: 'text'
    },
    {
      id: 'msg-1-3',
      conversationId: 'conv-1',
      senderId: 'user1',
      content: 'That sounds awesome! I owe you for helping me with the deployment last week.',
      timestamp: new Date('2024-01-15T10:40:00Z'),
      messageType: 'text'
    },
    {
      id: 'msg-1-4',
      conversationId: 'conv-1',
      senderId: 'user1',
      content: 'Sending you some WLD as a thank you! 💰',
      timestamp: new Date('2024-01-15T15:40:00Z'),
      messageType: 'payment',
      paymentData: {
        amount: 50,
        token: 'WLD',
        recipientAddress: '0x582be5da7d06b2bf6d89c5b4499491c5990fafe4',
        transactionHash: '0x1234567890abcdef1234567890abcdef12345678',
        status: 'completed'
      }
    },
    {
      id: 'msg-1-5',
      conversationId: 'conv-1',
      senderId: 'user2',
      content: 'Thanks for the payment! 🎉',
      timestamp: new Date('2024-01-15T15:45:00Z'),
      messageType: 'text'
    }
  ],
  'conv-2': [
    {
      id: 'msg-2-1',
      conversationId: 'conv-2',
      senderId: 'user3',
      content: 'Alice, I saw your post about the new DeFi protocol. Very interesting!',
      timestamp: new Date('2024-01-14T08:20:00Z'),
      messageType: 'text'
    },
    {
      id: 'msg-2-2',
      conversationId: 'conv-2',
      senderId: 'user1',
      content: 'Thanks Charlie! I\'ve been working on it for months. The yield farming mechanism is quite innovative.',
      timestamp: new Date('2024-01-14T09:15:00Z'),
      messageType: 'text'
    },
    {
      id: 'msg-2-3',
      conversationId: 'conv-2',
      senderId: 'user1',
      content: 'Let me know when you want to collaborate on that project',
      timestamp: new Date('2024-01-14T16:30:00Z'),
      messageType: 'text'
    }
  ],
  'conv-3': [
    {
      id: 'msg-3-1',
      conversationId: 'conv-3',
      senderId: 'user1',
      content: 'Diana! Are you going to the crypto conference next week?',
      timestamp: new Date('2024-01-13T14:15:00Z'),
      messageType: 'text'
    },
    {
      id: 'msg-3-2',
      conversationId: 'conv-3',
      senderId: 'user4',
      content: 'Yes! I\'m so excited. Can you send me 25 WLD for the conference tickets?',
      timestamp: new Date('2024-01-13T18:20:00Z'),
      messageType: 'payment_request',
      moneyRequestData: {
        id: 'req-1',
        amount: 25,
        token: 'WLD',
        description: 'Conference tickets',
        requesterId: 'user4',
        requesterAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        status: 'pending',
        createdAt: new Date('2024-01-13T18:20:00Z')
      }
    }
  ]
};

// Helper function to get mock conversations
export const getMockConversations = (): Conversation[] => {
  return MOCK_CONVERSATIONS;
};

// Helper function to get mock messages for a conversation
export const getMockMessages = (conversationId: string): Message[] => {
  return MOCK_MESSAGES[conversationId] || [];
};

// Helper function to get current user (first user in mock data)
export const getMockCurrentUser = (): User => {
  return MOCK_USERS[0];
}; 