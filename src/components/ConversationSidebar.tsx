import React from 'react';
import { useMessaging } from '../contexts/MessagingContextMongo';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, Plus, Loader2 } from 'lucide-react';
import NewConversationDialog from './NewConversationDialog';

const ConversationSidebar = () => {
  const { 
    conversations, 
    currentConversation, 
    setCurrentConversation, 
    currentUser,
    isLoading 
  } = useMessaging();

  const getOtherParticipant = (conversation: typeof conversations[0]) => {
    if (!currentUser) return null;
    return conversation.participants.find(p => p.id !== currentUser.id);
  };

  const formatLastMessage = (conversation: typeof conversations[0]) => {
    if (!conversation.lastMessage) {
      return "No messages yet";
    }
    return "New conversation";
  };

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-gray-900">Messages</h2>
            {currentUser && (
              <p className="text-xs text-gray-500">{currentUser.username}</p>
            )}
          </div>
          <NewConversationDialog 
            trigger={
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                title="New conversation"
              >
                <Plus className="h-4 w-4" />
              </button>
            }
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">
            <Loader2 className="h-8 w-8 mx-auto mb-2 text-gray-400 animate-spin" />
            <p className="text-sm">Loading conversations...</p>
          </div>
        ) : !currentUser ? (
          <div className="p-6 text-center text-gray-500">
            <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">World Authentication Required</h3>
            <p className="text-sm text-gray-500 mb-4">
              Please authenticate with your World wallet to access your account and start messaging
            </p>
            <div className="space-y-3">
              <NewConversationDialog 
                trigger={
                  <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full">
                    <Plus className="h-4 w-4 mr-2 inline" />
                    Authenticate with World
                  </button>
                }
              />
              <p className="text-xs text-gray-400">
                This app requires World App to function properly
              </p>
            </div>
          </div>
        ) : conversations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
            <p className="text-sm text-gray-500 mb-4">
              Share contacts from World App to start chatting with your friends
            </p>
            <div className="space-y-3">
              <NewConversationDialog 
                trigger={
                  <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full">
                    <Plus className="h-4 w-4 mr-2 inline" />
                    Share World Contacts
                  </button>
                }
              />
              <p className="text-xs text-gray-400">
                Or use the + button above to enter details manually
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {conversations
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .map((conversation) => {
                const otherParticipant = getOtherParticipant(conversation);
                const isActive = currentConversation?.id === conversation.id;
                
                return (
                  <div
                    key={conversation.id}
                    className={`p-3 md:p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      isActive ? "bg-blue-50 border-r-2 border-blue-500" : ""
                    }`}
                    onClick={() => setCurrentConversation(conversation)}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Avatar */}
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage 
                          src={otherParticipant?.profilePicture} 
                          alt={otherParticipant?.username || 'User'} 
                        />
                        <AvatarFallback className="bg-gray-200 text-gray-600">
                          {otherParticipant?.username?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>

                      {/* Conversation Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm md:text-base text-gray-900 truncate">
                            {otherParticipant?.username || 'Unknown User'}
                          </h3>
                          <div className="flex items-center space-x-1">
                            {conversation.unreadCount > 0 && (
                              <Badge variant="default" className="bg-blue-500">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                            <span className="text-xs text-gray-400">
                              {formatDistanceToNow(conversation.updatedAt, { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-xs md:text-sm text-gray-500 truncate mt-1">
                          {formatLastMessage(conversation)}
                        </p>
                        
                        {otherParticipant?.id && (
                          <p className="text-xs text-gray-400 mt-1">
                            ID: {otherParticipant.id}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Footer with current user info */}
      {currentUser && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.profilePicture} alt={currentUser.username} />
              <AvatarFallback className="bg-green-100 text-green-600">
                {currentUser.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {currentUser.username}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {currentUser.id}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationSidebar;
