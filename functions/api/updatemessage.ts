import { jsonResponse, reportError } from "./cfPagesFunctionsUtils"
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import { messages } from '../../src/db/schema'

type ENV = {
  DB: D1Database
}

interface UpdateMessageRequest {
  messageId: string
  paymentStatus?: 'pending' | 'success' | 'failed'
  requestStatus?: 'pending' | 'accepted' | 'declined' | 'paid'
}

export const onRequestOptions: PagesFunction<ENV> = async () => {
  return jsonResponse(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

export const onRequestPut: PagesFunction<ENV> = async (ctx) => {
  const db = drizzle(ctx.env.DB, { logger: true })

  try {
    const body = await ctx.request.json() as UpdateMessageRequest
    const { messageId, paymentStatus, requestStatus } = body

    if (!messageId) {
      return jsonResponse({ error: 'Message ID is required' }, 400)
    }

    // Build the update object dynamically
    const updateData: Partial<typeof messages.$inferInsert> = {}
    if (paymentStatus !== undefined) {
      updateData.paymentStatus = paymentStatus
    }
    if (requestStatus !== undefined) {
      updateData.requestStatus = requestStatus
    }

    if (Object.keys(updateData).length === 0) {
      return jsonResponse({ error: 'No status updates provided' }, 400)
    }

    // Update the message
    const result = await db
      .update(messages)
      .set(updateData)
      .where(eq(messages.id, messageId))
      .returning()

    if (result.length === 0) {
      return jsonResponse({ error: 'Message not found' }, 404)
    }

    return jsonResponse({
      success: true,
      message: result[0]
    }, 200)
  } catch (error) {
    await reportError(ctx.env.DB, error)
    return jsonResponse({ error: 'Internal server error' }, 500)
  }
} 