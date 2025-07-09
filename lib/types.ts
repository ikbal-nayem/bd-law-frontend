// Define types for your FastAPI responses
export interface ChatMessage {
	role: 'user' | 'assistant' | 'system';
	content: string;
	id?: string;
}

export interface ChatRequest {
	messages: ChatMessage[];
	max_tokens?: number;
	temperature?: number;
}

export interface ChatResponse {
	response?: string;
	message?: string;
	content?: string;
}

export const actTypes = {
	default: 'DEFAULT',
  land: 'LAND',
};
