'use client';

import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function Loading() {
	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div className='flex flex-col items-center space-y-4 text-center'>
				<Loader2
					className={cn('size-8 animate-spin text-muted-foreground')}
				/>
				<p className='text-sm text-muted-foreground'>
					Hold tight... we&apos;re cooking up something awesome 🧪
				</p>
			</div>
		</div>
	);
}
