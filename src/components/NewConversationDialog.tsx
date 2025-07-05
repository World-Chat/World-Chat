import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, MessageCircle, User, Users, RefreshCw, Wallet } from 'lucide-react';
import { useMessaging } from '../contexts/MessagingContextMongo';

interface NewConversationDialogProps {
  trigger?: React.ReactNode;
}

const NewConversationDialog = ({ trigger }: NewConversationDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [recipientId, setRecipientId] = useState('');
  const [recipientUsername, setRecipientUsername] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  
  const { 
    findOrCreateConversation, 
    shareContactsAndCreateConversation,
    currentUser,
    refreshWorldAccount
  } = useMessaging();

  const handleCreateConversation = async () => {
    if (!recipientId.trim() || !recipientUsername.trim()) {
      alert('Please enter both User ID and Username');
      return;
    }

    try {
      setIsCreating(true);
      console.log('🚀 Creating conversation with:', { recipientId, recipientUsername });
      
      const conversation = await findOrCreateConversation(recipientId.trim(), recipientUsername.trim());
      
      if (conversation) {
        console.log('✅ Conversation created/found successfully');
        setIsOpen(false);
        setRecipientId('');
        setRecipientUsername('');
      } else {
        alert('Failed to create conversation. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error creating conversation:', error);
      alert('Failed to create conversation. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleShareContacts = async () => {
    try {
      setIsLoadingContacts(true);
      console.log('📱 Opening World App contact sharing...');
      
      await shareContactsAndCreateConversation();
      setIsOpen(false);
    } catch (error) {
      console.error('❌ Error sharing contacts:', error);
      // Don't show error for user cancellation
      if (!(error instanceof Error && error.message.includes('cancel'))) {
        alert('Failed to access World contacts. Please try again.');
      }
    } finally {
      setIsLoadingContacts(false);
    }
  };

  const handleRefreshAccount = async () => {
    try {
      setIsLoadingContacts(true);
      await refreshWorldAccount();
    } catch (error) {
      console.error('❌ Error refreshing account:', error);
    } finally {
      setIsLoadingContacts(false);
    }
  };



  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            New Conversation
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <MessageCircle className="h-5 w-5 text-blue-600" />
            </div>
            Start New Conversation
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Share contacts from World App or enter details manually
          </p>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          {/* World Account Info or Authentication Required */}
          {currentUser ? (
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Your World Account</h3>
                    <p className="text-sm text-gray-600">{currentUser.username}</p>
                    <p className="text-xs text-gray-500">
                      {currentUser.address.slice(0, 6)}...{currentUser.address.slice(-4)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefreshAccount}
                  disabled={isLoadingContacts}
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingContacts ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">World Authentication Required</h3>
                  <p className="text-sm text-gray-600">Please authenticate with your World wallet</p>
                  <p className="text-xs text-gray-500">
                    This app requires World App to function properly
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* World App Contact Sharing */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              {currentUser ? 'Share from World App' : 'Authenticate with World'}
            </Label>
            <Button
              onClick={currentUser ? handleShareContacts : handleRefreshAccount}
              disabled={isLoadingContacts}
              className="w-full h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
            >
              {isLoadingContacts ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  {currentUser ? 'Opening World App...' : 'Authenticating...'}
                </>
              ) : (
                <>
                  <Users className="w-5 h-5 mr-3" />
                  {currentUser ? 'Share Contacts from World App' : 'Authenticate with World'}
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              {currentUser 
                ? 'This will open World App to select contacts to chat with'
                : 'This will authenticate your World wallet to access your account'
              }
            </p>
          </div>



          {/* Manual Entry */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Or enter manually</Label>
            
            <div className="space-y-2">
              <Label htmlFor="recipient-id" className="text-sm">User ID / Wallet Address</Label>
              <Input
                id="recipient-id"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                placeholder="e.g., 0x582be5da... or user2"
                className="focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipient-username" className="text-sm">Username</Label>
              <Input
                id="recipient-username"
                value={recipientUsername}
                onChange={(e) => setRecipientUsername(e.target.value)}
                placeholder="e.g., mathieu.3580.world.id"
                className="focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <Button 
            onClick={handleCreateConversation} 
            className="w-full h-12 text-base bg-blue-500 hover:bg-blue-600" 
            disabled={isCreating || !recipientId.trim() || !recipientUsername.trim()}
          >
            {isCreating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Conversation
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewConversationDialog; 