// Define types for your FastAPI responses
export interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
  id?: string
}

export interface ChatRequest {
  messages: ChatMessage[]
  // Add any other parameters your FastAPI expects
  max_tokens?: number
  temperature?: number
}

export interface ChatResponse {
  response?: string
  message?: string
  content?: string
  // Add any other fields your FastAPI returns
}
