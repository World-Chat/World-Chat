import { jsonResponse, reportError } from "./cfPagesFunctionsUtils"
import { drizzle } from "drizzle-orm/d1"
import { conversations } from "../../src/db/schema"

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
      users: string[]
    }

    if (!request.users || !Array.isArray(request.users) || request.users.length === 0) {
      return jsonResponse({ error: "Users array is required" }, 400)
    }

    const conversationId = crypto.randomUUID()
    const now = new Date().toISOString()

    const newConversation = {
      id: conversationId,
      users: JSON.stringify(request.users),
      createdAt: now,
      updatedAt: now,
    }

    await db.insert(conversations).values(newConversation)

    return jsonResponse({ 
      id: conversationId,
      users: request.users,
      createdAt: now,
      updatedAt: now,
    }, 201)
  } catch (e) {
    await reportError(ctx.env.DB, e)
    return jsonResponse({ error: "Failed to create conversation" }, 500)
  }
} 