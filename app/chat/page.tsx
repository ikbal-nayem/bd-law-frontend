'use client';

import { supportedLaw } from '@/components/init-info';
import { MessageLoader } from '@/components/message-loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { actTypes } from '@/lib/types';
import { trackChatSession } from '@/lib/user-tracking-service';
import '@/styles/chat.css';
import { useChat } from '@ai-sdk/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Scale, Send, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatPage() {
	const [feedbackDialogOpen, setFeedbackDialogOpen] = React.useState(false);
	const [currentMessageId, setCurrentMessageId] = React.useState<string | null>(null);
	const [feedback, setFeedback] = React.useState('');
	const [suggestedAnswer, setSuggestedAnswer] = React.useState('');
	const sp = useSearchParams();

	const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
		streamProtocol: 'text',
		sendExtraMessageFields: true,
		body: { act: sp.get('act') },
	});
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { toast } = useToast();

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	useEffect(() => {
		trackChatSession().catch(console.error);
	}, []);

	const onFeedback = async (
		messageId: string,
		rating: 'good' | 'bad',
		feedback?: string,
		suggestedAnswer?: string
	) => {
		try {
			const { data } = await axios.post('/api/chat-feedback', {
				message_id: messageId,
				rating,
				...(feedback && { feedback }),
				...(suggestedAnswer && { suggested_answer: suggestedAnswer }),
			});
			toast({
				title: 'Feedback submitted',
				description: data?.message || 'Thank you for your feedback!',
				duration: 2000,
				variant: 'success',
			});
		} catch (error) {
			toast({
				title: 'Feedback failed',
				description: 'Failed to submit feedback. Please try again.',
				variant: 'destructive',
			});
		}
	};

	return (
		<>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='max-w-3xl mx-auto mt-2'>
				<Card className='border-emerald-200 shadow-lg rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm'>
					<CardContent className='p-4 h-[calc(100vh-150px)] overflow-y-auto custom-scrollbar'>
						{messages.length === 0 ? (
							<div className='h-full flex flex-col items-center justify-center text-center p-4'>
								<Scale className='h-20 w-20 text-emerald-200 mb-4' />
								<h3 className='text-xl font-medium text-gray-700 mb-2'>Ask about Bangladesh law</h3>
								<div className='flex gap-1'>
									{supportedLaw
										.filter((s) => s.actType === (sp.get('act') || actTypes.default))
										.map((law, index) => (
											<Badge key={index} className='border-emerald-200 w-max' variant='outline'>
												{law.name}
											</Badge>
										))}
								</div>
							</div>
						) : (
							<div className='space-y-4'>
								{messages.map((message, idx) => (
									<motion.div
										key={message.id}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3 }}
										className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
									>
										<div
											className={`message max-w-[85%] rounded-xl py-2 px-4 shadow-sm ${
												message.role === 'user'
													? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-br-none'
													: 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
											}`}
										>
											<Markdown remarkPlugins={[remarkGfm]}>{`${message.content}`}</Markdown>
										</div>
										{message.role === 'assistant' && (
											<div className='flex self-end gap-1 m-2 text-gray-500'>
												<ThumbsUp
													size={18}
													className='hover:text-gray-600 hover:cursor-pointer hover:scale-105'
													onClick={() => onFeedback(messages?.[idx - 1]?.id, 'good')}
												/>
												<ThumbsDown
													size={18}
													className='hover:text-gray-600 hover:cursor-pointer hover:scale-105'
													onClick={() => {
														setCurrentMessageId(messages?.[idx - 1]?.id || null);
														setFeedback('');
														setSuggestedAnswer('');
														setFeedbackDialogOpen(true);
													}}
												/>
											</div>
										)}
									</motion.div>
								))}
								{isLoading && <MessageLoader />}
								{error && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className='flex justify-center'
									>
										<div className='bg-red-100 text-red-700 rounded-lg p-3 max-w-[80%] border border-red-200 shadow-sm'>
											Error: {error?.message || 'Something went wrong. Please try again.'}
										</div>
									</motion.div>
								)}
								<div ref={messagesEndRef} />
							</div>
						)}
					</CardContent>
					<CardFooter className='p-3 border-t border-emerald-100 bg-white/70 backdrop-blur-sm'>
						<form onSubmit={handleSubmit} className='flex w-full items-center space-x-3'>
							<textarea
								value={input}
								onChange={handleInputChange}
								autoFocus
								placeholder='Ask about Bangladesh Law...'
								className='flex-grow border-2 border-emerald-200 rounded-xl px-4 py-2 transition duration-200 hover:shadow-sm bg-white/80 resize-none min-h-[40px] max-h-[60px] focus:outline-none focus:border-emerald-500'
								rows={1}
								onInput={(e) => {
									e.currentTarget.rows = 1;
									const rows = Math.min(Math.max(e.currentTarget.scrollHeight / 20, 1), 3);
									e.currentTarget.rows = rows;
								}}
							/>
							<Button
								type='submit'
								disabled={isLoading || !input.trim()}
								className='bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-full p-3 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none flex-shrink-0'
							>
								<Send className='h-5 w-5' />
							</Button>
						</form>
					</CardFooter>
				</Card>
			</motion.div>

			<Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Provide Feedback</DialogTitle>
						<DialogDescription>
							Help us improve by sharing what was wrong and how we could do better.
						</DialogDescription>
					</DialogHeader>

					<div className='grid gap-4 py-4'>
						<div className='grid gap-2'>
							<label htmlFor='feedback'>What was wrong with this response?</label>
							<Textarea
								id='feedback'
								value={feedback}
								onChange={(e) => setFeedback(e.target.value)}
								placeholder='Your feedback...'
							/>
						</div>

						<div className='grid gap-2'>
							<label htmlFor='suggested-answer'>How could we improve this answer?</label>
							<Textarea
								id='suggested-answer'
								value={suggestedAnswer}
								onChange={(e) => setSuggestedAnswer(e.target.value)}
								placeholder='Your suggested improvement...'
							/>
						</div>
					</div>

					<DialogFooter>
						<Button variant='outline' onClick={() => setFeedbackDialogOpen(false)}>
							Cancel
						</Button>
						<Button
							onClick={() => {
								if (currentMessageId) {
									onFeedback(currentMessageId, 'bad', feedback || undefined, suggestedAnswer || undefined);
								}
								setFeedbackDialogOpen(false);
							}}
						>
							Submit Feedback
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
