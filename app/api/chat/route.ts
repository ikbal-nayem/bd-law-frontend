import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"), // Using GPT-4o for best results
    system: `You are an expert assistant on the Constitution of Bangladesh. 
    Provide accurate, helpful, and educational information about the Bangladesh Constitution, 
    its articles, amendments, history, and interpretation. 
    Keep responses concise, factual, and educational.
    If asked about something outside the scope of Bangladesh constitutional law, 
    politely redirect the conversation back to the topic.`,
    messages,
  })

  return result.toDataStreamResponse()
}

