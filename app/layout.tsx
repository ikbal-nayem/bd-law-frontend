import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Bangladesh Law AI',
	description: 'Get answers about the law of Bangladesh',
	generator: 'By Ikbal Nayem',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider attribute='class' defaultTheme='light'>
					<header className='sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm'>
						<div className='container mx-auto px-4 py-3 flex items-center'>
							<div className='flex items-center gap-2'>
								<Scale className='h-6 w-6 text-emerald-600' />
								<h1 className='text-xl font-semibold text-emerald-800'>Bangladesh Law AI</h1>
							</div>
						</div>
					</header>
					{children}
					<Toaster />
				</ThemeProvider>
				<Script type='module' src='https://md-block.verou.me/md-block.js' strategy='lazyOnload' />
			</body>
			<GoogleAnalytics gaId={process.env.GA_TRACKING_ID || ''} />
		</html>
	);
}

import './globals.css';import { Scale } from 'lucide-react';

