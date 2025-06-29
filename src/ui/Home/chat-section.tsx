'use client'
import React, { useEffect, useState } from 'react'
import { prompts } from '@/constant/text-for-home'
import { Textarea } from '@/components/ui/textarea';
import ChatInput from './text-area';




export default function ChatSection() {
const [line, setLine] = useState("");

useEffect(() => {
    const index = Math.floor(Math.random() * prompts.length);
    setLine(prompts[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

return (
    <div className='w-full h-full flex justify-center items-center text-white  '>
      <div className='w-[65%] h-44 bg-red space-y-5 '>
      <h2 className="scroll-m-20 pb-2 text-4xl font-semibold tracking-tight first:mt-0 text-center">
        {line}
      </h2>
      <ChatInput/>
      </div>
    </div>
  );
}


 
  