'use client';

import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
	return (
		<div className='flex min-h-screen items-center justify-center px-6 text-center'>
			<div className='max-w-md w-full'>
				<AlertTriangle className='size-10 text-destructive mb-4 mx-auto' />
				<h1 className='text-4xl font-bold mb-2'>
					Oops! This page ran away 🏃‍♂️💨
				</h1>
				<p className='text-muted-foreground mb-6'>
					Either you&apos;re lost or this page never existed.
					It&apos;s probably hanging out with your missing socks.
				</p>
				<Button asChild>
					<Link href='/'>Take me home</Link>
				</Button>
			</div>
		</div>
	);
}
