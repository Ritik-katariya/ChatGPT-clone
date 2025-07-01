'use client'
import React, { useEffect, useState } from 'react'
import { prompts } from '@/constant/text-for-home'
import { useChat } from '@ai-sdk/react';
import ChatInput from './text-area';
import Chat from '../chatUi';

// Define UserMessage type if not imported from elsewhere
type UserMessage = {
  role: 'user';
  content: string;
};

export default function ChatSection() {
  const [line, setLine] = useState("");
  const { messages, append, isLoading } = useChat();

  useEffect(() => {
    const index = Math.floor(Math.random() * prompts.length);
    setLine(prompts[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add userId and chatId from your app's state/auth
  const userId = "demo-user-id"; // Replace with real user id
  const chatId = null; // Set to null or provide a real chat id if available

  const handleSend = async (userMsg: UserMessage): Promise<void> => {
    const res: Response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        userId, // must be present!
        chatId, // optional
        messages: [userMsg],
      }),
      headers: { "Content-Type": "application/json" },
    });
    // ...rest of your code
  };

  return (
    <>
      {Array.isArray(messages) && messages.length > 0 ? (
        <div className="w-full h-full flex flex-col">
          {/* Chat area: scrollable, fills available space above input */}
          <div className="flex-1 overflow-y-auto">
            <Chat messages={messages} />
          </div>
          {/* Chat input: fixed at the bottom */}
          <div className="sticky bottom-0 left-0 right-0 bg-[#212121] z-10">
            <ChatInput append={append} messages={messages} isLoading={isLoading} />
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex justify-center items-center text-white  '>
          <div className='w-[65%] h-44 bg-red space-y-5 '>
            <h2 className="scroll-m-20 pb-2 text-4xl font-semibold tracking-tight first:mt-0 text-center">
              {line}
            </h2>
            <ChatInput append={append} messages={messages} isLoading={isLoading} />
          </div>
        </div>
      )}
    </>
  );
}



