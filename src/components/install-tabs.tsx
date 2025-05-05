'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { cn } from '@/lib/utils';

const INSTALL_COMMANDS = {
	npm: 'npm install @prodbyeagle/color',
	yarn: 'yarn add @prodbyeagle/color',
	pnpm: 'pnpm install @prodbyeagle/color',
	bun: 'bunx jsr add @prodbyeagle/color',
	deno: 'deno add jsr:@prodbyeagle/color',
};

type PackageManager = keyof typeof INSTALL_COMMANDS;

export function InstallationTabs() {
	const [selectedTab, setSelectedTab] = useState<PackageManager>('bun');
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(INSTALL_COMMANDS[selectedTab]);
			setCopied(true);
			toast.success('Command copied to clipboard!');
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy: ', err);
			toast.error('Failed to copy command.');
		}
	};

	return (
		<Card className='w-full'>
			<CardHeader className='pb-3'>
				<CardTitle>Installation</CardTitle>
				<CardDescription>
					Choose your preferred package manager to install
					@prodbyeagle/color
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs
					defaultValue='npm'
					value={selectedTab}
					onValueChange={(value) =>
						setSelectedTab(value as PackageManager)
					}
					className='w-full'>
					<TabsList className='grid grid-cols-5 mb-4'>
						<TabsTrigger value='npm'>npm</TabsTrigger>
						<TabsTrigger value='yarn'>yarn</TabsTrigger>
						<TabsTrigger value='pnpm'>pnpm</TabsTrigger>
						<TabsTrigger value='bun'>bun</TabsTrigger>
						<TabsTrigger value='deno'>deno</TabsTrigger>
					</TabsList>

					{Object.keys(INSTALL_COMMANDS).map((manager) => (
						<TabsContent
							key={manager}
							value={manager}
							className='mt-0'>
							<div className='relative'>
								<pre className='bg-secondary p-4 rounded-md font-mono text-sm overflow-x-auto'>
									{
										INSTALL_COMMANDS[
											manager as PackageManager
										]
									}
								</pre>
								<Button
									variant='ghost'
									size='icon'
									onClick={copyToClipboard}
									disabled={copied}
									className={cn(
										'absolute top-3 right-2 size-8',
										'text-muted-foreground',
										'transition-all duration-300'
									)}
									aria-label='Copy to clipboard'>
									{copied ? (
										<Check className='size-4' />
									) : (
										<Copy className='size-4' />
									)}
								</Button>
							</div>
						</TabsContent>
					))}
				</Tabs>
			</CardContent>
		</Card>
	);
}
