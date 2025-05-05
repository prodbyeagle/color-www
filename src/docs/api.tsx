import { JSX } from 'react';

import CodeBlock from '@/components/code-snippet';
import { Code } from '@/components/ui/code';

export const apiDoc: { title: string; content: JSX.Element } = {
	title: 'API Reference',
	content: (
		<>
			<div className='space-y-8'>
				<section>
					<Code className='text-lg font-semibold'>
						extractColors(imageFile: File | Blob, maxColors: number,
						format: ColorFormat = &apos;hex&apos;)
					</Code>
					<p className='text-lg mt-2'>
						Extracts a color palette from an image file or blob,
						returning the most dominant colors in the specified
						format. This function processes the image, quantizes the
						colors, and returns them in the specified format (RGB,
						HEX, or HSL).
					</p>

					<h4 className='text-xl mt-4 font-semibold'>Parameters:</h4>
					<ul className='list-disc pl-5 mt-2'>
						<li>
							<Code>imageFile</Code> — A <Code>File</Code> or a{' '}
							<Code>Blob</Code> representing the image source.
						</li>
						<li>
							<Code>maxColors</Code> — A positive integer
							indicating the maximum number of dominant colors to
							extract. It must be greater than 0.
						</li>
						<li>
							<Code>format</Code> — The desired output format.
							Defaults to <Code>&apos;hex&apos;</Code>. Must be
							one of <Code>&apos;rgb&apos;</Code>,{' '}
							<Code>&apos;hex&apos;</Code>,{' '}
							<Code>&apos;hsl&apos;</Code>,{' '}
							<Code>&apos;oklch&apos;</Code>, or{' '}
							<Code>&apos;lab&apos;</Code>.
						</li>
					</ul>

					<h4 className='text-xl mt-4 font-semibold'>Returns:</h4>
					<p className='mt-2'>
						A <Code>Promise</Code> that resolves to an array of
						colors in the specified format. The output will be one
						of:
					</p>
					<ul className='list-disc pl-5 mt-2'>
						<li>
							<Code>RGB</Code>: Returns an array of RGB arrays —
							<Code>number[][]</Code>, e.g.,{' '}
							<Code>[[255, 204, 0], [0, 0, 0], ...]</Code>.
						</li>
						<li>
							<Code>HEX</Code>, <Code>HSL</Code>,{' '}
							<Code>OKLCH</Code>, or <Code>LAB</Code>: Returns an
							array of formatted color strings —{' '}
							<Code>string[]</Code>.
						</li>
					</ul>

					<h4 className='text-xl my-4 font-semibold'>Example:</h4>
					<CodeBlock
						lang='typescript'
						code={`const file = new File([/* image data */], 'photo.jpg', { type: 'image/jpeg' });

const palette = await extractColors(file, 5, 'hex');

console.log(palette); // ['#0F0F0F', ...]`}
					/>
				</section>

				<section>
					<Code className='text-xl font-semibold'>
						getImageDataFromFile(file: Blob, maxSize: number = 512)
					</Code>
					<p className='text-lg mt-2'>
						Converts an image file or blob into raw pixel data,
						which is then processed for color extraction. This
						utility is used internally by <Code>extractColors</Code>{' '}
						to process the image into RGBA pixel data.
					</p>

					<h4 className='text-xl mt-4 font-semibold'>Parameters:</h4>
					<ul className='list-disc pl-5 mt-2'>
						<li>
							<Code>file</Code> — A <Code>Blob</Code> representing
							the image data (e.g., obtained from a network
							response).
						</li>
						<li>
							<Code>maxSize</Code> — The maximum size for the
							image (in pixels). Default is 512px. The image is
							scaled to fit within this limit while maintaining
							its aspect ratio.
						</li>
					</ul>

					<h4 className='text-xl mt-4 font-semibold'>Returns:</h4>
					<p className='mt-2'>
						A <Code>Promise</Code> that resolves to an{' '}
						<Code>ImageData</Code> object, containing the raw RGBA
						pixel data of the image.
					</p>

					<h4 className='text-xl my-4 font-semibold'>Example:</h4>
					<CodeBlock
						lang='typescript'
						code={`const imageData = await getImageDataFromFile(file);
const { width, height, data } = imageData;`}
					/>
				</section>

				<section>
					<h2 className='text-2xl font-semibold text-accent-foreground'>
						Supported Color Formats
					</h2>
					<p className='text-lg mt-2'>
						The following color formats are supported for extracting
						and returning colors:
					</p>

					<ul className='list-disc pl-5 mt-2'>
						<li>
							<Code>RGB</Code>: An array of RGB triplets, e.g.,{' '}
							<Code>&apos;[255, 204, 0]&apos;</Code>.
						</li>
						<li>
							<Code>HEX</Code>: A hexadecimal color string, e.g.,{' '}
							<Code>&apos;#ffcc00&apos;</Code>.
						</li>
						<li>
							<Code>HSL</Code>: A color in HSL format, e.g.,{' '}
							<Code>&apos;hsl(45, 100%, 50%)&apos;</Code>.
						</li>
						<li>
							<Code>OKLCH</Code>: A color in OKLCH format, e.g.,{' '}
							<Code>&apos;oklch(0.823 0.173 84.2deg)&apos;</Code>.
						</li>
						<li>
							<Code>LAB</Code>: A color in CIE Lab format, e.g.,{' '}
							<Code>&apos;lab(84.2% 4.2 83.1)&apos;</Code>.
						</li>
					</ul>
				</section>
			</div>
		</>
	),
};
