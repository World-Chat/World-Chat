import { WorldcoinService } from '../services/worldcoinService';

/**
 * Test WorldCoin MiniKit integration
 * Run this in browser console: await testWorldIntegration()
 */
export async function testWorldIntegration() {
  console.log('🌍 Testing WorldCoin MiniKit Integration');
  console.log('=====================================');

  const worldcoinService = WorldcoinService.getInstance();

  try {
    // Test 1: Initialize MiniKit
    console.log('\n📱 Test 1: Initializing MiniKit...');
    const isInitialized = await worldcoinService.initializeMiniKit();
    console.log(isInitialized ? '✅ MiniKit initialized' : '❌ MiniKit failed to initialize');

    // Test 2: Check installation
    console.log('\n📱 Test 2: Checking MiniKit availability...');
    const isInstalled = await worldcoinService.isInstalled();
    console.log(isInstalled ? '✅ MiniKit is available' : '❌ MiniKit not available');

    // Test 3: Get current user
    console.log('\n👤 Test 3: Getting current user...');
    const currentUser = await worldcoinService.getCurrentUser();
    if (currentUser) {
      console.log('✅ Current user found:');
      console.log(`   Username: ${currentUser.username}`);
      console.log(`   Address: ${currentUser.address}`);
      console.log(`   Profile: ${currentUser.profilePicture || 'None'}`);
    } else {
      console.log('⚠️ No current user found');
    }

    // Test 4: Contact sharing
    console.log('\n👥 Test 4: Testing contact sharing...');
    console.log('   Note: This will open World App contact dialog');
    try {
      const contacts = await worldcoinService.getContacts();
      console.log(`✅ Retrieved ${contacts.length} contacts:`);
      contacts.forEach((contact, index) => {
        console.log(`   ${index + 1}. ${contact.username || 'Unknown'} (${contact.address})`);
      });
    } catch (error) {
      console.log('❌ Contact sharing failed or was cancelled:', error);
    }

    // Test 5: User lookup
    console.log('\n🔍 Test 5: Testing user lookup...');
    const testAddress = '0x582be5da7d06b2bf6d89c5b4499491c5990fafe4';
    const userInfo = await worldcoinService.getUserByAddress(testAddress);
    if (userInfo) {
      console.log(`✅ Found user: ${userInfo.username} (${userInfo.address})`);
    } else {
      console.log('⚠️ User not found');
    }

    console.log('\n🎉 WorldCoin integration test completed!');
    console.log('\n📋 Summary:');
    console.log(`   MiniKit Available: ${isInstalled ? 'Yes' : 'No'}`);
    console.log(`   User Connected: ${currentUser ? 'Yes' : 'No'}`);
    if (currentUser) {
      console.log(`   Username: ${currentUser.username}`);
    }

    return {
      miniKitAvailable: isInstalled,
      userConnected: !!currentUser,
      currentUser,
    };

  } catch (error) {
    console.error('❌ WorldCoin integration test failed:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Make sure you\'re running in World App browser');
    console.log('   2. Check if World App is installed and updated');
    console.log('   3. Verify your app ID is configured correctly');
    console.log('   4. Ensure you\'re connected to your World account');
    
    return {
      miniKitAvailable: false,
      userConnected: false,
      currentUser: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Quick test to check if WorldCoin is working
 * Run this in browser console: await quickWorldTest()
 */
export async function quickWorldTest() {
  console.log('⚡ Quick WorldCoin Test');
  
  const worldcoinService = WorldcoinService.getInstance();
  
  try {
    const isInstalled = await worldcoinService.isInstalled();
    const currentUser = await worldcoinService.getCurrentUser();
    
    console.log(`WorldCoin MiniKit: ${isInstalled ? '✅ Available' : '❌ Not Available'}`);
    console.log(`User Connected: ${currentUser ? '✅ Yes' : '❌ No'}`);
    
    if (currentUser) {
      console.log(`User: ${currentUser.username} (${currentUser.address})`);
    }
    
    return { isInstalled, hasUser: !!currentUser, user: currentUser };
  } catch (error) {
    console.error('Quick test failed:', error);
    return { isInstalled: false, hasUser: false, user: null };
  }
}

// Make tests available globally for browser console
declare global {
  interface Window {
    testWorldIntegration: typeof testWorldIntegration;
    quickWorldTest: typeof quickWorldTest;
  }
}

if (typeof window !== 'undefined') {
  window.testWorldIntegration = testWorldIntegration;
  window.quickWorldTest = quickWorldTest;
  console.log('🌍 WorldCoin test functions available:');
  console.log('   testWorldIntegration() - Full integration test');
  console.log('   quickWorldTest() - Quick availability check');
} 