import { JSX } from 'react';

import CodeBlock from '@/components/code-snippet';

export const usageDoc: { title: string; content: JSX.Element } = {
	title: 'Usage Guide',
	content: (
		<>
			<h3 className='text-2xl font-semibold'>Basic Usage</h3>
			<p className='text-lg mt-2'>
				Here’s how to use the library in your project:
			</p>

			<div className='mt-4'>
				<CodeBlock
					code={`import { extractColor } from '@prodbyeagle/color';\n\nconst colors = extractColor(imageData);`}
				/>
			</div>
		</>
	),
};
