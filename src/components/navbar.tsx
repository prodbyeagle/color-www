'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeToggle } from '@/components/eagle/theme-toggle';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

const navItems = [
	{ href: '/', label: 'Home' },
	{ href: '/extract', label: 'Demo' },
	{ href: '/docs', label: 'Docs' },
];

export function Navbar() {
	const pathname = usePathname();

	return (
		<header className='w-full border-b'>
			<div className='container flex h-16 items-center justify-between gap-4 px-4 sm:px-6'>
				<div className='flex items-center gap-4'>
					<span className='text-sm font-semibold tracking-tight whitespace-nowrap'>
						@prodbyeagle/color
					</span>

					<nav className='hidden md:flex gap-x-6'>
						{navItems.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								className={cn(
									'text-sm transition-colors hover:text-foreground',
									pathname === href
										? 'text-foreground font-medium'
										: 'text-muted-foreground'
								)}>
								{label}
							</Link>
						))}
					</nav>
				</div>

				<div className='flex items-center gap-2'>
					<ThemeToggle />

					<div className='md:hidden'>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant='ghost'
									size='icon'
									aria-label='Open menu'>
									<Menu className='size-5' />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								align='end'
								className='w-48 p-4 space-y-2 bg-background'>
								{navItems.map(({ href, label }) => (
									<Link
										key={href}
										href={href}
										className={cn(
											'block text-sm font-medium transition-colors hover:text-foreground',
											pathname === href
												? 'text-foreground'
												: 'text-muted-foreground'
										)}>
										{label}
									</Link>
								))}
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</div>
		</header>
	);
}
