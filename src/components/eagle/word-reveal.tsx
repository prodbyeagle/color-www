import * as motion from 'motion/react-client';
import { isValidElement, type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface WordRevealProps extends HTMLAttributes<HTMLSpanElement> {
	children: ReactNode;
	delay?: number;
}

type WordPiece = {
	key: string;
	node: ReactNode;
};

export function WordReveal({ children, delay = 0, ...props }: WordRevealProps) {
	const result: WordPiece[] = [];

	let wordIndex = 0;

	function flatten(node: ReactNode): void {
		if (typeof node === 'string') {
			const words = node.split(' ');
			words.forEach((word, i) => {
				result.push({
					key: `word-${wordIndex++}`,
					node: word + (i < words.length - 1 ? `` : ``),
				});
			});
		} else if (Array.isArray(node)) {
			node.forEach(flatten);
		} else if (isValidElement(node)) {
			result.push({ key: `jsx-${wordIndex++}`, node });
		}
	}

	flatten(children);

	return (
		<span className={cn('inline-block overflow-hidden')} {...props}>
			{result.map(({ key, node }, i) => (
				<motion.span
					key={key}
					className='inline-block pr-2'
					initial={{
						opacity: 0,
						y: 10,
						filter: 'blur(6px)',
					}}
					animate={{
						opacity: 1,
						y: 0,
						filter: 'blur(0px)',
					}}
					transition={{
						duration: 0.8,
						delay: delay + i * 0.15,
						ease: [0.4, 0, 0.2, 1],
					}}>
					{node}
				</motion.span>
			))}
		</span>
	);
}
