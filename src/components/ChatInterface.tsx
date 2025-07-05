import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageBubble } from './MessageBubble';
import MessageInput from './MessageInput';
import { useMessaging } from '../contexts/MessagingContextMongo';
import { MessageCircle, Menu, RefreshCw, Bug } from 'lucide-react';
import { diagnoseIssues } from '../utils/diagnose-issues';

interface ChatInterfaceProps {
  onToggleMobileSidebar?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onToggleMobileSidebar }) => {
  const { 
    currentConversation, 
    messages, 
    sendMessage, 
    sendPayment, 
    sendPaymentRequest,
    loadMessages,
    currentUser,
    isLoading 
  } = useMessaging();
  
  const [isDebugRunning, setIsDebugRunning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !currentConversation) return;
    await sendMessage(text, currentConversation.id);
  };

  const handleSendMoney = async (amount: number) => {
    if (!currentConversation || !currentUser) return;
    
    const otherParticipant = currentConversation.participants.find(p => p.id !== currentUser.id);
    if (!otherParticipant) return;

    await sendPayment(amount, 'WLD', currentConversation.id);
    console.log(`💰 Sent ${amount} WLD to ${otherParticipant.username}`);
  };

  const handleRequestMoney = async (amount: number) => {
    if (!currentConversation || !currentUser) return;
    
    await sendPaymentRequest(amount, 'WLD', `Money request for ${amount} WLD`, currentConversation.id);
    console.log(`💸 Requested ${amount} WLD`);
  };

  const handleRecurringPayment = async (amount: number, frequency: string) => {
    if (!currentConversation || !currentUser) return;
    
    // For now, just log the recurring payment setup
    console.log(`🔄 Setting up recurring payment: ${amount} WLD ${frequency}`);
    
    // You can implement actual recurring payment logic here
    const message = `Set up recurring payment: ${amount} WLD ${frequency}`;
    await sendMessage(message, currentConversation.id);
  };

  const handleSplitBill = async (amount: number, people: number) => {
    if (!currentConversation || !currentUser) return;
    
    const amountPerPerson = (amount / people).toFixed(2);
    console.log(`👥 Splitting ${amount} WLD among ${people} people (${amountPerPerson} WLD each)`);
    
    // You can implement actual bill splitting logic here
    const message = `Split bill: ${amount} WLD ÷ ${people} people = ${amountPerPerson} WLD each`;
    await sendMessage(message, currentConversation.id);
  };

  if (!currentConversation) {
    return (
      <div className="flex-1 flex flex-col">
        {/* Header for no conversation state */}
        <div className="p-3 md:p-4 border-b border-border bg-background md:hidden">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleMobileSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="ml-3 font-semibold">Chats</h2>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">Select a conversation</h3>
            <p className="text-sm text-muted-foreground">Choose a conversation to start messaging</p>
          </div>
        </div>
      </div>
    );
  }

  const otherParticipant = currentConversation.participants.find(p => p.id !== currentUser?.id);

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-border bg-background">
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleMobileSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Avatar className="h-10 w-10">
            <AvatarImage src={otherParticipant?.profilePicture} />
            <AvatarFallback>
              {otherParticipant?.username?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="font-semibold">{otherParticipant?.username || 'Unknown User'}</h2>
            <p className="text-sm text-muted-foreground">
              {otherParticipant?.address 
                ? `${otherParticipant.address.slice(0, 6)}...${otherParticipant.address.slice(-4)}`
                : 'No address'
              }
            </p>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => currentConversation && loadMessages(currentConversation.id)}
            disabled={isLoading}
            title="Refresh messages"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3 md:p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isOwnMessage = message.senderId === currentUser?.id;
            const sender = isOwnMessage 
              ? currentUser 
              : currentConversation.participants.find(p => p.id === message.senderId);
            
            return (
              <MessageBubble
                key={message.id}
                message={message}
                isOwnMessage={isOwnMessage}
                senderName={sender?.username || 'Unknown User'}
                senderAvatar={sender?.profilePicture}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-3 md:p-4 border-t border-border bg-background">
        <MessageInput
          onSendMessage={handleSendMessage}
          onSendMoney={handleSendMoney}
          onRequestMoney={handleRequestMoney}
          onRecurringPayment={handleRecurringPayment}
          onSplitBill={handleSplitBill}
        />
      </div>

      {/* Debug Button */}
      <div className="p-3 md:p-4 border-t border-border bg-background">
        <Button 
          variant="outline" 
          size="icon" 
          disabled={isLoading || isDebugRunning}
          onClick={async () => {
            setIsDebugRunning(true);
            try {
              console.log('🔧 Running diagnostics...');
              await diagnoseIssues();
              console.log('✅ Diagnostics complete! Check console for results.');
            } catch (error) {
              console.error('❌ Debug failed:', error);
            } finally {
              setIsDebugRunning(false);
            }
          }}
          title="Debug Issues"
        >
          <Bug className={`h-4 w-4 ${isDebugRunning ? 'animate-pulse' : ''}`} />
        </Button>
      </div>
    </div>
  );
}; 