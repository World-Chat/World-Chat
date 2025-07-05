import { jsonResponse, reportError } from "./cfPagesFunctionsUtils"
import { drizzle } from "drizzle-orm/d1"
import { conversations } from "../../src/db/schema"
import { like } from "drizzle-orm"

type ENV = {
  DB: D1Database
}

export const onRequestGet: PagesFunction<ENV> = async (ctx) => {
  const db = drizzle(ctx.env.DB, { logger: true })
  try {
    const url = new URL(ctx.request.url)
    const userId = url.searchParams.get('userId')

    if (!userId) {
      return jsonResponse({ error: "userId parameter is required" }, 400)
    }

    // Get conversations where the user is in the users array
    // Handle both normal JSON and double-encoded JSON formats
    const userConversations = await db
      .select()
      .from(conversations)
      .where(like(conversations.users, `%""${userId}""%`))
      .orderBy(conversations.updatedAt)

    // Parse the users JSON string back to array for each conversation
    // Handle both normal JSON and double-encoded JSON formats
    const parsedConversations = userConversations.map(conv => {
      let users;
      try {
        // Try parsing as normal JSON first
        users = JSON.parse(conv.users);
        // If it's a string (double-encoded), parse it again
        if (typeof users === 'string') {
          users = JSON.parse(users);
        }
      } catch (error) {
        console.error('Failed to parse users JSON:', conv.users, error);
        users = [];
      }
      return {
        ...conv,
        users
      };
    })

    return jsonResponse({ conversations: parsedConversations }, 200)
  } catch (e) {
    await reportError(ctx.env.DB, e)
    return jsonResponse({ error: "Failed to get conversations" }, 500)
  }
} 