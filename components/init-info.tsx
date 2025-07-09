'use client';

import { motion } from 'framer-motion';
import { MoveRight, Scale } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { actTypes } from '@/lib/types';

export const supportedLaw = [
	{ name: 'The Constitution of the People‌‌‍’s Republic of Bangladesh', date: 'March 2025', actType: actTypes.default },
	{ name: 'The Code of Criminal Procedure, 1898', date: 'May 2025', actType: actTypes.default },
	{ name: 'The Penal Code, 1860', date: 'May 2025', actType: actTypes.default },
	{ name: 'The State Acquisition and Tenancy Act, 1950', date: 'July 2025', actType: actTypes.land },
	{ name: 'The Registration Act, 1908', date: 'July 2025', actType: actTypes.land },
	{ name: 'The Transfer of Property Act, 1882', date: 'July 2025', actType: actTypes.land },
];

export default function InitInfo() {
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
						{supportedLaw.map((law, index) => (
							<li key={index}>
								{law.name} <sub>({law.date})</sub>
							</li>
						))}
					</ul>
				</CardContent>
				<CardFooter>
					<Link href='/chat' className='w-full'>
						<Button className='bg-green-600 hover:bg-green-700 text-white w-full'>
							Start Chatting <MoveRight className='h-5 w-5 ml-2' />
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</motion.div>
	);
}
