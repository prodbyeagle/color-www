import { Check, Copy } from 'lucide-react';
import { HTMLAttributes, useState } from 'react';
import { toast } from 'sonner';

import { Code } from './ui/code';

export type CommandProps = HTMLAttributes<HTMLElement> & {
	command: string;
};

/**
 * A styled block for displaying commands with a copy button.
 * @author @prodbyeagle
 */
export function Command({ command, ...props }: CommandProps) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(command);
		setIsCopied(true);
		toast.success('Command copied to clipboard!');

		setTimeout(() => setIsCopied(false), 2500);
	};

	return (
		<Code
			{...props}
			className='relative inline-flex items-center space-x-7'>
			<span>{command}</span>
			<button
				onClick={handleCopy}
				aria-label='Copy command'
				className='absolute right-2 hover:text-accent-foreground text-muted-foreground transition-all duration-300'>
				{isCopied ? (
					<Check className='size-4 text-chart-2' />
				) : (
					<Copy className='size-4' />
				)}
			</button>
		</Code>
	);
}
