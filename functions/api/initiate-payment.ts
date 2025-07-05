import { jsonResponse, reportError } from "./cfPagesFunctionsUtils"

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
  try {
    // Generate a unique reference ID for the payment
    const uuid = crypto.randomUUID().replace(/-/g, '')

    // TODO: Store the ID field in your database so you can verify the payment later
    // For now, we'll just return the ID
    
    return jsonResponse({ 
      id: uuid,
      timestamp: new Date().toISOString()
    }, 201)
  } catch (e) {
    await reportError(ctx.env.DB, e)
    return jsonResponse({ error: "Failed to initiate payment" }, 500)
  }
} 