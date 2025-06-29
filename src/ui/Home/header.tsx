import React from 'react'
import { Dropdown } from './drop-dwon/drop-down-chatgpt'

import { DropdownProfile } from './drop-dwon/drop-down-profile'
import { Button } from '@/components/ui/button'
import { Sparkle } from 'lucide-react'
import { TempChat } from '@/image/svg-icon'
export default function Header() {
  return (
    <div className='flex justify-between items-center w-full h-12 mt-1  -ml-6'>
        <Dropdown/>
        <Button className='w-[100px] h-[30px] bg-[#3f3e74d7] hover:bg-[#3f3e6d] rounded-xl font-medium text-sm '>
        <Sparkle size={15} color="#ffffff" strokeWidth={3} />
          Get Plus
        </Button>
      <span className='flex w-24 justify-between items-center text-white '>
        <span className='w-10 h-10 flex justify-center items-center hover:bg-[#525252b6] rounded-full'> 
          <TempChat/>
        </span>
     <DropdownProfile/>
      </span>
    </div>
  )
}
