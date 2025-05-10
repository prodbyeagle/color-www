'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ImageIcon, Palette } from 'lucide-react';
import Link from 'next/link';

import { WordReveal } from '@/components/eagle/word-reveal';
import { ImageText } from '@/components/image-text';
import { InstallationTabs } from '@/components/install-tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { fadeUp } from '@/lib/motion';

type Feature = {
	title: string;
	description: string;
	icon: React.ReactNode;
};

const FEATURES: Feature[] = [
	{
		title: 'Multi-format Output',
		icon: <Palette className='size-6 text-primary' />,
		description:
			'Extract colors in rgb, hex, hsl or oklch – perfect for design tools, UIs, and theming systems.',
	},
	{
		title: 'File & Blob Support',
		icon: <ImageIcon className='size-6 text-primary' />,
		description:
			'Drop any image in your browser—no uploads or external API calls. Pure frontend magic.',
	},
];

export default function LandingPage() {
	return (
		<motion.main
			initial='hidden'
			animate='show'
			variants={{ show: { transition: { staggerChildren: 0.1 } } }}
			className='container max-w-5xl mx-auto px-6 py-24 space-y-24'>
			<motion.section variants={fadeUp} className='text-center space-y-8'>
				<h1 className='text-5xl md:text-6xl font-extrabold leading-tight'>
					<WordReveal>
						🦅 Extract, Format & Use <ImageText text='Colors' />{' '}
						From <ImageText text='Images' />
					</WordReveal>
				</h1>
				<p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
					@prodbyeagle/color is a blazing-fast, dependency-free
					TypeScript library to analyze and format dominant image
					colors in RGB, HEX, HSL and OKLCH.
				</p>
				<div className='flex flex-wrap justify-center gap-4'>
					<Button className='group' asChild size='lg'>
						<Link href='/extract'>
							Try it now{' '}
							<ArrowRight className='ml-2 size-4 group-hover:translate-x-1 transition-all duration-150' />
						</Link>
					</Button>
					<Button asChild size='lg' variant='outline'>
						<Link
							href='https://github.com/prodbyeagle/color'
							target='_blank'
							rel='noopener noreferrer'>
							View on GitHub
						</Link>
					</Button>
					<Button asChild size='lg' variant='outline'>
						<Link
							href='https://jsr.io/@prodbyeagle/color'
							target='_blank'
							rel='noopener noreferrer'>
							View on JSR
						</Link>
					</Button>
					<Button asChild size='lg' variant='outline'>
						<Link href='/docs'>Visit Docs</Link>
					</Button>
				</div>
			</motion.section>

			<section className='grid sm:grid-cols-2 gap-8'>
				{FEATURES.map((feature, i) => (
					<motion.div
						key={feature.title}
						custom={i}
						variants={fadeUp}>
						<Card className='p-6'>
							<div className='flex items-start gap-4'>
								<div>{feature.icon}</div>
								<div>
									<h3 className='text-lg font-semibold'>
										{feature.title}
									</h3>
									<p className='text-muted-foreground'>
										{feature.description}
									</p>
								</div>
							</div>
						</Card>
					</motion.div>
				))}
			</section>

			<motion.section variants={fadeUp}>
				<h2 className='text-3xl font-bold text-center mb-8'>
					Installation Guide
				</h2>
				<InstallationTabs />
			</motion.section>
		</motion.main>
	);
}
