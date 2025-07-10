'use client';

import { actTypes } from '@/lib/types';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Scale } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const actOptions = [
	{ value: actTypes.default, label: 'Default' },
	{ value: actTypes.land, label: 'Land Law' },
];

export default function Header() {
	const searchParams = useSearchParams();
	const [actType, setActType] = useState(searchParams.get('act') || '');
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('act', actType);
    if (actType === '') {
      params.delete('act');
    }
		router.push(`?${params.toString()}`);
	}, [actType, searchParams]);

	return (
		<div className='container mx-auto px-4 py-3 flex items-center justify-between'>
			<div className='flex items-center gap-2'>
				<Scale className='h-6 w-6 text-emerald-600' />
				<h1 className='text-xl font-semibold text-emerald-800'>Bangladesh Law AI</h1>
			</div>

			{pathname === '/chat' && (
				<Select.Root value={actType} onValueChange={setActType}>
					<Select.Trigger className='w-[150px] inline-flex items-center justify-between px-2 py-1 bg-white border border-emerald-200 rounded-md text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400'>
						<Select.Value placeholder='Select Act' />
						<Select.Icon>
							<ChevronDown className='h-4 w-4' />
						</Select.Icon>
					</Select.Trigger>
					<Select.Portal>
						<Select.Content
							position='popper'
							sideOffset={5}
							className='w-[150px] bg-white border border-emerald-200 rounded-md shadow-lg z-50'
						>
							<Select.Viewport className='p-1'>
								{actOptions.map((type) => (
									<Select.Item
										key={type.value}
										value={type.value}
										className='relative flex items-center px-2 py-1.5 text-sm text-emerald-800 rounded-md select-none hover:bg-emerald-50 cursor-pointer focus:bg-emerald-50 focus:outline-none'
									>
										<Select.ItemText>{type.label}</Select.ItemText>
									</Select.Item>
								))}
							</Select.Viewport>
						</Select.Content>
					</Select.Portal>
				</Select.Root>
			)}
		</div>
	);
}
