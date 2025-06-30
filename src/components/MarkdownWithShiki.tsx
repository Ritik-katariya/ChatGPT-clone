'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ShikiHighlighter, { isInlineCode } from 'react-shiki';

export default function MarkdownRenderer({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match?.[1];

          const isInline = isInlineCode(node as any);

          if (!isInline && language) {
            return (
              <ShikiHighlighter language={language} theme="github-dark">
                {String(children).trim()}
              </ShikiHighlighter>
            );
          }

          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
