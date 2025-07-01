'use client'
import React, { useEffect, useState } from 'react'
import { prompts } from '@/constant/text-for-home'
import { Textarea } from '@/components/ui/textarea';
import ChatInput from './text-area';
import { useChat } from '@ai-sdk/react';
import Chat from '../chatUi';



export default function ChatSection() {
const [line, setLine] = useState("");
const [messages,setMessages]=useState(null);
console.log(messages)


useEffect(() => {
    const index = Math.floor(Math.random() * prompts.length);
    setLine(prompts[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

return (
    <>
      {Array.isArray(messages) && (messages as any[]).length > 0 ? (
        <div className="w-full h-full flex flex-col">
          {/* Chat area: scrollable, fills available space above input */}
          <div className="flex-1 overflow-y-auto">
            <Chat messages={messages as any[]} />
          </div>
          {/* Chat input: fixed at the bottom */}
          <div className="sticky bottom-0 left-0 right-0 bg-[#212121] z-10">
            <ChatInput setMessages={setMessages} />
          </div>
        </div>
      ):(
        <div className='w-full h-full flex justify-center items-center text-white  '>
      <div className='w-[65%] h-44 bg-red space-y-5 '>
      <h2 className="scroll-m-20 pb-2 text-4xl font-semibold tracking-tight first:mt-0 text-center">
        {line}
      </h2>
      <ChatInput setMessages={setMessages}/>

      </div>
    </div>
      )
    }
    </>
  );
}


 
  