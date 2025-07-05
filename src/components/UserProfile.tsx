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
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const worldcoinService = WorldcoinService.getInstance();

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugLogs(prev => [...prev.slice(-4), `${timestamp}: ${message}`]);
  };

  const handleRefreshAuth = async () => {
    setIsRefreshing(true);
    addLog('=== STARTING WALLET AUTH ===');
    
    try {
      const installed = worldcoinService.isInstalled();
      addLog(`World App installed: ${installed}`);
      
      if (installed) {
        addLog('Current MiniKit.user status:');
        const { MiniKit } = await import('@worldcoin/minikit-js');
        addLog(`- exists: ${!!MiniKit.user}`);
        addLog(`- username: ${MiniKit.user?.username || 'None'}`);
        addLog(`- walletAddress: ${MiniKit.user?.walletAddress || 'None'}`);
        
        addLog('Triggering wallet authentication...');
        const user = await worldcoinService.authenticateWithWallet();
        addLog(`Auth result: ${user ? 'SUCCESS' : 'FAILED'}`);
        
        if (user) {
          addLog(`✅ User address: ${user.walletAddress || 'None'}`);
          addLog(`✅ Username: ${user.username || 'None'}`);
          addLog('Reloading page in 3 seconds...');
          setTimeout(() => window.location.reload(), 5000);
        } else {
          addLog('❌ No user data received');
          // Check MiniKit.user again after auth attempt
          addLog('Post-auth MiniKit.user status:');
          addLog(`- exists: ${!!MiniKit.user}`);
          addLog(`- username: ${MiniKit.user?.username || 'None'}`);
          addLog(`- walletAddress: ${MiniKit.user?.walletAddress || 'None'}`);
        }
      } else {
        addLog('❌ World App not installed - using fallback');
      }
    } catch (error) {
      addLog(`❌ Auth error: ${error instanceof Error ? error.message : 'Unknown'}`);
      console.error('Failed to refresh authentication:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Check authentication status on mount
  React.useEffect(() => {
    const checkAuthStatus = async () => {
      addLog('=== PAGE LOAD - CHECKING AUTH STATUS ===');
      
      try {
        // Check localStorage first
        const storedUser = localStorage.getItem('world-app-user');
        addLog(`LocalStorage 'world-app-user': ${storedUser ? 'EXISTS' : 'NOT FOUND'}`);
        
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            addLog(`Stored user data:`);
            addLog(`- ID: ${userData.id || 'None'}`);
            addLog(`- Username: ${userData.username || 'None'}`);
            addLog(`- Address: ${userData.address || 'None'}`);
          } catch (parseError) {
            addLog(`Error parsing stored data: ${parseError instanceof Error ? parseError.message : 'Unknown'}`);
          }
        }
        
        const installed = worldcoinService.isInstalled();
        addLog(`World App installed: ${installed}`);
        
        if (installed) {
          addLog('Checking WorldcoinService current user...');
          const user = worldcoinService.getCurrentUser();
          addLog(`WorldcoinService user: ${user ? 'Found' : 'None'}`);
          if (user) {
            addLog(`- Address: ${user.walletAddress || 'None'}`);
            addLog(`- Username: ${user.username || 'None'}`);
          }
          
          // Check MiniKit.user status
          try {
            const { MiniKit } = await import('@worldcoin/minikit-js');
            addLog(`MiniKit.user exists: ${!!MiniKit.user}`);
            
            if (MiniKit.user) {
              addLog(`MiniKit.user.username: ${MiniKit.user.username || 'None'}`);
              addLog(`MiniKit.user.walletAddress: ${MiniKit.user.walletAddress || 'None'}`);
            } else {
              addLog('MiniKit.user is null/undefined');
            }
          } catch (importError) {
            addLog(`Failed to import MiniKit: ${importError instanceof Error ? importError.message : 'Unknown'}`);
          }
        }
        
        // Check what the MessagingContext currentUser is
        addLog(`React currentUser:`);
        addLog(`- ID: ${currentUser?.id || 'None'}`);
        addLog(`- Username: ${currentUser?.username || 'None'}`);
        addLog(`- Address: ${currentUser?.address || 'None'}`);
        
      } catch (error) {
        addLog(`Check error: ${error instanceof Error ? error.message : 'Unknown'}`);
      }
    };
    
    checkAuthStatus();
  }, [currentUser]);

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

          {/* Debug Logs */}
          {debugLogs.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <label className="text-sm font-medium text-gray-700">Debug Logs</label>
              </div>
              <div className="p-3 bg-gray-900 rounded-lg border max-h-32 overflow-y-auto">
                {debugLogs.map((log, index) => (
                  <p key={index} className="text-xs text-green-400 font-mono break-all">
                    {log}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Wallet Authentication Button */}
            <div className="space-y-2">
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
                    Trigger Wallet Authentication
                  </>
                )}
              </Button>
              {!isDesktopUser && (
                <p className="text-xs text-gray-500 text-center">
                  Click to authenticate with World App and populate your real user data
                </p>
              )}
            </div>
            
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