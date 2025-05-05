import { JSX } from 'react';

import CodeBlock from '@/components/code-snippet';
import { Code } from '@/components/ui/code';
import { Separator } from '@/components/ui/separator';

export const getImageDataDoc: { title: string; content: JSX.Element } = {
	title: 'getImageDataFromFile API',
	content: (
		<div className='max-w-none'>
			<section id='getImageDataFromFile'>
				<h2 className='text-2xl font-semibold text-accent-foreground mb-4'>
					getImageDataFromFile(file: Blob, maxSize?: number):
					Promise&lt;ImageData&gt;
				</h2>

				<p className='mb-4'>
					Converts a <Code>Blob</Code> (such as a <Code>File</Code> or
					image fetched from a URL) into raw pixel data using{' '}
					<Code>createImageBitmap</Code> and an{' '}
					<Code>OffscreenCanvas</Code>. This function is used
					internally for extracting color data from images.
				</p>

				<h3 className='text-lg font-semibold mt-6 mb-2'>Parameters</h3>
				<ul className='list-disc pl-6 space-y-2'>
					<li>
						<Code>file</Code> – A <Code>Blob</Code> representing the
						image. This can come from a file input or a network
						response.
					</li>
					<li>
						<Code>maxSize</Code> – Optional maximum dimension
						(default: <Code>512</Code>). The image is scaled
						proportionally to ensure the largest side does not
						exceed this value.
					</li>
				</ul>

				<h3 className='text-lg font-semibold mt-6 mb-2'>Returns</h3>
				<p className='mb-4'>
					A <Code>Promise</Code> that resolves to an{' '}
					<Code>ImageData</Code> object containing RGBA pixel data.
				</p>

				<h3 className='text-lg font-semibold mt-6 mb-2'>Throws</h3>
				<p className='mb-4'>
					Throws an error if the 2D rendering context could not be
					initialized (e.g. browser doesn&apos;t support OffscreenCanvas).
				</p>

				<Separator className='my-8' />

				<h3 className='text-lg font-semibold mb-2'>Example</h3>
				<CodeBlock
					lang='ts'
					code={`const imageData = await getImageDataFromFile(file);
const { width, height, data } = imageData;`}
				/>

				<h3 className='text-lg font-semibold mt-8 mb-2'>
					Full Function Signature
				</h3>
				<CodeBlock
					lang='ts'
					code={`/**
 * Converts a Blob (File or image from URL) into ImageData using createImageBitmap and OffscreenCanvas.
 * @param file - The input image as a Blob.
 * @param maxSize - Optional max dimension (default: 512px).
 * @returns Promise resolving to raw RGBA ImageData.
 */
export async function getImageDataFromFile(
  file: Blob,
  maxSize: number = 512
): Promise<ImageData> {
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;

  const scale = Math.min(1, maxSize / Math.max(width, height));
  const targetWidth = Math.round(width * scale);
  const targetHeight = Math.round(height * scale);

  const canvas = new OffscreenCanvas(targetWidth, targetHeight);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D context');

  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
  return ctx.getImageData(0, 0, targetWidth, targetHeight);
}`}
				/>
			</section>
		</div>
	),
};
