# World Chat - A True Human Super App

A secure and seamless WorldChain MiniApp that combines **human verification**, **decentralized messaging**, and **integrated payments** into one unified experience. Built with React, TypeScript, and Worldcoin MiniKit.

## 🌐 The Problem

Global communication is fragmented and insecure:

- 📩 **Spam & Scams**: Users are overwhelmed with unverified messages and fraudulent content
- 🔐 **Identity Crisis**: Lack of trust in identity verification during digital interactions  
- 🧱 **Platform Fragmentation**: Messaging and financial tools scattered across platforms, creating friction
- 💾 **Centralized Concerns**: Data storage raises privacy, control, and scalability issues

## ✨ The Solution

**World Chat** - A secure and seamless WorldChain MiniApp that:

- ✅ **Leverages World Verification** to ensure messages and transactions come from real, verified humans
- ✅ **Supports Global Messaging** (email/SMS) both inside and outside the platform (coming soon)
- ✅ **Stores All Data Efficiently** using Walrus decentralized storage
- ✅ **Combines Messaging + Payments** into one simple interface

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Walrus        │    │   Smart         │
│   (React App)   │◄──►│   Storage       │    │   Contract      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Worldcoin     │    │   Encrypted     │    │   On-chain      │
│   MiniKit       │    │   Messages      │    │   Metadata      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Key Features

### 🔐 Proof of Humanity
- **World Verification**: Ensures all users are real, unique, and verified
- **Spam Elimination**: Eliminates bots, spam, and scams at the root
- **Trusted Identity**: Every message and transaction comes from verified humans

### 💬 Decentralized Messaging
- **Walrus Storage**: Decentralized, scalable, and cost-efficient message storage
- **Encrypted Content**: All messages encrypted and stored securely
- **Censorship-resistant**: No central server required
- **Smart Contract Metadata**: Message history stored on-chain

### 💰 Integrated Payments
- **Messaging + Payments**: Combined into one seamless UX
- **WLD & USDC Support**: Send and receive Worldcoin tokens
- **Payment Requests**: Request money with accept/decline functionality
- **Real-time Transactions**: Instant payment processing

### 🌍 Global Communication
- **Cross-platform Messaging**: Works inside and outside the platform
- **Contact Integration**: Import contacts from World App
- **Universal Access**: Available to all verified humans worldwide

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: shadcn/ui components
- **Storage**: Walrus decentralized storage ✅
- **Blockchain**: WorldChain smart contracts (mainnet) ✅
- **Authentication**: Worldcoin MiniKit ✅
- **Payments**: Worldcoin payment system ✅
- **Human Verification**: World App integration ✅

## 📋 Prerequisites

- Node.js 18+ 
- World App installed on your device
- Worldcoin verification completed
- **Infura/Alchemy API key** (for smart contract reading)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chatterbox-local-scribe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file with your configuration
   cp .env.example .env
   # Add your API keys and contract addresses
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Smart Contract
The app uses a deployed smart contract on WorldChain mainnet:
- **Contract Address**: `0x34bF1A2460190e60e33309BF8c54D9A7c9eCB4B8` ✅
- **Network**: WorldChain mainnet (chainId 480) ✅
- **ABI**: Available in `src/abis/messagingContractAbi.ts` ✅
- **Status**: Deployed and fully integrated ✅

### Walrus Storage
- **Network**: Testnet ✅
- **Aggregator**: `https://aggregator.walrus-testnet.walrus.space` ✅
- **Publisher**: `https://publisher.walrus-testnet.walrus.space` ✅

## 📱 How to Use

### 1. **World App Verification**
- Open the app in your browser
- Click "Verify with World App"
- Complete verification in World App
- Return to the messaging interface

### 2. **Sending Messages**
- Select a conversation or create a new one
- Type your message and press Enter
- Message is stored in Walrus ✅
- Metadata stored in smart contract ✅

### 3. **Sending Payments**
- Click the payment button in a conversation
- Enter amount and select token (WLD/USDC)
- Confirm payment in World App
- Payment message is stored with transaction details

### 4. **Requesting Money**
- Click "Request Money" in a conversation
- Enter amount, token, and description
- Recipient can accept or decline the request
- If accepted, payment is automatically sent

## 🏗️ Architecture Details

### Message Flow
1. **User sends message** → Frontend creates message object ✅
2. **Walrus storage** → Encrypted message stored as blob ✅
3. **Smart contract** → Metadata stored on-chain ✅
4. **UI update** → Message appears in conversation ✅

### Message Retrieval
1. **Smart contract** → Query for message records (blob IDs) ✅
2. **Walrus storage** → Retrieve actual message content ✅
3. **Frontend** → Display messages in chronological order ✅

### Smart Contract Functions
- `storeMessage()` - Store message metadata ✅
- `getUserMessages()` - Get user's message history ✅
- `getConversationMessages()` - Get conversation messages ✅
- `getUserMessagesByType()` - Search by message type ✅

## 🧪 Testing

### Test Real Transactions Status
```typescript
import testRealTransactionsStatus from './src/utils/test-real-transactions';

// Test current status of real transactions
await testRealTransactionsStatus();
```

### Test Complete Integration
```typescript
import MessagingIntegrationExample from './src/utils/integrationExample';
const integration = new MessagingIntegrationExample();
await integration.testCompleteIntegration();
```

### Test Walrus Storage
```typescript
import testDecentralizedMessaging from './src/utils/testDecentralizedMessaging';
await testDecentralizedMessaging();
```

### Test Smart Contract Reading
```typescript
import testContractIntegration from './src/utils/testContractIntegration';
await testContractIntegration();
```

## 🚨 Important Notes

### Real Transactions
- **Status**: ✅ **Working (contract deployed on WorldChain mainnet)**
- **Contract**: `0x34bF1A2460190e60e33309BF8c54D9A7c9eCB4B8`
- **Chain**: WorldChain mainnet (480)
- **RPC**: `https://worldchain.drpc.org`

### Testing
- All tests will now show real transaction results
- Contract reading tests work (reading is functional)
- Contract writing tests work (writing is functional)
- MiniKit integration is fully operational

## 🔧 MiniKit Contract Registration

### Issue: "invalid_contract" Error

If you encounter the `invalid_contract` error from MiniKit, it means the smart contract is not registered with the MiniKit app. This is a common issue during development.

### Error Details
```
Error: invalid_contract
Description: Transaction contains unrecognized contract address
Contract: 0x34bF1A2460190e60e33309BF8c54D9A7c9eCB4B8
```

### Solution
1. **Register Contract**: Add your contract address to the Worldcoin Developer Portal
2. **Wait for Approval**: Worldcoin team will review and approve your contract
3. **Test Again**: Once approved, transactions will work normally

## 🌟 The Secret Sauce

**World Verification Integration**: Uses World's human verification to ensure all users are real, unique, and verified — eliminating spam, bots, and scams at the root.

**Decentralized Storage**: Integrates Walrus for decentralized, scalable, and cost-efficient message and data storage — solving traditional messaging storage constraints.

**Unified UX**: Combines messaging + payments into one seamless interface, eliminating the need for multiple apps and platforms.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Worldcoin** for human verification technology 
- **Walrus** for decentralized storage infrastructure
- **WorldChain** for the blockchain platform 
- **Cometh** for Safe wallet integration

---

**World Chat** - Where verified humans connect, communicate, and transact securely. 🌍💬💰
