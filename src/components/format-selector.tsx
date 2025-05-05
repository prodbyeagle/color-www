'use client';

import { useColorStore } from '@/store/useColorStore';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export function FormatSelector() {
	const { format, setFormat } = useColorStore();

	return (
		<Select value={format} onValueChange={setFormat}>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Color Format' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='hex'>HEX</SelectItem>
				<SelectItem value='rgb'>RGB</SelectItem>
				<SelectItem value='hsl'>HSL</SelectItem>
				{/* <SelectItem value='oklch'>OKLCH ( //! if you see this, that means that oklch is still buggy and should not be used yet.)</SelectItem> */}
			</SelectContent>
		</Select>
	);
}
