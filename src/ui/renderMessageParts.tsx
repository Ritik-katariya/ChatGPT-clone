import React from 'react';
import MarkdownRenderer from '@/components/MarkdownWithShiki';

function extractText(text: any): string {
  if (typeof text === 'string') return text;
  if (typeof text === 'object' && text?.type === 'text' && typeof text.text === 'string') {
    return text.text;
  }
  return JSON.stringify(text);
}

export function renderMessageParts(parts: any) {
  if (!parts) return null;

  if (typeof parts === 'string') {
    return <MarkdownRenderer text={parts} />;
  }

  if (typeof parts === 'object' && !Array.isArray(parts)) {
    if (parts.type === 'text') {
      return <MarkdownRenderer text={extractText(parts.text)} />;
    }

    if (parts.type === 'file' && parts.data && parts.mimeType?.startsWith('image/')) {
      const url = typeof parts.data === 'string' ? parts.data : URL.createObjectURL(parts.data);
      return (
        <img
          src={url}
          alt={parts.filename || 'uploaded image'}
          className="max-w-xs max-h-60 rounded border border-[#444]"
          style={{ margin: '0.5rem 0' }}
        />
      );
    }

    return (
      <pre className="text-xs text-red-400 bg-black/30 rounded p-2 overflow-x-auto">
        {JSON.stringify(parts, null, 2)}
      </pre>
    );
  }

  if (Array.isArray(parts)) {
    return parts.map((part, i) => {
      if (part?.type === 'text') {
        return <MarkdownRenderer key={i} text={extractText(part.text)} />;
      }

      if (part?.type === 'file' && part.data && part.mimeType?.startsWith('image/')) {
        const url = typeof part.data === 'string' ? part.data : URL.createObjectURL(part.data);
        return (
          <img
            key={i}
            src={url}
            alt={part.filename || 'uploaded image'}
            className="max-w-xs max-h-60 rounded border border-[#444]"
            style={{ margin: '0.5rem 0' }}
          />
        );
      }

      return (
        <pre key={i} className="text-xs text-red-400 bg-black/30 rounded p-2 overflow-x-auto">
          {JSON.stringify(part, null, 2)}
        </pre>
      );
    });
  }

  return (
    <pre className="text-xs text-red-400 bg-black/30 rounded p-2 overflow-x-auto">
      {JSON.stringify(parts, null, 2)}
    </pre>
  );
}
