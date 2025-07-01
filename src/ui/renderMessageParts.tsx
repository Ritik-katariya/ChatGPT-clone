import React from 'react';
import MarkdownRenderer from '@/components/MarkdownWithShiki';
import { FaFilePdf, FaFileAlt } from 'react-icons/fa';

function extractText(text: any): string {
  if (typeof text === 'string') return text;
  if (typeof text === 'object' && text?.type === 'text' && typeof text.text === 'string') {
    return text.text;
  }
  return JSON.stringify(text);
}

function renderFileIcon(part: any, key?: React.Key) {
  let blob: Blob | null = null;
  if (part.data instanceof Array) {
    blob = new Blob([new Uint8Array(part.data)], { type: part.mimeType });
  } else if (part.data instanceof Uint8Array || part.data instanceof ArrayBuffer) {
    blob = new Blob([part.data], { type: part.mimeType });
  } else if (typeof part.data === 'string' && part.data.startsWith('data:')) {
    return (
      <a
        key={key}
        href={part.data}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-blue-400 underline"
      >
        <FaFileAlt className="text-lg" />
        {part.filename || 'Download file'}
      </a>
    );
  }
  if (blob) {
    const url = URL.createObjectURL(blob);
    const isPdf = part.mimeType === 'application/pdf';
    return (
      <a
        key={key}
        href={url}
        download={part.filename || 'file'}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-blue-400 underline"
      >
        {isPdf ? <FaFilePdf className="text-lg text-red-500" /> : <FaFileAlt className="text-lg" />}
        {part.filename || (isPdf ? 'Document.pdf' : 'Download file')}
      </a>
    );
  }
  return null;
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
    if (parts.type === 'file' && parts.data && parts.mimeType) {
      return renderFileIcon(parts);
    }
    return null;
  }

  if (Array.isArray(parts)) {
    return parts.map((part, i) => {
      if (part?.type === 'text') {
        return <MarkdownRenderer key={i} text={extractText(part.text)} />;
      }
      if (part?.type === 'file' && part.data && part.mimeType) {
        return renderFileIcon(part, i);
      }
      return null;
    });
  }

  return null;
}
