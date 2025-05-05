'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { fadeUp } from '@/lib/motion';

type FeatureCardProps = {
	title: string;
	description: string;
	icon: React.ReactNode;
	link: string;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
	title,
	description,
	icon,
	link,
}) => (
	<motion.div variants={fadeUp} className='space-y-4'>
		<Card className='p-6'>
			<div className='flex items-start gap-4'>
				<div>{icon}</div>
				<div>
					<h3 className='text-lg font-semibold'>{title}</h3>
					<p className='text-muted-foreground'>{description}</p>
					<Link href={link}>
						<Button
							variant='outline'
							size='lg'
							className='mt-4 group'>
							Go to {title}
							<ArrowRight className='ml-2 size-4 group-hover:translate-x-1 transition-all duration-150' />
						</Button>
					</Link>
				</div>
			</div>
		</Card>
	</motion.div>
);
