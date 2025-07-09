import InitInfo from '@/components/init-info';
import { AnimatePresence } from 'framer-motion';

export default function ChatPage() {
	return (
		<div className='flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50'>
			<main className='flex-1 container mx-auto px-4 py-3'>
				<AnimatePresence>
					<InitInfo />
				</AnimatePresence>
			</main>

			{/* Footer */}
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
		</div>
	);
}
