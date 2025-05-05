import { JSX } from 'react';

import CodeBlock from '@/components/code-snippet';
import { Command } from '@/components/command';
import { InstallationTabs } from '@/components/install-tabs';
import { Code } from '@/components/ui/code';
import { Separator } from '@/components/ui/separator';

export const usageDoc: { title: string; content: JSX.Element } = {
	title: 'Usage Guide',
	content: (
		<div className='max-w-none'>
			<section id='usage'>
				<h2 className='text-2xl font-semibold text-accent-foreground mb-4'>
					How to Use the Color Extraction Library
				</h2>

				<p className='mb-4'>
					To get started with the color extraction library, follow
					these simple steps. This guide will show you how to extract
					color palettes from images in various formats such as{' '}
					<Code>RGB</Code>, <Code>HEX</Code>, <Code>HSL</Code> and{' '}
					<Code>OKLCH</Code>.
				</p>

				<h3 className='text-lg font-semibold mt-6 mb-2'>
					Installation
				</h3>
				<p>
					First, install the color extraction library via{' '}
					<Code>bun</Code> or <Code>deno</Code>.
				</p>
				<div className='mt-3'>
					<InstallationTabs />
				</div>

				<h3 className='text-lg font-semibold mt-6 mb-2'>Basic Usage</h3>
				<p>
					Once the package is installed, import the necessary
					functions and start extracting colors from image files or
					blobs.
				</p>

				<CodeBlock
					lang='ts'
					code={`import { extractColors } from '@prodbyeagle/color';

const file = new File([/* image data */], 'photo.jpg', { type: 'image/jpeg' });

const palette = await extractColors(file, 5, 'hex');
console.log(palette); // ['#0F0F0F', ...]`}
				/>

				<h3 className='text-lg font-semibold mt-6 mb-2'>
					Handling Different Image Sources
				</h3>
				<p>
					You can use various image sources, such as file input or
					network response. Here&apos;s an example of how you can
					handle image extraction from a file input:
				</p>

				<CodeBlock
					lang='ts'
					code={`const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const palette = await extractColors(file, 5, 'rgb');
    console.log(palette); // [[255, 204, 0], ...]
  }
};`}
				/>

				<h3 className='text-lg font-semibold mt-6 mb-2'>
					Working with Multiple Color Formats
				</h3>
				<p>
					To specify a desired color format, pass one of the supported
					formats to the <Code>format</Code> parameter. Here’s how to
					extract colors in <Code>HSL</Code> format:
				</p>

				<CodeBlock
					lang='ts'
					code={`const file = new File([/* image data */], 'photo.jpg', { type: 'image/jpeg' });

const palette = await extractColors(file, 5, 'hsl');
console.log(palette); // ['hsl(45, 100%, 50%)', ...]`}
				/>

				<h3 className='text-lg font-semibold mt-6 mb-2'>
					Customizing Max Colors
				</h3>
				<p>
					The <Code>maxColors</Code> parameter allows you to control
					how many colors will be extracted. Here’s an example with 10
					colors:
				</p>

				<CodeBlock
					lang='ts'
					code={`const file = new File([/* image data */], 'photo.jpg', { type: 'image/jpeg' });

const palette = await extractColors(file, 10, 'lab');
console.log(palette); // ['lab(45.3% 12.7 32.0)', ...]`}
				/>

				<Separator className='my-8' />

				<h3 className='text-lg font-semibold mt-6 mb-2'>
					Error Handling
				</h3>
				<p>
					Make sure to handle any errors that may occur during color
					extraction, such as unsupported formats or decoding
					failures. Use a try-catch block to catch these errors:
				</p>

				<CodeBlock
					lang='ts'
					code={`try {
  const palette = await extractColors(file, 5, 'oklch');
  console.log(palette);
} catch (error) {
  console.error('Error extracting colors:', error);
}`}
				/>

				<h3 className='text-lg font-semibold mt-6 mb-2'>
					Supported Image Formats
				</h3>
				<p>
					This library supports decoding common image formats,
					including:
				</p>
				<ul className='list-disc pl-6'>
					<li>
						<Code>JPEG</Code>
					</li>
					<li>
						<Code>PNG</Code>
					</li>
					<li>
						<Code>WebP</Code>
					</li>
					<li>
						<Code>GIF</Code>
					</li>
				</ul>

				<Separator className='my-8' />

				<h3 className='text-lg font-semibold mt-6 mb-2'>
					Full Example
				</h3>
				<p>
					Here’s a complete example where you can extract a color
					palette from an uploaded image:
				</p>

				<CodeBlock
					lang='tsx'
					code={`import React, { useState } from 'react';
import { extractColors } from '@prodbyeagle/color';

const ImageColorExtractor = () => {
  const [colors, setColors] = useState<string[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const palette = await extractColors(file, 5, 'hex');
        setColors(palette);
      } catch (error) {
        console.error('Error extracting colors:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <div>
        {colors.map((color, index) => (
          <div key={index} style={{ backgroundColor: color, height: '50px', width: '50px' }} />
        ))}
      </div>
    </div>
  );
};

export default ImageColorExtractor;`}
				/>
			</section>
		</div>
	),
};
