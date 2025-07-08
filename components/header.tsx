'use client';

import { Scale } from "lucide-react";
import { Select } from "./ui/select";

export default function Header() {
	return (
		<div className='container mx-auto px-4 py-3 flex items-center'>
			<div className='flex items-center gap-2'>
				<Scale className='h-6 w-6 text-emerald-600' />
				<h1 className='text-xl font-semibold text-emerald-800'>Bangladesh Law AI</h1>
			</div>
      {/* Set a dropdown to select act type */}
      {/* <Select
        // className='ml-auto'
        defaultValue='LAND'
        onValueChange={(value) => {
          console.log('Selected act:', value);
          // Handle act change logic here
        }}
      >
        <Select.Trigger className='w-40'>
          <Select.Value placeholder='Select Act' />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value='LAND'>Land</Select.Item>
          <Select.Item value='CRIMINAL'>Criminal</Select.Item>
          <Select.Item value='CIVIL'>Civil</Select.Item>
          <Select.Item value='CONSTITUTION'>Constitution</Select.Item>
          <Select.Item value='FAMILY'>Family</Select.Item>
          <Select.Item value='LABOUR'>Labour</Select.Item>
          <Select.Item value='TAX'>Tax</Select.Item>
          <Select.Item value='BUSINESS'>Business</Select.Item>
          <Select.Item value='ENVIRONMENT'>Environment</Select.Item>
          <Select.Item value='INTELLECTUAL_PROPERTY'>Intellectual Property</Select.Item>
          <Select.Item value='OTHER'>Other</Select.Item>
        </Select.Content>
      </Select> */}
		</div>
	);
}
