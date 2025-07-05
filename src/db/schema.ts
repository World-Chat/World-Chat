import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const conversations = sqliteTable('conversations', {
  id: text('id').primaryKey(),
  users: text('users').notNull(), // JSON string of user array
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  type: text('type').notNull(), // 'text', 'send_payment', 'request_payment'
  conversationId: text('conversation_id')
    .notNull()
    .references(() => conversations.id, { onDelete: 'cascade' }),
  sender: text('sender').notNull(),
  content: text('content'), // Message content for text messages
  amount: text('amount'), // Payment amount for payment messages
  currency: text('currency'), // Currency for payment messages
  timestamp: text('timestamp').notNull(),
  createdAt: text('created_at').notNull(),
})

export type Conversation = typeof conversations.$inferSelect
export type NewConversation = typeof conversations.$inferInsert
export type Message = typeof messages.$inferSelect
export type NewMessage = typeof messages.$inferInsert 