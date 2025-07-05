import { onRequestGet as __api_getconversations_ts_onRequestGet } from "/Users/ewanhamon/Documents/Code/chatterbox-local-scribe/functions/api/getconversations.ts"
import { onRequestGet as __api_getmessages_ts_onRequestGet } from "/Users/ewanhamon/Documents/Code/chatterbox-local-scribe/functions/api/getmessages.ts"
import { onRequestOptions as __api_postconversation_ts_onRequestOptions } from "/Users/ewanhamon/Documents/Code/chatterbox-local-scribe/functions/api/postconversation.ts"
import { onRequestPost as __api_postconversation_ts_onRequestPost } from "/Users/ewanhamon/Documents/Code/chatterbox-local-scribe/functions/api/postconversation.ts"
import { onRequestOptions as __api_postmessage_ts_onRequestOptions } from "/Users/ewanhamon/Documents/Code/chatterbox-local-scribe/functions/api/postmessage.ts"
import { onRequestPost as __api_postmessage_ts_onRequestPost } from "/Users/ewanhamon/Documents/Code/chatterbox-local-scribe/functions/api/postmessage.ts"

export const routes = [
    {
      routePath: "/api/getconversations",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_getconversations_ts_onRequestGet],
    },
  {
      routePath: "/api/getmessages",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_getmessages_ts_onRequestGet],
    },
  {
      routePath: "/api/postconversation",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_postconversation_ts_onRequestOptions],
    },
  {
      routePath: "/api/postconversation",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_postconversation_ts_onRequestPost],
    },
  {
      routePath: "/api/postmessage",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_postmessage_ts_onRequestOptions],
    },
  {
      routePath: "/api/postmessage",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_postmessage_ts_onRequestPost],
    },
  ]