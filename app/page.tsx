'use client';

import { MessageLoader } from '@/components/message-loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { trackChatSession } from '@/lib/user-tracking-service';
import '@/styles/chat.css';
import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import { MoveRight, Scale, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatPage() {
	const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
		streamProtocol: 'text',
	});
	const [showIntro, setShowIntro] = useState(messages.length === 0);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Scroll to bottom when messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	// useEffect(() => {
	// 	if (location.hostname !== 'bd-law-ai.vercel.app') window.location.href = 'https://bd-law-ai.vercel.app';
	// }, []);

	return (
		// Fancier background gradient
		<div className='flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50'>
			{/* Slightly enhanced header */}
			<header className='sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm'>
				<div className='container mx-auto px-4 py-3 flex items-center'>
					<div className='flex items-center gap-2'>
						<Scale className='h-6 w-6 text-emerald-600' />
						<h1 className='text-xl font-semibold text-emerald-800'>Bangladesh Law AI</h1>
					</div>
				</div>
			</header>

			<main className='flex-1 container mx-auto px-4 py-3'>
				<AnimatePresence>
					{showIntro ? (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
							className='max-w-3xl mx-auto'
						>
							<Card className='border-green-200 shadow-lg'>
								<CardContent className='pt-6'>
									<div className='flex justify-center mb-6'>
										<div className='w-24 h-24 rounded-full bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center'>
											<Scale className='h-12 w-12 text-white' />
										</div>
									</div>
									<h2 className='text-2xl font-bold text-center mb-4'>
										Welcome to Bangladesh Law AI Chatbot
									</h2>
									<p className='text-gray-600 mb-4 text-center'>
										Ask any question about laws of Bangladesh and get accurate, helpful answers instantly.
									</p>
									<hr />
									<p className='text-gray-500 text-xs my-4 text-center'>
										The AI is trained based on the Bangladesh law official website content at March 2025. The
										AI may make mistakes, so please verify important information.
									</p>
									<div className='grid gap-3 mt-6'>
										<Button
											onClick={() => {
												setShowIntro(false);
												trackChatSession().catch(console.error);
											}}
											className='bg-green-600 hover:bg-green-700 text-white'
										>
											Start Chatting <MoveRight className='h-5 w-5 ml-2' /> {/* Adjusted icon size/margin */}
										</Button>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					) : (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='max-w-3xl mx-auto'>
							<Card className='border-emerald-200 shadow-lg rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm'>
								<CardContent className='p-4 h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar'>
									{messages.length === 0 ? (
										<div className='h-full flex flex-col items-center justify-center text-center p-4'>
											<Scale className='h-20 w-20 text-emerald-200 mb-4' />
											<h3 className='text-xl font-medium text-gray-700 mb-2'>Ask about Bangladesh Law</h3>
											<p className='text-gray-500 max-w-md'>
												Ask questions about rights, amendments, articles, or any aspect of the Bangladesh law.
											</p>
										</div>
									) : (
										<div className='space-y-4'>
											{messages.map((message) => (
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
																? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-br-sm'
																: 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
														}`}
													>
														<Markdown remarkPlugins={[remarkGfm]}>{`${message.content}`}</Markdown>
													</div>
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
										<Input
											value={input}
											onChange={handleInputChange}
											autoFocus
											placeholder='Ask about Bangladesh Law...'
											className='flex-grow border-emerald-300 rounded-full px-4 py-2 focus-visible:ring-0 focus-visible:ring-offset-0 transition duration-200 shadow-sm bg-white/80'
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
					)}
				</AnimatePresence>
			</main>

			{/* Footer */}
			{showIntro && (
				<footer className='border-t border-emerald-100 py-2 text-center text-sm text-gray-500'>
					<div className='container mx-auto px-4'>
						© {new Date().getFullYear()} Bangladesh Law AI
						<p className='text-xs text-gray-400'>
							Developed by{' '}
							<a
								href='https://www.linkedin.com/in/ikbal-nayem/'
								target='_blank'
								rel='noopener noreferrer'
								className='text-emerald-600 hover:underline'
							>
								Ikbal Nayem
							</a>
						</p>
					</div>
				</footer>
			)}
		</div>
	);
}
