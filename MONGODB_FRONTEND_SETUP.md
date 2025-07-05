# MongoDB Frontend Setup Guide

This guide explains how to set up MongoDB Atlas Data API for direct frontend access, replacing the previous backend server architecture.

## Overview

The app now connects directly to MongoDB Atlas using the Data API, eliminating the need for a backend Express server. This simplifies the architecture while maintaining all functionality.

## MongoDB Atlas Data API Setup

### 1. Enable Data API in MongoDB Atlas

1. Go to your MongoDB Atlas dashboard
2. Navigate to your cluster
3. Click on "Data API" in the sidebar
4. Enable the Data API
5. Create an API key with appropriate permissions
6. Note down your:
   - Data API URL
   - API Key
   - Data Source name (usually "Cluster0")
   - Database name

### 2. Environment Variables

Update your `.env` file with the following variables:

```env
# MongoDB Atlas Data API Configuration
VITE_MONGODB_DATA_API_URL=https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1
VITE_MONGODB_DATA_API_KEY=your_api_key_here
VITE_MONGODB_DATA_SOURCE=Cluster0
VITE_MONGODB_DATABASE=chatterbox

# Cometh Configuration (existing)
VITE_COMETH_API_KEY=your_cometh_api_key
VITE_COMETH_BUNDLER_URL=your_bundler_url
VITE_COMETH_PAYMASTER_URL=your_paymaster_url
VITE_COMETH_ENTRY_POINT_ADDRESS=your_entry_point_address
VITE_COMETH_SAFE_ADDRESS=your_safe_address
```

### 3. Data API URL Format

The Data API URL follows this format:
```
https://data.mongodb-api.com/app/[APP_ID]/endpoint/data/v1
```

Replace `[APP_ID]` with your actual App ID from Atlas.

### 4. Database Schema

The app uses two main collections:

#### Messages Collection
```javascript
{
  _id: ObjectId,
  conversationId: String,
  senderId: String,
  receiverId: String,
  content: String,
  messageType: "text" | "payment" | "payment_request",
  timestamp: Date,
  paymentData: {
    amount: Number,
    token: String,
    recipientAddress: String,
    transactionHash: String,
    status: String
  },
  moneyRequestData: {
    id: String,
    amount: Number,
    token: String,
    description: String,
    requesterId: String,
    requesterAddress: String,
    status: String,
    createdAt: Date
  },
  isRead: Boolean,
  isDelivered: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Conversations Collection
```javascript
{
  _id: ObjectId,
  participants: [String],
  lastMessage: ObjectId,
  lastMessageAt: Date,
  unreadCount: Object,
  createdAt: Date,
  updatedAt: Date
}
```

## Development Scripts

Since we removed the backend server, the development workflow is simplified:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Operations

The MongoDB service (`src/services/mongoService.ts`) handles all database operations:

- **sendMessage**: Store new messages
- **getMessages**: Retrieve messages for a conversation
- **getConversations**: Get user's conversations
- **findOrCreateConversation**: Create or find existing conversations
- **markMessageAsRead**: Mark messages as read
- **searchMessages**: Search through messages
- **healthCheck**: Verify API connectivity

## Security Considerations

- API keys are exposed in the frontend (this is expected with Data API)
- Set up appropriate IP whitelisting in Atlas if needed
- Configure API key permissions to limit access
- The Data API provides built-in security features

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your domain is whitelisted in Atlas Data API settings
2. **Authentication Errors**: Verify your API key is correct and has proper permissions
3. **Network Errors**: Check if your IP is whitelisted in Atlas Network Access

### Testing the Connection

You can test the MongoDB connection using the browser console:

```javascript
// Test MongoDB connection
await mongoService.healthCheck()
```

## Migration from Server Architecture

The previous architecture used:
- Express server on port 3001
- MongoDB Mongoose connection
- REST API endpoints

The new architecture uses:
- Direct frontend connection to MongoDB Atlas Data API
- No backend server required
- All database operations from the frontend

This change simplifies deployment and reduces infrastructure requirements while maintaining the same functionality. 