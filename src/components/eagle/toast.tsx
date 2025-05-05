'use client';

import { useTheme } from 'next-themes';
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';

export function Toaster() {
	const { resolvedTheme } = useTheme();

	return <SonnerToaster richColors theme={resolvedTheme as ToasterProps['theme']} />;
}
