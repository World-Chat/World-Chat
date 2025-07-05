import { jsonResponse, reportError } from "./cfPagesFunctionsUtils"

type ENV = {
  DB: D1Database
}

interface PaymentPayload {
  reference: string;
  transaction_id: string;
  status: string;
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
    const { payload } = await ctx.request.json() as { payload: PaymentPayload }

    // TODO: Here we should fetch the reference you created in /initiate-payment to ensure 
    // the transaction we are verifying is the same one we initiated
    
    // For now, we'll optimistically confirm the transaction
    // In production, you should verify with the Developer Portal API:
    // https://developer.worldcoin.org/api/v2/minikit/transaction/${payload.transaction_id}?app_id=${APP_ID}
    
    if (payload.reference && payload.status !== 'failed') {
      return jsonResponse({ 
        success: true,
        reference: payload.reference,
        transaction_id: payload.transaction_id
      }, 200)
    } else {
      return jsonResponse({ 
        success: false,
        error: "Payment failed or invalid reference"
      }, 400)
    }
  } catch (e) {
    await reportError(ctx.env.DB, e)
    return jsonResponse({ error: "Failed to confirm payment" }, 500)
  }
} 