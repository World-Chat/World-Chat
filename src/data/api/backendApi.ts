

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8788/api'
const POST_CONVERSATION_API = API_BASE_URL + "/postconversation"
const GET_CONVERSATION_API = API_BASE_URL + "/getconversations"
const POST_MESSAGE_API = API_BASE_URL + "/postmessage"
const GET_MESSAGES_API = API_BASE_URL + "/getmessages"
const INITIATE_PAYMENT_API = API_BASE_URL + "/initiate-payment"
const CONFIRM_PAYMENT_API = API_BASE_URL + "/confirm-payment"

// API Functions
const postConversation = async (users: string[]) => {
  const body = JSON.stringify({ users });
  console.log('🔗 POST Conversation URL:', POST_CONVERSATION_API);
  console.log('📤 Request body:', body);
  
  const response = await fetch(POST_CONVERSATION_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  
  console.log('📡 Response status:', response.status);
  console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Response error:', errorText);
    throw new Error(`Failed to create conversation: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  console.log('📦 Response data:', data);
  
  return data;
}

const getConversations = async (userId: string) => {
  const url = `${GET_CONVERSATION_API}?userId=${encodeURIComponent(userId)}`;
  console.log('🔗 GET Conversations URL:', url);
  
  const response = await fetch(url);
  
  console.log('📡 Response status:', response.status);
  console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Response error:', errorText);
    throw new Error(`Failed to get conversations: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  console.log('📦 Response data:', data);
  
  return data;
}

const postMessage = async (messageData: {
  type: 'text' | 'send_payment' | 'request_payment'
  conversationId: string
  sender: string
  content?: string
  amount?: string
  currency?: string
}) => {
  const response = await fetch(POST_MESSAGE_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageData),
  })
  
  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.statusText}`)
  }
  
  return response.json()
}

const getMessages = async (conversationId: string, limit?: number, offset?: number) => {
  const params = new URLSearchParams({
    conversationId,
    ...(limit && { limit: limit.toString() }),
    ...(offset && { offset: offset.toString() }),
  })
  
  const response = await fetch(`${GET_MESSAGES_API}?${params}`)
  
  if (!response.ok) {
    throw new Error(`Failed to get messages: ${response.statusText}`)
  }
  
  return response.json()
}

export const backendApi = {
  postConversation,
  getConversations,
  postMessage,
  getMessages,
}
