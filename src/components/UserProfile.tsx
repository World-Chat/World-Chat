import React, { useState } from 'react';
import { useMessaging } from '../contexts/MessagingContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User, Wallet, RefreshCw } from 'lucide-react';
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
      if (worldcoinService.isInstalled()) {
        await worldcoinService.authenticateWithWallet();
        // Refresh the page to reload user data
        window.location.reload();
      } else {
        console.log('World App not installed');
      }
    } catch (error) {
      console.error('Failed to refresh authentication:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your World App profile...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load user profile</p>
          <Button onClick={onContinue} variant="outline">
            Continue Anyway
          </Button>
        </div>
      </div>
    );
  }

  const isDesktopUser = currentUser.id === '0x1234567890123456789012345678901234567890';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Welcome to World Chat
          </CardTitle>
          <p className="text-gray-600 mt-2">
            {isDesktopUser ? 'Desktop Testing Mode' : 'World App Connected'}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <label className="text-sm font-medium text-gray-700">Username</label>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <p className="text-gray-800 font-mono">{currentUser.username}</p>
            </div>
          </div>

          {/* Wallet Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-purple-600" />
              <label className="text-sm font-medium text-gray-700">Wallet Address</label>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <p className="text-gray-800 font-mono text-sm break-all">{currentUser.address}</p>
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
            {/* Refresh Authentication Button */}
            <Button 
              onClick={handleRefreshAuth}
              disabled={isRefreshing}
              variant="outline"
              className="w-full"
            >
              {isRefreshing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh World App Auth
                </>
              )}
            </Button>
            
            {/* Continue Button */}
            <Button 
              onClick={onContinue} 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Continue to Messages
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 