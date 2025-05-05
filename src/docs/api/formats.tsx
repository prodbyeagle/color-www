import { JSX } from 'react';

import CodeBlock from '@/components/code-snippet';
import { Code } from '@/components/ui/code';
import { Separator } from '@/components/ui/separator';

export const formatsDoc: { title: string; content: JSX.Element } = {
	title: 'Supported Color Formats',
	content: (
		<div className='max-w-none'>
			<section>
				<h2 className='text-2xl font-semibold mb-4 text-accent-foreground'>
					Supported Color Formats
				</h2>
				<p className='mb-4'>
					When extracting colors, the output format can be customized.
					Below are all supported formats:
				</p>

				<ul className='list-disc pl-6 space-y-2'>
					<li>
						<Code>RGB</Code>: Array of RGB triplets, e.g.,{' '}
						<Code>[255, 204, 0]</Code>
					</li>
					<li>
						<Code>HEX</Code>: Hexadecimal color strings, e.g.,{' '}
						<Code>#ffcc00</Code>
					</li>
					<li>
						<Code>HSL</Code>: HSL strings, e.g.,{' '}
						<Code>hsl(45, 100%, 50%)</Code>
					</li>
					<li>
						<Code>OKLCH</Code>: OKLCH strings, e.g.,{' '}
						<Code>oklch(0.823 0.173 84.2deg)</Code>
					</li>
				</ul>

				<Separator className='my-8' />

				<h3 className='text-lg font-semibold mb-2'>Type Definition</h3>
				<CodeBlock
					lang='ts'
					code={`/**
 * Defines the supported output color formats.
 *
 * - 'rgb': RGB triplets as number arrays
 * - 'hex': Hexadecimal strings
 * - 'hsl': HSL format strings
 * - 'oklch': OKLCH format strings
 */
export type ColorFormat = 'rgb' | 'hex' | 'hsl' | 'oklch';`}
				/>
			</section>
		</div>
	),
};
