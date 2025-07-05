import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageBubble } from './MessageBubble';
import { useMessaging } from '../contexts/MessagingContext';
import { Send, DollarSign, Download, MessageCircle, Menu, Receipt } from 'lucide-react';

interface ChatInterfaceProps {
  onToggleMobileSidebar?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onToggleMobileSidebar }) => {
  const { 
    currentConversation, 
    messages, 
    sendMessage, 
    sendPayment, 
    requestMoney,
    currentUser,
    isLoading 
  } = useMessaging();
  
  const [newMessage, setNewMessage] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentToken, setPaymentToken] = useState<'WLD' | 'USDC'>('WLD');
  const [selectedRecipient, setSelectedRecipient] = useState<string>('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestAmount, setRequestAmount] = useState('');
  const [requestToken, setRequestToken] = useState<'WLD' | 'USDC'>('WLD');
  const [requestDescription, setRequestDescription] = useState('');
  
  // Bill splitting state
  const [billAmount, setBillAmount] = useState('');
  const [billToken, setBillToken] = useState<'WLD' | 'USDC'>('WLD');
  const [billDescription, setBillDescription] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('request');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Helper variables used throughout the component
  const isGroupConversation = currentConversation ? currentConversation.participants.length > 2 : false;
  const otherParticipant = currentConversation?.participants.find(p => p.id !== currentUser?.id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset selected recipient when dialog opens/closes or conversation changes
  useEffect(() => {
    if (isPaymentDialogOpen && currentConversation && currentUser) {
      if (!isGroupConversation) {
        // For individual conversations, auto-select the other participant
        const otherParticipant = currentConversation.participants.find(p => p.id !== currentUser.id);
        if (otherParticipant) {
          setSelectedRecipient(otherParticipant.address);
        }
      } else {
        // For group conversations, start with no selection
        setSelectedRecipient('');
      }
    }
  }, [isPaymentDialogOpen, currentConversation, currentUser, isGroupConversation]);

  // Reset request money dialog when it closes
  useEffect(() => {
    if (!isRequestDialogOpen) {
      // Reset regular request money form
      setRequestAmount('');
      setRequestDescription('');
      setRequestToken('WLD');
      
      // Reset bill splitting form
      setBillAmount('');
      setBillDescription('');
      setBillToken('WLD');
      setSelectedParticipants([]);
      setActiveTab('request');
    }
  }, [isRequestDialogOpen]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentConversation) return;
    
    await sendMessage(newMessage, currentConversation.id);
    setNewMessage('');
  };

  const handleSendPayment = async () => {
    if (!paymentAmount || !currentConversation || !currentUser) return;
    
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) return;

    let recipientAddress: string;
    
    if (isGroupConversation) {
      // For group conversations, use the selected recipient
      if (!selectedRecipient) return;
      recipientAddress = selectedRecipient;
    } else {
      // For individual conversations, use the other participant
      const otherParticipant = currentConversation.participants.find(p => p.id !== currentUser.id);
      if (!otherParticipant) return;
      recipientAddress = otherParticipant.address;
    }

    await sendPayment(amount, paymentToken, recipientAddress, currentConversation.id);
    setPaymentAmount('');
    setSelectedRecipient('');
    setIsPaymentDialogOpen(false);
  };

  const handleRequestMoney = async () => {
    if (!requestAmount || !currentConversation || !currentUser) return;
    
    const amount = parseFloat(requestAmount);
    if (isNaN(amount) || amount <= 0) return;

    await requestMoney(amount, requestToken, requestDescription, currentConversation.id);
    setIsRequestDialogOpen(false);
  };

  const handleSplitBill = async () => {
    if (!billAmount || !currentConversation || !currentUser || selectedParticipants.length === 0) return;
    
    const totalAmount = parseFloat(billAmount);
    if (isNaN(totalAmount) || totalAmount <= 0) return;

    // Calculate amount per person (including the current user)
    const totalPeople = selectedParticipants.length + 1; // +1 for the current user
    const amountPerPerson = totalAmount / totalPeople;

    // Create money requests for each selected participant
    const description = billDescription 
      ? `Split bill: ${billDescription} (${totalAmount} ${billToken} ÷ ${totalPeople} people)`
      : `Split bill: ${totalAmount} ${billToken} ÷ ${totalPeople} people`;

    try {
      // Send individual money requests to each selected participant
      for (const participantId of selectedParticipants) {
        await requestMoney(amountPerPerson, billToken, description, currentConversation.id);
      }

      setIsRequestDialogOpen(false);
    } catch (error) {
      console.error('Failed to split bill:', error);
    }
  };

  const toggleParticipant = (participantId: string) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId) 
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const getAvailableParticipants = () => {
    if (!currentConversation || !currentUser) return [];
    return currentConversation.participants.filter(p => p.id !== currentUser.id);
  };

  const calculateSplitAmount = () => {
    if (!billAmount || selectedParticipants.length === 0) return 0;
    const totalAmount = parseFloat(billAmount);
    if (isNaN(totalAmount)) return 0;
    return totalAmount / (selectedParticipants.length + 1); // +1 for current user
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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

  const getGroupName = () => {
    if (!currentUser) return 'Group Chat';
    
    const otherParticipants = currentConversation.participants.filter(p => p.id !== currentUser.id);
    
    if (otherParticipants.length === 0) return 'Group Chat';
    if (otherParticipants.length === 1) return otherParticipants[0].username || 'Unknown User';
    if (otherParticipants.length === 2) {
      return `${otherParticipants[0].username || 'User'}, ${otherParticipants[1].username || 'User'}`;
    }
    
    // For more than 2 other participants, show first two + count
    return `${otherParticipants[0].username || 'User'}, ${otherParticipants[1].username || 'User'} +${otherParticipants.length - 2}`;
  };

  const getGroupAvatars = () => {
    if (!currentUser) return [];
    
    const otherParticipants = currentConversation.participants.filter(p => p.id !== currentUser.id);
    return otherParticipants.slice(0, 3); // Show up to 3 avatars
  };

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
          
          {isGroupConversation ? (
            // Group conversation header
            <div className="relative">
              {getGroupAvatars().length > 0 ? (
                <div className="flex -space-x-2">
                  {getGroupAvatars().map((participant, index) => (
                    <Avatar key={participant.id} className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={participant.profilePicture} />
                      <AvatarFallback className="text-xs">
                        {participant.username?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {getGroupAvatars().length < currentConversation.participants.length - 1 && (
                    <div className="h-8 w-8 border-2 border-background bg-muted rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">
                        +{currentConversation.participants.length - 1 - getGroupAvatars().length}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <Avatar className="h-10 w-10">
                  <AvatarFallback>👥</AvatarFallback>
                </Avatar>
              )}
            </div>
          ) : (
            // Individual conversation header
            <Avatar className="h-10 w-10">
              <AvatarImage src={otherParticipant?.profilePicture} />
              <AvatarFallback>
                {otherParticipant?.username?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          )}
          
          <div className="flex-1">
            <h2 className="font-semibold">
              {isGroupConversation ? getGroupName() : (otherParticipant?.username || 'Unknown User')}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isGroupConversation 
                ? `${currentConversation.participants.length} members`
                : (otherParticipant?.address 
                    ? `${otherParticipant.address.slice(0, 6)}...${otherParticipant.address.slice(-4)}`
                    : 'No address'
                  )
              }
            </p>
          </div>
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
        <div className="flex items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isLoading || !currentUser}
            className="flex-1"
          />
          
          {/* Request Money Dialog */}
          <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" disabled={isLoading || !currentUser}>
                <Download className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Request Money</DialogTitle>
              </DialogHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="request" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Request Money
                  </TabsTrigger>
                  <TabsTrigger value="split" className="flex items-center gap-2">
                    <Receipt className="h-4 w-4" />
                    Split Bill
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="request" className="space-y-4">
                  <div>
                    <Label htmlFor="request-amount">Amount</Label>
                    <Input
                      id="request-amount"
                      type="number"
                      value={requestAmount}
                      onChange={(e) => setRequestAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="request-token">Token</Label>
                    <Select value={requestToken} onValueChange={(value: 'WLD' | 'USDC') => setRequestToken(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WLD">WLD</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="request-description">Description (optional)</Label>
                    <Textarea
                      id="request-description"
                      value={requestDescription}
                      onChange={(e) => setRequestDescription(e.target.value)}
                      placeholder="What's this for?"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleRequestMoney} className="w-full" disabled={!requestAmount}>
                    Request Money
                  </Button>
                </TabsContent>
                
                <TabsContent value="split" className="space-y-4">
                  <div>
                    <Label htmlFor="bill-amount">Total Amount Paid</Label>
                    <Input
                      id="bill-amount"
                      type="number"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bill-token">Token</Label>
                    <Select value={billToken} onValueChange={(value: 'WLD' | 'USDC') => setBillToken(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WLD">WLD</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bill-description">Description (optional)</Label>
                    <Input
                      id="bill-description"
                      value={billDescription}
                      onChange={(e) => setBillDescription(e.target.value)}
                      placeholder="e.g., Dinner at restaurant"
                    />
                  </div>
                  <div>
                    <Label>Who did you pay for?</Label>
                    <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                      {getAvailableParticipants().map((participant) => (
                        <div key={participant.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={participant.id}
                            checked={selectedParticipants.includes(participant.id)}
                            onCheckedChange={() => toggleParticipant(participant.id)}
                          />
                          <div className="flex items-center space-x-2 flex-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={participant.profilePicture} />
                              <AvatarFallback className="text-xs">
                                {participant.username?.charAt(0).toUpperCase() || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <Label htmlFor={participant.id} className="text-sm font-normal cursor-pointer">
                              {participant.username || 'Unknown User'}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {selectedParticipants.length > 0 && billAmount && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Each person owes: <span className="font-medium">{calculateSplitAmount().toFixed(2)} {billToken}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total people: {selectedParticipants.length + 1} (including you)
                      </p>
                    </div>
                  )}
                  <Button 
                    onClick={handleSplitBill} 
                    className="w-full" 
                    disabled={!billAmount || selectedParticipants.length === 0}
                  >
                    Split Bill
                  </Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          
          {/* Send Payment Dialog */}
          <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" disabled={isLoading || !currentUser}>
                <DollarSign className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Payment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {isGroupConversation && (
                  <div>
                    <Label htmlFor="recipient">Send to</Label>
                    <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a group member" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentConversation.participants
                          .filter(p => p.id !== currentUser?.id)
                          .map((participant) => (
                            <SelectItem key={participant.id} value={participant.address}>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={participant.profilePicture} />
                                  <AvatarFallback className="text-xs">
                                    {participant.username?.charAt(0).toUpperCase() || 'U'}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{participant.username || 'Unknown User'}</span>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div>
                  <Label htmlFor="token">Token</Label>
                  <Select value={paymentToken} onValueChange={(value: 'WLD' | 'USDC') => setPaymentToken(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WLD">WLD</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleSendPayment} 
                  className="w-full" 
                  disabled={!paymentAmount || (isGroupConversation && !selectedRecipient)}
                >
                  Send Payment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button onClick={handleSendMessage} disabled={!newMessage.trim() || isLoading || !currentUser}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}; 