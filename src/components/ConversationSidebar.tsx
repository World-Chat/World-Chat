
import { MessageCircle, Plus, Trash2, Loader2 } from "lucide-react";
import { Conversation } from "../utils/localStorage";

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onCreateConversation: () => void;
  onDeleteConversation: (conversationId: string) => void;
  isCreatingConversation?: boolean;
}

const ConversationSidebar = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation,
  isCreatingConversation = false,
}: ConversationSidebarProps) => {
  const formatLastMessage = (conversation: Conversation) => {
    if (conversation.messages.length === 0) {
      return "No messages";
    }
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    return lastMessage.text.length > 30 
      ? lastMessage.text.substring(0, 30) + "..."
      : lastMessage.text;
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-base md:text-lg font-semibold text-gray-900">Conversations</h2>
          <button
            onClick={onCreateConversation}
            disabled={isCreatingConversation}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white p-2 rounded-full transition-colors"
            title={isCreatingConversation ? "Selecting contacts..." : "New conversation"}
          >
            {isCreatingConversation ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p className="text-sm md:text-base">No conversations yet</p>
            <p className="text-xs md:text-sm">Click + to start a new chat</p>
          </div>
        ) : (
          conversations
            .sort((a, b) => b.lastMessageTime - a.lastMessageTime)
            .map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 md:p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors relative group ${
                  activeConversationId === conversation.id ? "bg-blue-50 border-blue-200" : ""
                }`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-sm md:text-base text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      {conversation.contacts && conversation.contacts.length > 0 && (
                        <div className="flex -space-x-1">
                          {conversation.contacts.slice(0, 3).map((contact, index) => (
                            <div
                              key={contact.walletAddress}
                              className="w-4 h-4 rounded-full bg-blue-500 border border-white flex items-center justify-center"
                              title={contact.username}
                            >
                              {contact.profilePictureUrl ? (
                                <img
                                  src={contact.profilePictureUrl}
                                  alt={contact.username}
                                  className="w-full h-full rounded-full"
                                />
                              ) : (
                                <span className="text-[8px] text-white font-medium">
                                  {contact.username[0].toUpperCase()}
                                </span>
                              )}
                            </div>
                          ))}
                          {conversation.contacts.length > 3 && (
                            <div className="w-4 h-4 rounded-full bg-gray-400 border border-white flex items-center justify-center">
                              <span className="text-[6px] text-white font-medium">
                                +{conversation.contacts.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 truncate mt-1">
                      {formatLastMessage(conversation)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatTime(conversation.lastMessageTime)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 transition-all"
                    title="Delete conversation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default ConversationSidebar;
