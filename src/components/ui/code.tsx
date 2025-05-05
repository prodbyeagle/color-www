import * as React from 'react';

import { cn } from '@/lib/utils';

export type CodeProps = React.HTMLAttributes<HTMLElement>;

/**
 * A styled <code> block for inline code snippets.
 * @author @prodbyeagle
 */
export function Code({ className, ...props }: CodeProps) {
	return (
		<code
			className={cn(
				'rounded bg-muted px-1 py-0.5 font-mono text-sm',
				'text-accent-foreground transition-all duration-300',
				className
			)}
			{...props}
		/>
	);
}
