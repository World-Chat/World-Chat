import { jsonResponse, reportError } from "./cfPagesFunctionsUtils"
import { drizzle } from "drizzle-orm/d1"
import { messages } from "../../src/db/schema"
import { eq, desc } from "drizzle-orm"

type ENV = {
  DB: D1Database
}

export const onRequestGet: PagesFunction<ENV> = async (ctx) => {
  const db = drizzle(ctx.env.DB, { logger: true })
  try {
    const url = new URL(ctx.request.url)
    const conversationId = url.searchParams.get('conversationId')
    const limit = url.searchParams.get('limit')
    const offset = url.searchParams.get('offset')

    if (!conversationId) {
      return jsonResponse({ error: "conversationId parameter is required" }, 400)
    }

    // Build query based on parameters
    const limitNum = limit ? parseInt(limit, 10) : undefined
    const offsetNum = offset ? parseInt(offset, 10) : undefined

    let conversationMessages;
    
    if (limitNum && limitNum > 0 && offsetNum && offsetNum > 0) {
      conversationMessages = await db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, conversationId))
        .orderBy(desc(messages.timestamp))
        .limit(limitNum)
        .offset(offsetNum)
    } else if (limitNum && limitNum > 0) {
      conversationMessages = await db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, conversationId))
        .orderBy(desc(messages.timestamp))
        .limit(limitNum)
    } else {
      conversationMessages = await db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, conversationId))
        .orderBy(desc(messages.timestamp))
    }

    return jsonResponse({ 
      messages: conversationMessages,
      count: conversationMessages.length 
    }, 200)
  } catch (e) {
    await reportError(ctx.env.DB, e)
    return jsonResponse({ error: "Failed to get messages" }, 500)
  }
} 