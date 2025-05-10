'use client';

import { useColorStore } from '@/store/useColorStore';
import { extractColors } from '@prodbyeagle/color';
import { useDropzone } from 'react-dropzone';

interface DropzoneProps {
	maxColors: number;
}

export function Dropzone({ maxColors }: DropzoneProps) {
	const { format, setResult } = useColorStore();

	const onDrop = async (acceptedFiles: File[]) => {
		const file = acceptedFiles[0];
		if (!file) return;

		try {
			const colors = await extractColors(file, maxColors, format);
			setResult(
				Array.isArray(colors[0])
					? colors.map((c) => (c as number[]).join(', '))
					: (colors as string[])
			);
		} catch (err) {
			console.error('Color extraction failed:', err);
			setResult([]);
		}
	};

	const { getRootProps, getInputProps } = useDropzone({
		multiple: false,
		onDrop,
		accept: {
			'image/png': ['.png'],
			'image/jpeg': ['.jpg', '.jpeg'],
			'image/webp': ['.webp'],
		},
	});

	return (
		<div
			{...getRootProps()}
			className='border-dashed border-2 h-48 rounded-md p-6 text-center cursor-pointer flex items-center justify-center'>
			<input {...getInputProps()} />
			<p className='text-muted-foreground'>
				Drop image here or click to upload
			</p>
		</div>
	);
}
