'use client';

import { extractColorsDoc } from '@/docs/api/extractColors';
import { formatsDoc } from '@/docs/api/formats';
import { getImageDataDoc } from '@/docs/api/getImageData';
import { usageDoc } from '@/docs/usage';
import { Loader2 } from 'lucide-react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Docs = {
	usage: { title: string; content: JSX.Element };
	extractColors: { title: string; content: JSX.Element };
	getImageData: { title: string; content: JSX.Element };
	formats: { title: string; content: JSX.Element };
};

const docs: Docs = {
	usage: usageDoc,
	formats: formatsDoc,
	extractColors: extractColorsDoc,
	getImageData: getImageDataDoc,
};

export default function DocsSlug() {
	const router = useRouter();
	const params = useParams();

	const slug = params?.slug as keyof Docs | undefined;

	const [content, setContent] = useState<{
		title: string;
		content: JSX.Element;
	} | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (slug && docs[slug]) {
			setContent(docs[slug]);
			setLoading(false);
		} else {
			setContent(null);
			setLoading(false);
		}
	}, [slug]);

	if (loading) {
		return (
			<main className='container max-w-5xl py-6 px-4'>
				<Card className='p-4 flex justify-center items-center'>
					<Loader2 className='animate-spin text-primary' size={32} />
				</Card>
			</main>
		);
	}

	if (!content) {
		notFound();
	}

	return (
		<main className='container max-w-5xl py-6 px-4 space-y-6'>
			<header className='space-y-4'>
				<h1 className='text-4xl font-bold'>{content.title}</h1>
			</header>
			<section>{content.content}</section>
			<div className='mt-8 text-center'>
				<Button variant='outline' onClick={() => router.push('/docs')}>
					Back to Docs Homepage
				</Button>
			</div>
		</main>
	);
}
