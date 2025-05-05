import './globals.css';

import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono } from 'next/font/google';

import { DottedBackground } from '@/components/eagle/dotted';
import { ReactScan } from '@/components/eagle/react-scan';
import { Toaster } from '@/components/eagle/toast';
import { Navbar } from '@/components/navbar';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});
const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'prodbyeagle/color',
	description:
		'Blazing-fast, dependency-free TypeScript lib to extract dominant colors from images in RGB, HEX, HSL, and OKLCH formats.',
	openGraph: {
		title: 'prodbyeagle/color',
		description:
			'Extract, format & use colors from images on the front end with @prodbyeagle/color.',
		url: 'https://github.com/prodbyeagle/color',
		siteName: 'prodbyeagle/color',
	},
	icons: 'https://kappa.lol/WTiY5',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground min-h-screen`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem>
					<div className='relative flex flex-col min-h-screen'>
						<Navbar />

						<main className='flex-1 flex items-start justify-center px-4 pb-20 pt-10'>
							{children}
						</main>

						<DottedBackground
							dotColor='var(--ring)'
							spacing={16}
							dotSize={1}
						/>
					</div>
					<Toaster />
				</ThemeProvider>
				<ReactScan />
			</body>
		</html>
	);
}
