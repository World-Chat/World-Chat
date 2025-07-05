# Development Guide

This guide explains the different ways to run your Cloudflare Pages + Functions development environment.

## 🚀 Development Options

### Option 1: Single Command (Recommended)
Run both frontend and backend simultaneously:
```bash
npm run dev:full
```
This runs:
- Frontend: `http://localhost:5173` (Vite dev server)
- Backend: `http://localhost:8787` (Cloudflare Pages with Functions)

### Option 2: Separate Terminals (Your Suggestion)
**Terminal 1** - Frontend development:
```bash
npm run dev
```

**Terminal 2** - Backend with latest build:
```bash
npm run pages:build
```

### Option 3: Manual Two-Terminal Setup
**Terminal 1** - Frontend:
```bash
npm run dev
```

**Terminal 2** - Backend proxy:
```bash
npm run pages:dev
```

### Option 4: Build & Serve Static
**Terminal 1** - Build and watch:
```bash
npm run build
# Or for development mode:
npm run build:dev
```

**Terminal 2** - Serve built files:
```bash
wrangler pages dev dist
```

## 📡 Endpoints

### Frontend (Vite Dev Server)
- **URL**: `http://localhost:5173`
- **Features**: Hot reload, fast refresh, development tools

### Backend (Cloudflare Pages Functions)
- **URL**: `http://localhost:8788`
- **API Endpoints**:
  - `POST /api/postconversation` - Create new conversation
  - `GET /api/getconversations?userId={userId}` - Get user's conversations
  - `POST /api/postmessage` - Send new message (text/payment)
  - `GET /api/getmessages?conversationId={id}` - Get conversation messages

## 🔄 API Integration Status

✅ **Fully Integrated**:
- **Conversations**: Created and loaded from D1 database
- **Messages**: Sent and loaded from D1 database  
- **CORS**: Properly configured for development
- **Fallbacks**: Graceful fallback to mock data if API fails

## 🗄️ Database Commands

### Setup Database
```bash
# Create database
npm run db:create

# Run migrations locally
npm run db:migrate

# Run migrations in production
npm run db:migrate:prod
```

### Manual Database Commands
```bash
# Create database
wrangler d1 create chatterbox-local-scribe

# Execute migrations
wrangler d1 execute chatterbox-local-scribe --local --file=./migrations/0001_initial.sql

# Test database
wrangler d1 execute chatterbox-local-scribe --local --command="SELECT name FROM sqlite_master WHERE type='table';"
```

## 🔧 Development Workflow

### For Frontend Development
If you're mainly working on UI/UX:
```bash
npm run dev
```
- Fast hot reload
- No need for backend if using mock data

### For Full-Stack Development
If you're working on both frontend and backend:
```bash
npm run dev:full
```
- Frontend at `localhost:5173`
- Backend at `localhost:8787`
- API calls work correctly

### For Backend/API Development
If you're mainly working on Functions:
```bash
npm run pages:build
```
- Builds frontend once
- Serves with Cloudflare Pages runtime
- Focus on API development

## 🌐 Environment Variables

Create a `.env` file for local development:
```env
# Frontend
VITE_API_BASE_URL=http://localhost:8788/api

# Backend (if needed)
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
```

## 🎯 Which Option to Choose?

- **New to the project**: Use `npm run dev:full`
- **Frontend focus**: Use `npm run dev`
- **Backend focus**: Use `npm run pages:build`
- **Testing production build**: Use Option 4
- **Your preference**: Use Option 2 (separate terminals)

## 📝 Notes

- The proxy setup (`pages:dev`) forwards frontend requests to Vite dev server
- The build setup (`pages:build`) serves the built static files
- Both approaches work with Cloudflare Pages Functions
- Database operations require the backend to be running (`localhost:8787`)

## 🐛 Troubleshooting

**Port conflicts**: Change ports in commands:
```bash
# Change frontend port
npm run dev -- --port 3000

# Change backend port
wrangler pages dev --proxy 3000 --port 8080
```

**Database not found**: Make sure to run database setup first:
```bash
npm run db:create
npm run db:migrate
```

**API calls failing**: Check that backend is running on `localhost:8788` 