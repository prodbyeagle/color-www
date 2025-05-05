import { JSX } from 'react';

import CodeBlock from '@/components/code-snippet';
import { Code } from '@/components/ui/code';
import { Separator } from '@/components/ui/separator';

export const extractColorsDoc: { title: string; content: JSX.Element } = {
	title: 'extractColors API',
	content: (
		<div className='max-w-none'>
			<section id='extractColors'>
				<h2 className='text-2xl font-semibold text-accent-foreground mb-4'>
					extractColors(imageFile: File | Blob, maxColors: number,
					format?: ColorFormat): Promise&lt;string[] | number[][]&gt;
				</h2>

				<p className='mb-4'>
					Extracts a color palette from an image file or blob,
					returning the most dominant colors in a specified format.
					Supports: <Code>&apos;rgb&apos;</Code>, <Code>&apos;hex&apos;</Code>,{' '}
					<Code>&apos;hsl&apos;</Code>, <Code>&apos;oklch&apos;</Code>, and{' '}
					<Code>&apos;lab&apos;</Code>.
				</p>

				<h3 className='text-lg font-semibold mt-6 mb-2'>Parameters</h3>
				<ul className='list-disc pl-6 space-y-2'>
					<li>
						<Code>imageFile</Code> – The image input as a{' '}
						<Code>File</Code> or <Code>Blob</Code> from an input or
						URL.
					</li>
					<li>
						<Code>maxColors</Code> – A positive integer specifying
						the maximum number of dominant colors to extract.
					</li>
					<li>
						<Code>format</Code> – Optional format of the resulting
						colors (default: <Code>&apos;hex&apos;</Code>). One of:{' '}
						<Code>&apos;rgb&apos;</Code>, <Code>&apos;hex&apos;</Code>,{' '}
						<Code>&apos;hsl&apos;</Code>, <Code>&apos;oklch&apos;</Code>,{' '}
						<Code>&apos;lab&apos;</Code>.
					</li>
				</ul>

				<h3 className='text-lg font-semibold mt-6 mb-2'>Returns</h3>
				<p className='mb-2'>
					A <Code>Promise</Code> resolving to an array of colors:
				</p>
				<ul className='list-disc pl-6 space-y-1'>
					<li>
						<Code>&apos;rgb&apos;</Code>: <Code>number[][]</Code> — e.g.,{' '}
						<Code>[[255, 204, 0], [0, 0, 0], ...]</Code>
					</li>
					<li>
						<Code>&apos;hex&apos;</Code>, <Code>&apos;hsl&apos;</Code>,{' '}
						<Code>&apos;oklch&apos;</Code>, <Code>&apos;lab&apos;</Code>:{' '}
						<Code>string[]</Code> — e.g., <Code>[&apos;#ffcc00&apos;]</Code>
					</li>
				</ul>

				<h3 className='text-lg font-semibold mt-6 mb-2'>Throws</h3>
				<p className='mb-4'>
					Throws an <Code>Error</Code> if image decoding fails or if
					an unsupported format is passed.
				</p>

				<Separator className='my-8' />

				<h3 className='text-lg font-semibold mb-2'>Example</h3>
				<CodeBlock
					lang='ts'
					code={`const file = new File([/* image data */], 'photo.jpg', { type: 'image/jpeg' });

const palette = await extractColors(file, 5, 'oklch');
console.log(palette); // ['oklch(0.82 0.15 90.0deg)', ...]`}
				/>

				<h3 className='text-lg font-semibold mt-8 mb-2'>
					Full Function Signature
				</h3>
				<CodeBlock
					lang='ts'
					code={`/**
 * Extracts a color palette from an image blob or file.
 *
 * @param imageFile - A File or Blob representing the image.
 * @param maxColors - The max number of colors to extract (must be > 0).
 * @param format - Optional color format: 'rgb' | 'hex' | 'hsl' | 'oklch' | 'lab' (default: 'hex').
 *
 * @returns Promise resolving to an array of dominant colors in the specified format.
 * - 'rgb': number[][]
 * - others: string[]
 *
 * @throws If image decoding fails or an unsupported format is used.
 */
export async function extractColors(
  imageFile: File | Blob,
  maxColors: number,
  format: ColorFormat = 'hex'
): Promise<string[] | number[][]> {
  const imageData = await getImageDataFromFile(imageFile);
  const palette = quantize(imageData.data, maxColors);
  const formattedColors = formatColors(palette, format);

  if (
    format === 'hex' ||
    format === 'rgb' ||
    format === 'hsl' ||
    format === 'oklch' ||
    format === 'lab'
  ) {
    return formattedColors as string[];
  }

  return formattedColors as number[][];
}`}
				/>
			</section>
		</div>
	),
};
