export interface Message {
  id: string;
  text: string;
  timestamp: number;
  sender: "user";
  type?: "text" | "money_request" | "money_sent";
  amount?: number;
  currency?: string;
  status?: "pending" | "completed" | "cancelled";
}

export interface Contact {
  username: string;
  walletAddress: string;
  profilePictureUrl: string | null;
}

export interface Conversation {
  id: string;
  name: string;
  messages: Message[];
  lastMessageTime: number;
  contacts?: Contact[];
}

const CONVERSATIONS_KEY = "simple-chat-conversations";

export const loadConversations = (): Conversation[] => {
  try {
    const stored = localStorage.getItem(CONVERSATIONS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading conversations from localStorage:", error);
  }
  return [];
};

export const saveConversations = (conversations: Conversation[]): void => {
  try {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error("Error saving conversations to localStorage:", error);
  }
};

export const createNewConversation = (): Conversation => {
  const now = Date.now();
  return {
    id: now.toString(),
    name: `Chat ${new Date(now).toLocaleDateString()}`,
    messages: [],
    lastMessageTime: now,
  };
};

export const createConversationWithContacts = (contacts: Contact[]): Conversation => {
  const now = Date.now();
  const conversationName = contacts.length === 1 
    ? contacts[0].username 
    : `${contacts[0].username} + ${contacts.length - 1} other${contacts.length > 2 ? 's' : ''}`;
    
  return {
    id: now.toString(),
    name: conversationName,
    messages: [],
    lastMessageTime: now,
    contacts,
  };
};
