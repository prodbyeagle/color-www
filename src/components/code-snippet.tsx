'use client';

import { JSX, useEffect, useState } from 'react';
import { BundledLanguage } from 'shiki';

import { highlight } from '@/lib/shared';

import { Pre } from './ui/pre';

interface CodeBlockProps {
	code: string;
	lang: BundledLanguage;
}

export default function CodeBlock({
	code = 'const colors = extractColor(imageData);',
	lang = 'typescript',
}: CodeBlockProps) {
	const [highlightedCode, setHighlightedCode] = useState<JSX.Element | null>(
		null
	);

	useEffect(() => {
		// @ts-expect-error shiki is not a module
		return void highlight(code, lang).then(setHighlightedCode);
	}, [code, lang]);

	if (!highlightedCode) {
		return <p>Loading...</p>;
	}

	return <Pre>{highlightedCode}</Pre>;
}
