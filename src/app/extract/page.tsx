'use client';

import { useColorStore } from '@/store/useColorStore';
import NumberFlow from '@number-flow/react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Copy, Download, InfoIcon, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { ColorList } from '@/app/extract/components/colorlist';
import { Dropzone } from '@/app/extract/components/dropzone';
import { FormatSelector } from '@/app/extract/components/format-selector';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export default function ExtractPage() {
	const { result, format, setResult } = useColorStore();
	const [maxColors, setMaxColors] = useState(10);
	const [copySuccess, setCopySuccess] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);

	useEffect(() => {
		if (result.length > 0) {
			setIsProcessing(false);
		}
	}, [result]);

	const handleMaxColorsChange = (value: number[]) => {
		setMaxColors(value[0]);
	};

	const handleClearResults = () => {
		setResult([]);
		toast.success('Results cleared', {
			description: 'Color palette has been reset.',
		});
	};

	const handleCopyToClipboard = () => {
		if (result.length === 0) return;

		const content = result.join('\n');

		navigator.clipboard
			.writeText(content)
			.then(() => {
				setCopySuccess(true);
				toast.success('Copied to clipboard', {
					description: `${result.length} colors copied in ${format.toUpperCase()} format.`,
				});
				setTimeout(() => {
					setCopySuccess(false);
				}, 2000);
			})
			.catch((err) => {
				console.error('Failed to copy: ', err);
				toast.error('Copy failed', {
					description:
						'Could not copy to clipboard. Please try again.',
				});
			});
	};

	const downloadColorPalette = () => {
		if (result.length === 0) return;

		const content = result.join('\n');
		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `color-palette-${format}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		toast.success('Palette downloaded', {
			description: `${result.length} colors saved in ${format.toUpperCase()} format.`,
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
				<p className='text-muted-foreground/60 italic text-sm'>
					All processing is done locally in your browser. We respect
					your privacy.
				</p>
			</header>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div className='space-y-4'>
					<Dropzone maxColors={maxColors} />

					{isProcessing && (
						<div className='space-y-2'>
							<p className='text-sm text-muted-foreground text-center'>
								Processing image...
							</p>
							<div className='flex justify-center'>
								<Skeleton className='h-4 w-3/4 rounded' />
							</div>
						</div>
					)}
				</div>

				<div className='space-y-6'>
					<div className='space-y-4 p-4 border rounded-lg border-border'>
						<div className='flex items-center justify-between'>
							<h3 className='font-medium'>Extract Settings</h3>
							<Dialog>
								<DialogTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
										aria-label='About Color Extraction'>
										<InfoIcon className='size-4' />
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>
											About Color Extraction
										</DialogTitle>
										<DialogDescription>
											This tool uses k-means clustering to
											identify the most prominent colors
											in your image. Adjust the number of
											colors to extract more or fewer
											colors.
										</DialogDescription>
									</DialogHeader>

									<div className='space-y-4'>
										<div className='text-sm'>
											If your result contains fewer colors
											than selected (e.g., you selected 15
											and received 9), it means the
											algorithm couldn&apos;t find more
											distinct colors - your image may not
											have enough visual variety.
										</div>

										<div className='space-y-2'>
											<p className='text-sm font-medium'>
												Tips for best results:
											</p>
											<ul className='text-sm list-disc pl-5 space-y-1'>
												<li>
													Use high-quality images with
													clear and varied colors.
												</li>
												<li>
													Increase the color count for
													more detailed palettes.
												</li>
												<li>
													Try different formats
													depending on your use case.
												</li>
											</ul>
										</div>
									</div>
								</DialogContent>
							</Dialog>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='colorFormat'>Color Format</Label>
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
								id='maxColors'
								value={[maxColors]}
								min={1}
								max={40}
								step={1}
								onValueChange={handleMaxColorsChange}
								className='w-full'
							/>
						</div>
					</div>

					<div className='flex flex-wrap gap-2'>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='outline'
										size='icon'
										onClick={handleCopyToClipboard}
										disabled={
											copySuccess || result.length === 0
										}
										aria-label='Copy palette to clipboard'>
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
										onClick={downloadColorPalette}
										disabled={result.length === 0}
										aria-label='Download palette'>
										<Download className='size-4' />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									Download palette as text file
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
										disabled={result.length === 0}
										aria-label='Clear results'>
										<Trash2 className='size-4' />
									</Button>
								</TooltipTrigger>
								<TooltipContent>Clear results</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</div>

			{/* Results section */}
			{result.length > 0 && (
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='space-y-4 mt-8'>
						<h2 className='text-xl font-medium'>
							Color Palette ({result.length})
						</h2>
						<ColorList colors={result} format={format} />
					</motion.div>
				</AnimatePresence>
			)}
		</main>
	);
}
