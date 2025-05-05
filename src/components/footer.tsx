'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { fadeUp } from '@/lib/motion';

import { ImageText } from './image-text';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<motion.footer
			variants={fadeUp}
			initial='hidden'
			animate='show'
			className='text-muted-foreground py-4 mt-10 border-t border-border'>
			<div className='container mx-auto px-4 flex flex-col items-center space-y-1 text-sm text-center'>
				<motion.p variants={fadeUp} className='leading-tight'>
					Made by{' '}
					<Link
						href='https://prodbyeagle.vercel.app'
						target='_blank'
						rel='noopener noreferrer'>
						<ImageText
							className='hover:font-bold transition-all'
							text='prodbyeagle'
						/>
					</Link>{' '}
					· &copy; {currentYear}
				</motion.p>
			</div>
		</motion.footer>
	);
}
