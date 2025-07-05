import React, { useState } from 'react';
import { useMessaging } from '../contexts/MessagingContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User, Wallet, RefreshCw, Loader2 } from 'lucide-react';
import { WorldcoinService } from '../services/worldcoinService';

interface UserProfileProps {
  onContinue: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onContinue }) => {
  const { currentUser, isLoading } = useMessaging();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const worldcoinService = WorldcoinService.getInstance();

  const handleRefreshAuth = async () => {
    setIsRefreshing(true);
    
    try {
      const installed = worldcoinService.isInstalled();
      
      if (installed) {
        await worldcoinService.authenticateWithWallet();
      }
    } catch (error) {
      console.error('Failed to refresh authentication:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load user profile</p>
          <Button onClick={onContinue} variant="outline">
            Continue Anyway
          </Button>
        </div>
      </div>
    );
  }

  const isDesktopUser = currentUser.id === '0x1234567890123456789012345678901234567890';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Welcome to World Chat
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            {isDesktopUser ? 'Desktop Testing Mode' : 'World App Connected'}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium">Username</label>
            </div>
            <div className="p-3 bg-muted rounded-lg border">
              <p className="font-mono">{currentUser.username}</p>
            </div>
          </div>

          {/* Wallet Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium">Wallet Address</label>
            </div>
            <div className="p-3 bg-muted rounded-lg border">
              <p className="font-mono text-sm break-all">{currentUser.address}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge variant={isDesktopUser ? "secondary" : "default"} className="px-4 py-2">
              {isDesktopUser ? 'Desktop Mode' : 'World App Connected'}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Wallet Authentication Button */}
            {worldcoinService.isInstalled() && (
              <Button 
                onClick={handleRefreshAuth}
                disabled={isRefreshing}
                variant="outline"
                className="w-full"
              >
                {isRefreshing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Authentication
                  </>
                )}
              </Button>
            )}
            
            {/* Continue Button */}
            <Button 
              onClick={onContinue} 
              className="w-full"
            >
              Continue to Messages
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 