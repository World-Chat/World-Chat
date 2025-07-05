# Database Setup Guide

This guide provides the commands to set up the database tables for both local development and production environments.

## Prerequisites

1. Ensure you have [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) installed
2. Ensure you're authenticated with Cloudflare (`wrangler auth login`)

## Database Setup Commands

### 1. Create D1 Databases

#### Local Development Database
```bash
# Create local development database
wrangler d1 create chatterbox-local-scribe

# Note: Copy the database_id from the output and update wrangler.toml
```

#### Production Database
```bash
# Create production database
wrangler d1 create chatterbox-local-scribe-production

# Note: Copy the database_id from the output and update wrangler.toml
```

#### Preview Database
```bash
# Create preview database
wrangler d1 create chatterbox-local-scribe-preview

# Note: Copy the database_id from the output and update wrangler.toml
```

### 2. Update wrangler.toml

After creating the databases, update your `wrangler.toml` file with the actual database IDs:

```toml
[[d1_databases]]
binding = "DB"
database_name = "chatterbox-local-scribe"
database_id = "your-actual-database-id-here"

[env.production]
[[env.production.d1_databases]]
binding = "DB"
database_name = "chatterbox-local-scribe-production"
database_id = "your-actual-production-database-id-here"

[env.preview]
[[env.preview.d1_databases]]
binding = "DB"
database_name = "chatterbox-local-scribe-preview"
database_id = "your-actual-preview-database-id-here"
```

### 3. Run Database Migrations

#### Local Development
```bash
# Execute migration on local database
wrangler d1 execute chatterbox-local-scribe --local --file=./migrations/0001_initial.sql
```

#### Production
```bash
# Execute migration on production database
wrangler d1 execute chatterbox-local-scribe-production --file=./migrations/0001_initial.sql
```

#### Preview
```bash
# Execute migration on preview database
wrangler d1 execute chatterbox-local-scribe-preview --file=./migrations/0001_initial.sql
```

### 4. Alternative: Using Drizzle Kit (Recommended)

If you prefer using Drizzle Kit for migrations:

```bash
# Generate migration files
npx drizzle-kit generate:sqlite

# Apply migrations to local database
wrangler d1 execute chatterbox-local-scribe --local --file=./migrations/[generated-migration-file].sql

# Apply migrations to production database
wrangler d1 execute chatterbox-local-scribe-production --file=./migrations/[generated-migration-file].sql
```

## Database Schema

### Conversations Table
- `id` (TEXT, Primary Key): Unique conversation identifier
- `users` (TEXT): JSON string containing array of user IDs
- `created_at` (TEXT): ISO timestamp when conversation was created
- `updated_at` (TEXT): ISO timestamp when conversation was last updated

### Messages Table
- `id` (TEXT, Primary Key): Unique message identifier
- `type` (TEXT): Message type (`text`, `send_payment`, `request_payment`)
- `conversation_id` (TEXT): Foreign key to conversations table
- `sender` (TEXT): User ID of the message sender
- `content` (TEXT, Optional): Message content for text messages
- `amount` (TEXT, Optional): Payment amount for payment messages
- `currency` (TEXT, Optional): Currency code for payment messages
- `timestamp` (TEXT): ISO timestamp when message was sent
- `created_at` (TEXT): ISO timestamp when message was created

## API Endpoints

The following API endpoints are available:

### Conversations
- `POST /api/postconversation` - Create a new conversation
- `GET /api/getconversations?userId={userId}` - Get conversations for a user

### Messages
- `POST /api/postmessage` - Send a new message
- `GET /api/getmessages?conversationId={conversationId}&limit={limit}&offset={offset}` - Get messages for a conversation

## Testing the Setup

You can test your database setup by running:

```bash
# Test local database
wrangler d1 execute chatterbox-local-scribe --local --command="SELECT name FROM sqlite_master WHERE type='table';"

# Test production database
wrangler d1 execute chatterbox-local-scribe-production --command="SELECT name FROM sqlite_master WHERE type='table';"
```

This should return the `conversations` and `messages` tables if everything is set up correctly.

## Development Workflow

1. **Local Development**: Use `--local` flag with wrangler commands
2. **Testing**: Deploy to preview environment first
3. **Production**: Deploy to production environment after thorough testing

## Environment Variables

For production deployment, you may need to set these environment variables:

```bash
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_D1_DATABASE_ID=your-database-id
CLOUDFLARE_API_TOKEN=your-api-token
``` 