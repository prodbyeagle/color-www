'use client';

import { useColorStore } from '@/store/useColorStore';
import NumberFlow from '@number-flow/react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Copy, Settings2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { ColorList } from '@/components/colorlist';
import { Dropzone } from '@/components/dropzone';
import { FormatSelector } from '@/components/format-selector';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export default function ExtractPage() {
	const { result, format, setResult } = useColorStore();
	const [maxColors, setMaxColors] = useState(10);
	const [activeTab, setActiveTab] = useState<string>('upload');

	useEffect(() => {
		if (result.length > 0 && activeTab === 'upload') {
			setActiveTab('results');
		}
	}, [result, activeTab]);

	const handleMaxColorsChange = (value: number[]) => {
		setMaxColors(value[0]);
	};

	const handleClearResults = () => {
		setResult([]);
		setActiveTab('upload');
	};

	const [copySuccess, setCopySuccess] = useState(false);

	const handleCopyToClipboard = () => {
		let content = '';

		if (format === 'hex') {
			content = result.join('\n');
		} else if (format === 'rgb') {
			content = result.join('\n');
		} else {
			content = result.join('\n');
		}

		navigator.clipboard
			.writeText(content)
			.then(() => {
				setCopySuccess(true);
				setTimeout(() => {
					setCopySuccess(false);
				}, 2000);
			})
			.catch((err) => {
				console.error('Failed to copy: ', err);
			});
	};

	return (
		<main className='container max-w-4xl py-6 md:py-10 px-4 space-y-6'>
			<header className='space-y-2 text-center'>
				<h1 className='text-3xl font-bold tracking-tight'>
					Extract Colors from Images
				</h1>
				<p className='text-muted-foreground'>
					Drop an image and get a clean color palette in your desired
					format.
				</p>
			</header>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className='w-full'>
				<div className='flex items-center justify-between mb-4'>
					<TabsList>
						<TabsTrigger value='upload'>Upload</TabsTrigger>
						<TabsTrigger
							value='results'
							disabled={result.length === 0}>
							Results {result.length > 0 && `(${result.length})`}
						</TabsTrigger>
					</TabsList>

					<div className='flex items-center gap-2'>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='outline'
										size='icon'
										onClick={() => setActiveTab('settings')}
										aria-label='Settings'>
										<Settings2 className='size-4' />
									</Button>
								</TooltipTrigger>
								<TooltipContent>Settings</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						{result.length > 0 && (
							<>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant='outline'
												size='icon'
												onClick={handleCopyToClipboard}
												aria-label='Copy palette to clipboard'
												disabled={copySuccess}>
												{copySuccess ? (
													<CheckCircle2 className='size-4 text-green-500' />
												) : (
													<Copy className='size-4' />
												)}
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											{copySuccess
												? 'Copied!'
												: 'Copy all colors to clipboard'}
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant='outline'
												size='icon'
												onClick={handleClearResults}
												aria-label='Clear results'>
												<Trash2 className='size-4' />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											Clear results
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</>
						)}
					</div>
				</div>

				<TabsContent value='upload' className='mt-0'>
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className='space-y-6'>
							<section>
								<Dropzone maxColors={maxColors} />
							</section>
						</motion.div>
					</AnimatePresence>
				</TabsContent>

				<TabsContent value='results' className='mt-0'>
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className='space-y-4'>
							{result.length > 0 && (
								<ColorList colors={result} format={format} />
							)}
						</motion.div>
					</AnimatePresence>
				</TabsContent>

				<TabsContent value='settings' className='mt-0'>
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className='space-y-6'>
							<div className='space-y-4 bg-card p-4 rounded-lg border'>
								<h2 className='text-lg font-medium'>
									Settings
								</h2>

								<div className='space-y-2'>
									<Label htmlFor='colorFormat'>
										Color Format
									</Label>
									<FormatSelector />
								</div>

								<div className='space-y-2'>
									<div className='flex items-center justify-between'>
										<Label
											htmlFor='maxColors'
											className='whitespace-nowrap'>
											Colors to Extract:{' '}
											<NumberFlow value={maxColors} />
										</Label>
									</div>
									<Slider
										id='settingsMaxColors'
										value={[maxColors]}
										min={1}
										max={30}
										step={1}
										onValueChange={handleMaxColorsChange}
										className='w-full'
									/>
								</div>

								<div className='pt-2'>
									<Button
										variant='outline'
										size='sm'
										onClick={() =>
											setActiveTab(
												result.length > 0
													? 'results'
													: 'upload'
											)
										}>
										Done
									</Button>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</TabsContent>
			</Tabs>
		</main>
	);
}
