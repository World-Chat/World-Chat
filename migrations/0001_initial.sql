-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    users TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    conversation_id TEXT NOT NULL,
    sender TEXT NOT NULL,
    content TEXT,
    amount TEXT,
    currency TEXT,
    timestamp TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_users ON conversations(users);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender); 