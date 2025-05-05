import React, { useEffect, useState } from 'react';

export function ImageText({
	className,
	text,
}: {
	className?: string;
	text: string;
}) {
	const paintImages = [
		'https://cdn.7tv.app/paint/01HVRVXQYG0004D7R0SPHMPE6Y/layer/01JAMR2GVKF88A52AP1QFK8KGB/4x.avif',
		'https://cdn.7tv.app/paint/01J5EKNQS80000V182Y1H9Z6Y8/layer/01JAMR36JC0HBZQ4ZQVJJTPEJM/4x.avif',
		'https://cdn.7tv.app/paint/01JEDE45FTB7XTQGRFXP0BA2PT/layer/01JF06XNCYM98WZAGNT0D51SQ3/4x.avif',
		'https://cdn.7tv.app/paint/01JEY00EDNVW20AWX2NPG4HTNF/layer/01JH1Q77D54RJ8DKK9M5WCYR27/4x.avif',
		'https://cdn.7tv.app/paint/01HBXZS5680009NC1Q0NCNE82C/layer/01JAMR2BPQYF8Y2KQZF5Q6BDXR/4x.avif',
		'https://kappa.lol/gPbrzH',
	];

	const [randomImage, setRandomImage] = useState<string | null>(null);

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * paintImages.length);
		setRandomImage(paintImages[randomIndex]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!randomImage) return null; //? prevent rendering until image is ready

	return (
		<span
			className={`relative text-transparent z-10 inline-block ${className}`}
			style={{
				// thanks to 7TV and their paint. :3
				// copyright 2025 7TV sarl. All rights reserved.
				background: `url(${randomImage})`,
				WebkitBackgroundClip: 'text',
				backgroundClip: 'text',
				backgroundSize: 'cover',
			}}>
			{text}
		</span>
	);
}
