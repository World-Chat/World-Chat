import { jsonResponse, reportError } from "./cfPagesFunctionsUtils"
import { drizzle } from "drizzle-orm/d1"
import { messages } from "../../src/db/schema"

type ENV = {
  DB: D1Database
}

export const onRequestOptions: PagesFunction<ENV> = async () => {
  return jsonResponse(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

export const onRequestPost: PagesFunction<ENV> = async (ctx) => {
  const db = drizzle(ctx.env.DB, { logger: true })
  try {
    const request = await ctx.request.json() as {
      type: 'text' | 'send_payment' | 'request_payment'
      conversationId: string
      sender: string
      content?: string
      amount?: string
      currency?: string
    }

    if (!request.type || !request.conversationId || !request.sender) {
      return jsonResponse({ error: "type, conversationId, and sender are required" }, 400)
    }

    // Validate message type
    if (!['text', 'send_payment', 'request_payment'].includes(request.type)) {
      return jsonResponse({ error: "type must be text, send_payment, or request_payment" }, 400)
    }

    // Validate payment messages have amount and currency
    if ((request.type === 'send_payment' || request.type === 'request_payment') && 
        (!request.amount || !request.currency)) {
      return jsonResponse({ error: "amount and currency are required for payment messages" }, 400)
    }

    const messageId = crypto.randomUUID()
    const now = new Date().toISOString()

    const newMessage = {
      id: messageId,
      type: request.type,
      conversationId: request.conversationId,
      sender: request.sender,
      content: request.content || null,
      amount: request.amount || null,
      currency: request.currency || null,
      timestamp: now,
      createdAt: now,
    }

    await db.insert(messages).values(newMessage)

    return jsonResponse({ 
      id: messageId,
      type: request.type,
      conversationId: request.conversationId,
      sender: request.sender,
      content: request.content,
      amount: request.amount,
      currency: request.currency,
      timestamp: now,
    }, 201)
  } catch (e) {
    await reportError(ctx.env.DB, e)
    return jsonResponse({ error: "Failed to create message" }, 500)
  }
} 