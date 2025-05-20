import { ThemeProvider } from '@/components/theme-provider';
import '@/styles/globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Bangladesh Constitution Assistant',
	description: 'Get answers about the Constitution of Bangladesh',
	generator: 'By Ikbal Nayem',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider attribute='class' defaultTheme='light'>
					{children}
				</ThemeProvider>
				<Script type='module' src='https://md-block.verou.me/md-block.js' strategy='lazyOnload' />
			</body>
			<GoogleAnalytics gaId={process.env.GA_TRACKING_ID || ''} />
		</html>
	);
}

import './globals.css';
