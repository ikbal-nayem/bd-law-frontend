import { trackChatSession } from '@/lib/user-tracking-service';
import { motion } from 'framer-motion';
import { MoveRight, Scale } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const currentLaws = [
	{ name: 'The Constitution of the People‌‌‍’s Republic of Bangladesh', date: 'March 2025' },
	{ name: 'The Code of Criminal Procedure, 1898', date: 'May 2025' },
];

export default function InitInfo({ setShowIntro }: { setShowIntro: (show: boolean) => void }) {
	return (
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
					<h2 className='text-2xl font-bold text-center mb-4'>Welcome to Bangladesh Law AI Chatbot</h2>
					<p className='text-gray-600 mb-4 text-center'>
						Ask any question about law of Bangladesh and get accurate, helpful answers instantly.
					</p>
					<hr />
					<p className='text-gray-500 text-xs my-4 text-center'>
						The AI is trained based on the Bangladesh law official website content. The AI may make mistakes,
						so please verify important information.
					</p>
					<ul className='text-gray-500 text-sm list-disc list-inside mb-4'>
						{currentLaws.map((law, index) => (
							<li key={index}>
								{law.name} <sub>({law.date})</sub>
							</li>
						))}
					</ul>
					<div className='grid gap-3 mt-6'>
						<Button
							onClick={() => {
								setShowIntro(false);
								trackChatSession().catch(console.error);
							}}
							className='bg-green-600 hover:bg-green-700 text-white'
						>
							Start Chatting <MoveRight className='h-5 w-5 ml-2' />
						</Button>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
