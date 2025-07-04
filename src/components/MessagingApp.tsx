
import { useState, useEffect, useCallback } from "react";
import { MiniKit } from '@worldcoin/minikit-js';
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import ConversationSidebar from "./ConversationSidebar";
import { 
  loadConversations, 
  saveConversations, 
  createNewConversation,
  createConversationWithContacts,
  type Conversation,
  type Message,
  type Contact
} from "../utils/localStorage";
import { MessageCircle, Menu, X } from "lucide-react";

const MessagingApp = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSelectingContacts, setIsSelectingContacts] = useState(false);

  useEffect(() => {
    const savedConversations = loadConversations();
    setConversations(savedConversations);
    
    // Select the most recent conversation if available
    if (savedConversations.length > 0) {
      const mostRecent = savedConversations.sort((a, b) => b.lastMessageTime - a.lastMessageTime)[0];
      setActiveConversationId(mostRecent.id);
    }
  }, []);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const addMessage = (text: string) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: Date.now(),
      sender: "user",
      type: "text",
    };

    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === activeConversationId) {
        return {
          ...conversation,
          messages: [...conversation.messages, newMessage],
          lastMessageTime: Date.now(),
        };
      }
      return conversation;
    });

    setConversations(updatedConversations);
    saveConversations(updatedConversations);
  };

  const sendMoney = (amount: number) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: "",
      timestamp: Date.now(),
      sender: "user",
      type: "money_sent",
      amount,
      currency: "usd",
      status: "completed",
    };

    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === activeConversationId) {
        return {
          ...conversation,
          messages: [...conversation.messages, newMessage],
          lastMessageTime: Date.now(),
        };
      }
      return conversation;
    });

    setConversations(updatedConversations);
    saveConversations(updatedConversations);
  };

  const requestMoney = (amount: number) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: "",
      timestamp: Date.now(),
      sender: "user",
      type: "money_request",
      amount,
      currency: "usd",
      status: "pending",
    };

    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === activeConversationId) {
        return {
          ...conversation,
          messages: [...conversation.messages, newMessage],
          lastMessageTime: Date.now(),
        };
      }
      return conversation;
    });

    setConversations(updatedConversations);
    saveConversations(updatedConversations);
  };

  const payRequest = (messageId: string, amount: number) => {
    if (!activeConversationId) return;

    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === activeConversationId) {
        const updatedMessages = conversation.messages.map(msg => {
          if (msg.id === messageId) {
            return { ...msg, status: "completed" as const };
          }
          return msg;
        });

        // Add a payment confirmation message
        const paymentMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "",
          timestamp: Date.now(),
          sender: "user",
          type: "money_sent",
          amount,
          currency: "usd",
          status: "completed",
        };

        return {
          ...conversation,
          messages: [...updatedMessages, paymentMessage],
          lastMessageTime: Date.now(),
        };
      }
      return conversation;
    });

    setConversations(updatedConversations);
    saveConversations(updatedConversations);
  };

  const shareContacts = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      console.error('World App is not installed');
      // Fallback to creating a regular conversation
      const newConversation = createNewConversation();
      const updatedConversations = [...conversations, newConversation];
      setConversations(updatedConversations);
      setActiveConversationId(newConversation.id);
      saveConversations(updatedConversations);
      return;
    }

    setIsSelectingContacts(true);
    
    try {
      const shareContactsPayload = {
        isMultiSelectEnabled: true,
        inviteMessage: "Join me on this secure chat app!",
      };

      const { finalPayload } = await MiniKit.commandsAsync.shareContacts(shareContactsPayload);
      
      if (finalPayload.status === 'success') {
        const contacts: Contact[] = finalPayload.contacts.map(contact => ({
          username: contact.username,
          walletAddress: contact.walletAddress,
          profilePictureUrl: contact.profilePictureUrl,
        }));

        const newConversation = createConversationWithContacts(contacts);
        const updatedConversations = [...conversations, newConversation];
        setConversations(updatedConversations);
        setActiveConversationId(newConversation.id);
        saveConversations(updatedConversations);
      } else {
        console.error('Contact sharing failed:', finalPayload.error_code);
        // Fallback to creating a regular conversation
        const newConversation = createNewConversation();
        const updatedConversations = [...conversations, newConversation];
        setConversations(updatedConversations);
        setActiveConversationId(newConversation.id);
        saveConversations(updatedConversations);
      }
    } catch (error) {
      console.error('Error sharing contacts:', error);
      // Fallback to creating a regular conversation
      const newConversation = createNewConversation();
      const updatedConversations = [...conversations, newConversation];
      setConversations(updatedConversations);
      setActiveConversationId(newConversation.id);
      saveConversations(updatedConversations);
    } finally {
      setIsSelectingContacts(false);
    }
  }, [conversations]);

  const createConversation = () => {
    shareContacts();
  };

  const selectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
  };

  const deleteConversation = (conversationId: string) => {
    const updatedConversations = conversations.filter(c => c.id !== conversationId);
    setConversations(updatedConversations);
    saveConversations(updatedConversations);
    
    if (activeConversationId === conversationId) {
      if (updatedConversations.length > 0) {
        const mostRecent = updatedConversations.sort((a, b) => b.lastMessageTime - a.lastMessageTime)[0];
        setActiveConversationId(mostRecent.id);
      } else {
        setActiveConversationId(null);
      }
    }
  };

  const clearCurrentConversation = () => {
    if (!activeConversationId) return;

    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === activeConversationId) {
        return {
          ...conversation,
          messages: [],
        };
      }
      return conversation;
    });

    setConversations(updatedConversations);
    saveConversations(updatedConversations);
  };

  const handleSelectConversation = (conversationId: string) => {
    selectConversation(conversationId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="h-screen flex bg-gray-50 relative">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-50 md:z-0
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        w-80 md:w-80 bg-white
      `}>
        <ConversationSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onCreateConversation={createConversation}
          onDeleteConversation={deleteConversation}
          isCreatingConversation={isSelectingContacts}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {activeConversation ? (
          <>
            {/* Header */}
            <div className="bg-white shadow-sm border-b p-3 md:p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-md"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div className="bg-blue-500 p-2 rounded-full">
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate">{activeConversation.name}</h1>
                  <p className="text-xs md:text-sm text-gray-500">
                    {activeConversation.messages.length} message{activeConversation.messages.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              {activeConversation.messages.length > 0 && (
                <button
                  onClick={clearCurrentConversation}
                  className="text-xs md:text-sm text-red-500 hover:text-red-700 px-2 md:px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
              {activeConversation.messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <MessageCircle className="h-12 w-12 md:h-16 md:w-16 mb-4 text-gray-300" />
                  <p className="text-base md:text-lg font-medium">No messages yet</p>
                  <p className="text-xs md:text-sm">Start a conversation by typing below</p>
                </div>
              ) : (
                activeConversation.messages.map((message) => (
                  <MessageBubble 
                    key={message.id} 
                    message={message} 
                    onPayRequest={payRequest}
                  />
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="bg-white border-t p-3 md:p-4">
              <MessageInput 
                onSendMessage={addMessage} 
                onSendMoney={sendMoney}
                onRequestMoney={requestMoney}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden mb-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <MessageCircle className="h-16 w-16 md:h-20 md:w-20 mb-4 text-gray-300" />
            <p className="text-lg md:text-xl font-medium text-center">Welcome to Simple Chat</p>
            <p className="text-sm md:text-base text-center">Create a new conversation to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingApp;
