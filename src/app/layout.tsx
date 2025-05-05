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
	title: {
		default: '@prodbyeagle/color – Extract colors from images',
		template: '%s | @prodbyeagle/color',
	},
	description:
		'Lightning-fast, dependency-free TypeScript library for extracting dominant colors from images in RGB, HEX, HSL, and OKLCH formats. Ideal for frontend developers and creative tools.',
	keywords: [
		'color extraction',
		'image color analysis',
		'dominant colors',
		'TypeScript library',
		'color formats',
		'frontend tools',
		'hex colors',
		'rgb colors',
		'hsl colors',
		'oklch colors',
	],
	authors: [{ name: 'prodbyeagle', url: 'https://github.com/prodbyeagle' }],
	creator: 'prodbyeagle',
	publisher: 'prodbyeagle',
	openGraph: {
		title: '@prodbyeagle/color – Extract colors from images',
		description:
			'Extract, format, and apply color palettes from images using a blazing-fast TypeScript library. Supports RGB, HEX, HSL, OKLCH formats.',
		url: 'https://github.com/prodbyeagle/color',
		siteName: '@prodbyeagle/color',
		images: [
			{
				url: 'https://kappa.lol/WTiY5',
				width: 1200,
				height: 630,
				alt: '@prodbyeagle/color OG Image',
			},
		],
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: '@prodbyeagle/color – Extract colors from images',
		description:
			'TypeScript color extraction library for developers. Fast, accurate, and zero dependencies.',
		creator: '@prodbyeagle',
		images: ['https://kappa.lol/WTiY5'],
	},
	icons: {
		icon: 'https://kappa.lol/WTiY5',
	},
	metadataBase: new URL('https://github.com/prodbyeagle/color'),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground select-none`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem>
					<div className='relative flex flex-col'>
						<Navbar />

						<main className='flex-1 flex items-start justify-center pt-10'>
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
