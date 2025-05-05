'use client';

import { toast } from 'sonner';

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

export function ColorList({
	colors,
	format,
}: {
	colors: string[];
	format: string;
}) {
	if (!colors?.length) return null;

	const handleCopy = (color: string) => {
		navigator.clipboard.writeText(color);
		toast.success('Color copied to clipboard', {
			description: color,
		});
	};

	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
			{colors.map((color, i) => {
				const backgroundColor =
					format === 'rgb' ? `rgb(${color})` : color;

				return (
					<Tooltip key={i}>
						<TooltipTrigger asChild>
							<div
								role='button'
								aria-label={`Copy color ${color}`}
								onClick={() => handleCopy(color)}
								className={cn(
									'aspect-square rounded-lg border shadow-sm p-2 flex flex-col items-center justify-end text-xs font-mono cursor-pointer group',
									'transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]'
								)}
								style={{ backgroundColor }}>
								<span
									className='text-background drop-shadow-md'
									style={{
										color: getTextColor(backgroundColor),
									}}>
									{color}
								</span>
							</div>
						</TooltipTrigger>
						<TooltipContent>Click to copy</TooltipContent>
					</Tooltip>
				);
			})}
		</div>
	);
}

function getTextColor(bg: string): string {
	let r = 0,
		g = 0,
		b = 0;

	if (bg.startsWith('#')) {
		const hex = bg.slice(1);
		if (hex.length === 3) {
			r = parseInt(hex[0] + hex[0], 16);
			g = parseInt(hex[1] + hex[1], 16);
			b = parseInt(hex[2] + hex[2], 16);
		} else {
			r = parseInt(hex.slice(0, 2), 16);
			g = parseInt(hex.slice(2, 4), 16);
			b = parseInt(hex.slice(4, 6), 16);
		}
	} else if (bg.startsWith('rgb')) {
		const values = bg.match(/\d+/g);
		if (values) {
			[r, g, b] = values.map(Number);
		}
	}

	const brightness = (r * 299 + g * 587 + b * 114) / 1000;
	return brightness > 150 ? '#000000' : '#ffffff';
}
