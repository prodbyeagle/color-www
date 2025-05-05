'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Code } from 'lucide-react';
import Link from 'next/link';

import { ImageText } from '@/components/image-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { fadeUp } from '@/lib/motion';

type DocFeature = {
	title: string;
	description: string;
	icon: React.ReactNode;
	link: string;
};

const DOC_FEATURES: DocFeature[] = [
	{
		title: 'API Reference',
		icon: <BookOpen className='size-6 text-primary' />,
		description: 'Access detailed API documentation for advanced usage.',
		link: '/docs/api',
	},
	{
		title: 'Installation Guide',
		icon: <Code className='size-6 text-primary' />,
		description:
			'Step-by-step guide to install and get started with the library.',
		link: '/docs/installation',
	},
];

export default function DocsHomepage() {
	return (
		<motion.main
			initial='hidden'
			animate='show'
			variants={{ show: { transition: { staggerChildren: 0.1 } } }}
			className='container max-w-5xl mx-auto px-6 py-24 space-y-24'>
			<motion.section variants={fadeUp} className='text-center space-y-8'>
				<h1 className='text-5xl md:text-6xl font-extrabold leading-tight'>
					Documentation for <ImageText text='@prodbyeagle/color' />
				</h1>
				<p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
					Explore the full documentation to get the most out of this
					powerful, fast, and easy-to-use library.
				</p>
			</motion.section>

			<section className='grid sm:grid-cols-2 gap-8'>
				{DOC_FEATURES.map((feature, i) => (
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
									<Link href={feature.link}>
										<Button
											variant='outline'
											size='lg'
											className='mt-4'>
											Go to {feature.title}
											<ArrowRight className='ml-2 size-4' />
										</Button>
									</Link>
								</div>
							</div>
						</Card>
					</motion.div>
				))}
			</section>
		</motion.main>
	);
}
