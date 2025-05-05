'use client';

import { motion } from 'framer-motion';
import { Code2, GalleryHorizontal, Palette, PlayCircle } from 'lucide-react';

import { FeatureCard } from '@/components/feature-card';
import { ImageText } from '@/components/image-text';

const DOC_FEATURES = [
	{
		title: 'Usage',
		icon: <PlayCircle className='size-6 text-primary' />,
		description: 'How to use the library in your projects.',
		link: '/docs/usage',
	},
	{
		title: 'API: extractColors',
		icon: <Code2 className='size-6 text-primary' />,
		description: 'Get dominant colors from images.',
		link: '/docs/extractColors',
	},
	{
		title: 'API: getImageDataFromFile',
		icon: <GalleryHorizontal className='size-6 text-primary' />,
		description: 'Convert images to raw pixel data.',
		link: '/docs/getImageData',
	},
	{
		title: 'API: Supported Formats',
		icon: <Palette className='size-6 text-primary' />,
		description: 'Details about all supported color formats.',
		link: '/docs/formats',
	},
];

export default function DocsHomepage() {
	return (
		<motion.main
			initial='hidden'
			animate='show'
			variants={{ show: { transition: { staggerChildren: 0.1 } } }}
			className='container max-w-5xl mx-auto px-6 py-24 space-y-22'>
			<motion.section className='text-center space-y-8'>
				<h1 className='text-5xl md:text-6xl font-extrabold leading-tight'>
					Documentation for <ImageText text='@prodbyeagle/color' />
				</h1>
				<p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
					Explore the full documentation to get the most out of this
					powerful, fast, and easy-to-use library.
				</p>
			</motion.section>

			<section className='grid sm:grid-cols-2 gap-8'>
				{DOC_FEATURES.map((feature) => (
					<FeatureCard
						key={feature.title}
						title={feature.title}
						description={feature.description}
						icon={feature.icon}
						link={feature.link}
					/>
				))}
			</section>
		</motion.main>
	);
}
