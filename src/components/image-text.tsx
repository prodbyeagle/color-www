import React from 'react';

export function ImageText({
	className,
	text,
}: {
	className?: string;
	text: string;
}) {
	return (
		<div className={`relative inline-block ${className}`}>
			<span
				className='relative text-transparent z-10 inline-block'
				style={{
					background:
						// thanks to 7TV and their paint. :3
						// copyright 2025 7TV, Inc. All rights reserved.
						'url(https://kappa.lol/gPbrzH)',
					WebkitBackgroundClip: 'text',
					backgroundClip: 'text',
				}}>
				{text}
			</span>
		</div>
	);
}
