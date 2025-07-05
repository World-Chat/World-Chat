# MongoDB Integration Setup

This guide explains how to set up and use the MongoDB integration for the Chatterbox messaging system.

## Prerequisites

1. **MongoDB**: Install MongoDB locally or use a cloud service like MongoDB Atlas
2. **Node.js**: Ensure you have Node.js installed

## Setup Instructions

### 1. Create Environment File

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://ewanhamon:<db_password>@database.huyctpw.mongodb.net/chatterbox?retryWrites=true&w=majority&appName=Database

# Server Configuration
PORT=3001

# API Configuration
REACT_APP_API_URL=http://localhost:3001

# Development Settings
NODE_ENV=development
```

**Important**: Replace `<db_password>` with your actual MongoDB Atlas database password.

### 2. Install Dependencies

The required dependencies are already installed:
- `mongoose` - MongoDB object modeling
- `express` - Web framework for API
- `cors` - Enable cross-origin requests
- `dotenv` - Environment variable management
- `concurrently` - Run multiple commands simultaneously

### 3. Start the Application

Run both the backend API and frontend:

```bash
npm run start
```

Or run them separately:

```bash
# Terminal 1: Start the MongoDB API server
npm run server

# Terminal 2: Start the React frontend
npm run dev
```

## MongoDB Schema

### Messages Collection

```javascript
{
  _id: ObjectId,
  conversationId: String,
  senderId: String,
  receiverId: String,
  content: String,
  messageType: 'text' | 'payment' | 'payment_request',
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

### Conversations Collection

```javascript
{
  _id: ObjectId,
  participants: [String],
  lastMessage: ObjectId,
  lastMessageAt: Date,
  unreadCount: Map<String, Number>,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Messages
- `POST /api/messages` - Send a new message
- `GET /api/messages/:conversationId/:userId` - Get messages for a conversation
- `PUT /api/messages/:messageId/read` - Mark message as read
- `GET /api/search/:userId?query=...` - Search messages

### Conversations
- `GET /api/conversations/:userId` - Get user's conversations
- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/:conversationId/unread/:userId` - Get unread count

### Health Check
- `GET /health` - Check API status

## Features

### Message Types

1. **Text Messages**: Regular chat messages
2. **Payment Messages**: Record of sent payments with transaction details
3. **Payment Requests**: Requests for payment with amount and description

### Money Actions

The app supports 4 types of money actions:
1. **Send Money**: Send payment to another user
2. **Request Money**: Request payment from another user
3. **Recurring Payment**: Set up recurring payments
4. **Split Bill**: Split a bill among multiple people

### Sender/Receiver Views

Messages are stored with both sender and receiver information, allowing different views:
- **Sender View**: Shows "Sent X WLD to @user"
- **Receiver View**: Shows "Received X WLD from @user"

## Usage

### Switch to MongoDB Context

To use the MongoDB integration, update your app to use the new context:

```javascript
// In your main app file
import { MessagingProvider } from './contexts/MessagingContextMongo';

// Wrap your app with the MongoDB provider
<MessagingProvider>
  <App />
</MessagingProvider>
```

### Current User Management

The system uses mock users for now. To set a current user:

```javascript
const { setCurrentUser } = useMessaging();
setCurrentUser(MOCK_USERS[0]); // alice.eth
```

### Send Messages

```javascript
const { sendMessage } = useMessaging();
await sendMessage("Hello!", conversationId);
```

### Send Payments

```javascript
const { sendPayment } = useMessaging();
await sendPayment(50, 'WLD', conversationId);
```

### Request Money

```javascript
const { sendPaymentRequest } = useMessaging();
await sendPaymentRequest(25, 'WLD', 'Conference tickets', conversationId);
```

## Development

### Database Connection

The server connects to MongoDB on startup. Check console for connection status:
- ✅ Connected to MongoDB
- ❌ Failed to connect to MongoDB

### API Testing

Test the API endpoints using tools like:
- Postman
- curl
- Browser dev tools

Example curl command:
```bash
curl -X POST http://localhost:3001/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "test-conv",
    "senderId": "user1",
    "receiverId": "user2",
    "content": "Hello from MongoDB!",
    "messageType": "text"
  }'
```

## Troubleshooting

### Common Issues

1. **MongoDB Atlas Connection Failed**
   - Verify your database password is correct (replace `<db_password>` with actual password)
   - Check that your IP address is whitelisted in MongoDB Atlas
   - Ensure the database user has proper permissions
   - Verify network connectivity

2. **CORS Issues**
   - The server is configured with CORS enabled
   - Check that API_URL matches the server port

3. **Empty Conversations**
   - Create conversations manually or use the createConversation function
   - Ensure participants array includes valid user IDs

4. **Messages Not Loading**
   - Check browser console for API errors
   - Verify conversation ID exists
   - Ensure current user is set

### Logs

Check console logs for detailed information:
- Frontend: Browser dev tools console
- Backend: Terminal running the server

### Health Check

Visit `http://localhost:3001/health` to verify the API is running.

## Next Steps

1. **User Authentication**: Implement proper user authentication
2. **Real-time Updates**: Add WebSocket support for live messaging
3. **Message Encryption**: Implement end-to-end encryption
4. **File Attachments**: Support for images and files
5. **Push Notifications**: Real-time notifications for new messages 