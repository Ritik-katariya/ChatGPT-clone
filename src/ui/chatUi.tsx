'use client';

import { useRef, useEffect } from 'react';
import { renderMessageParts } from './renderMessageParts';

export default function Chat({ messages }: { messages: any[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!Array.isArray(messages)) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-white flex flex-col items-center justify-center">
        <div className="text-red-400 text-lg font-semibold">
          Error: Messages data is not an array.
        </div>
        <pre className="text-xs text-red-400 bg-black/30 rounded p-2 mt-4 overflow-x-auto max-w-xl">
          {JSON.stringify(messages, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="min-h-full h-full text-white flex flex-col">
      <div
        className="flex-1 overflow-y-auto p-6 space-y-4 max-w-4xl mx-auto w-full"
        style={{
          minHeight: 0,
          maxHeight: '100%',
          // Hide scrollbar for all browsers
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE 10+
        }}
        // Hide scrollbar for Webkit browsers
        // (removed invalid 'css' prop)
      >
        <style>
          {`
            /* Hide scrollbar for Chrome, Safari and Opera */
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <div className="hide-scrollbar">
          {messages.map((msg: any, idx: number) => {
            const id = msg.id ?? idx;
            const role = msg.role ?? 'user';
            const parts = msg.content ?? msg.parts ?? msg.text;

            return (
              <div key={id} className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`rounded-xl px-4 py-3 text-sm leading-relaxed max-w-[80%] break-words ${
                    role === 'user' ? 'bg-[#3b3b3b]' : 'bg-[#2a2a2a00]'
                  }`}
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {renderMessageParts(parts)}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
