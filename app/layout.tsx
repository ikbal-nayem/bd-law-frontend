import Header from '@/components/header';
import NextNProgressBar from '@/components/progress-bar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import React, { Suspense } from 'react';

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
				<Suspense>
					<NextNProgressBar />
				</Suspense>
				<ThemeProvider attribute='class' defaultTheme='light'>
					<header className='sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm'>
						<Suspense>
							<Header />
						</Suspense>
					</header>
					<Suspense>{children}</Suspense>
					<Toaster />
				</ThemeProvider>
				<Script type='module' src='https://md-block.verou.me/md-block.js' strategy='lazyOnload' />
			</body>
			<GoogleAnalytics gaId={process.env.GA_TRACKING_ID || ''} />
		</html>
	);
}
