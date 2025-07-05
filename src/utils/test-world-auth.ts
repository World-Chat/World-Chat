/**
 * Test utility for World authentication
 */

import { WorldcoinService } from '../services/worldcoinService';

// Test World authentication
export const testWorldAuth = async () => {
  console.log('🧪 Testing World authentication...');
  
  try {
    const worldService = WorldcoinService.getInstance();
    
    // Test 1: Initialize MiniKit
    console.log('\n1️⃣ Testing MiniKit initialization...');
    const isInitialized = await worldService.initializeMiniKit();
    console.log(`   MiniKit initialized: ${isInitialized}`);
    
    if (!isInitialized) {
      console.log('❌ MiniKit not available - please run in World App');
      return false;
    }
    
    // Test 2: Get current user
    console.log('\n2️⃣ Testing user authentication...');
    const currentUser = await worldService.getCurrentUser();
    
    if (currentUser) {
      console.log('✅ User authenticated successfully!');
      console.log(`   Username: ${currentUser.username}`);
      console.log(`   Address: ${currentUser.address}`);
      console.log(`   Profile Picture: ${currentUser.profilePicture || 'None'}`);
    } else {
      console.log('❌ User authentication failed');
      return false;
    }
    
    // Test 3: Test user lookup
    console.log('\n3️⃣ Testing user lookup...');
    const userLookup = await worldService.getUserByAddress(currentUser.address);
    if (userLookup) {
      console.log('✅ User lookup successful!');
      console.log(`   Found user: ${userLookup.username}`);
    } else {
      console.log('⚠️ User lookup failed (this may be expected)');
    }
    
    console.log('\n✅ World authentication test completed successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ World authentication test failed:', error);
    return false;
  }
};

// Test contact sharing
export const testContactSharing = async () => {
  console.log('📱 Testing contact sharing...');
  
  try {
    const worldService = WorldcoinService.getInstance();
    
    // Test contact sharing
    const contacts = await worldService.getContacts();
    console.log(`✅ Retrieved ${contacts.length} contacts`);
    
    if (contacts.length > 0) {
      console.log('📋 Contact details:');
      contacts.forEach((contact, index) => {
        console.log(`   ${index + 1}. ${contact.username || 'Unknown'} (${contact.address})`);
      });
    } else {
      console.log('📭 No contacts shared');
    }
    
    return contacts;
    
  } catch (error) {
    console.error('❌ Contact sharing test failed:', error);
    return [];
  }
};

// Quick test function
export const quickAuthTest = async () => {
  console.log('🚀 Quick World authentication test...');
  
  const authSuccess = await testWorldAuth();
  if (authSuccess) {
    console.log('🎉 Authentication successful! You can now use the app.');
  } else {
    console.log('❌ Authentication failed. Please ensure you are in World App.');
  }
  
  return authSuccess;
};

// Make functions available globally for browser console
if (typeof window !== 'undefined') {
  (window as unknown as { testWorldAuth: typeof testWorldAuth; testContactSharing: typeof testContactSharing; quickAuthTest: typeof quickAuthTest }).testWorldAuth = testWorldAuth;
  (window as unknown as { testWorldAuth: typeof testWorldAuth; testContactSharing: typeof testContactSharing; quickAuthTest: typeof quickAuthTest }).testContactSharing = testContactSharing;
  (window as unknown as { testWorldAuth: typeof testWorldAuth; testContactSharing: typeof testContactSharing; quickAuthTest: typeof quickAuthTest }).quickAuthTest = quickAuthTest;
} 