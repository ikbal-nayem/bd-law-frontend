import { NextResponse } from 'next/server';
import Axios from 'axios';

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000/chat';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const supportsStreaming = process.env.FASTAPI_SUPPORTS_STREAMING === 'true';

    console.log("[supportsStreaming]",supportsStreaming)

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
      console.log("Calling FastAPI without streaming")
			// If your FastAPI endpoint doesn't support streaming, we'll simulate it
			const response = await Axios.post(FASTAPI_URL, body, {
				headers: { 'Content-Type': 'application/json' },
			});

			console.log('[Response]: ', response);

			if (response.status !== 200) {
				throw new Error(`FastAPI responded with status: ${response.status}`);
			}

			const data = response.data;

			console.log('[MESSAGE]: ', data);

			// Create a simple stream that sends the entire response at once
			const stream = new ReadableStream({
				start(controller) {
					const encoder = new TextEncoder();
					controller.enqueue(encoder.encode(data?.response || data?.message || data?.content));
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
