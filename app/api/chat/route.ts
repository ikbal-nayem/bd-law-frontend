import Axios from 'axios';
import { NextResponse } from 'next/server';

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000/chat';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const supportsStreaming = process.env.FASTAPI_SUPPORTS_STREAMING === 'true';

		if (supportsStreaming) {
			// If your FastAPI endpoint supports streaming responses
			const response = await Axios.post(FASTAPI_URL, body, {
				headers: { 'Content-Type': 'application/json' },
				responseType: 'stream',
			});

			// Return the stream directly
			return new Response(response.data, {
				headers: {
					'Content-Type': 'text/event-stream',
					'Cache-Control': 'no-cache',
					Connection: 'keep-alive',
				},
			});
		} else {
			// If your FastAPI endpoint doesn't support streaming, we'll simulate it
			const response = await Axios.post(FASTAPI_URL, body);

			if (response.status !== 200) {
				throw new Error(`FastAPI responded with status: ${response.status}`);
			}

			// Create a simple stream that sends the entire response at once
			const stream = new ReadableStream({
				start(controller) {
					const encoder = new TextEncoder();
					controller.enqueue(
						encoder.encode(response?.data?.response || response?.data?.message)
					);
					controller.close();
				},
			});

			return new Response(stream, {
				headers: {
					'Content-Type': 'text/event-stream',
					'Cache-Control': 'no-cache',
					Connection: 'keep-alive',
				},
			});
		}
	} catch (error) {
		console.log('Error communicating with FastAPI:', error);
		return NextResponse.json({ error: 'Failed to communicate with chat API' }, { status: 500 });
	}
}
