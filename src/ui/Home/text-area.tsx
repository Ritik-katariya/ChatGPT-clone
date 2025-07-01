"use client";

import type React from "react";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Mic,
  AudioWaveform,
  Paperclip,
  X,
  ArrowUp,
  Plus,
} from "lucide-react";

interface PastedFile {
  id: string;
  file: File;
  preview?: string;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

function base64ToArrayBuffer(base64: string): number[] {
  const binaryString = window.atob(base64.split(",")[1]);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return Array.from(bytes);
}

export default function ChatInput({ append, messages, isLoading }: any) {
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<PastedFile[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasContent = message.trim() || uploadedFiles.length > 0;

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasContent) return;

    const parts: any[] = [];

    if (message.trim()) {
      parts.push({ type: "text", text: message });
    }

    for (const fileObj of uploadedFiles) {
      const base64 = await fileToBase64(fileObj.file);

      if (fileObj.file.type.startsWith("image/")) {
        parts.push({
          type: "image",
          image: base64,
          providerOptions: {
            openai: { imageDetail: "high" },
          },
        });
      } else {
        parts.push({
          type: "file",
          mimeType: fileObj.file.type,
          filename: fileObj.file.name,
          data: base64ToArrayBuffer(base64), // ✅ serialized array
        });
      }
    }

    await append({
      role: "user",
      content: parts.length === 1 ? parts[0] : parts,
    });

    setMessage("");
    setUploadedFiles([]);
    adjustTextareaHeight();
  };

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const file = item.getAsFile();
      if (file) {
        const id = Math.random().toString(36).substring(7);
        const preview = file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined;
        setUploadedFiles((prev) => [...prev, { id, file, preview }]);
      }
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const id = Math.random().toString(36).substring(7);
      const preview = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined;
      setUploadedFiles((prev) => [...prev, { id, file, preview }]);
    });

    e.target.value = ""; // reset input
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const toRemove = prev.find((f) => f.id === id);
      if (toRemove?.preview) URL.revokeObjectURL(toRemove.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-[#2f2f2f] rounded-3xl border border-[#4a4a4a]">
          <div className="flex items-start p-3 flex-col">
            {uploadedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3 w-full">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="relative group">
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt="preview"
                        className="w-16 h-16 object-cover rounded-lg border border-[#4a4a4a]"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center text-sm text-white bg-[#404040] rounded-lg px-1 text-center">
                        {file.file.name.split(".").pop()?.toUpperCase()}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff4444] hover:bg-[#ff6666] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove file"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex-1 w-full text-lg">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  adjustTextareaHeight();
                }}
                onPaste={handlePaste}
                placeholder="Ask anything"
                className="min-h-[50px] max-h-[300px] w-full resize-none border-0 bg-transparent text-white placeholder:text-[#8e8e8e] p-2 text-base leading-6 outline-none focus:outline-none overflow-y-auto"
                rows={1}
              />
            </div>

            <div className="flex justify-between items-center w-full mt-2">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={triggerFileUpload}
                  className="h-8 w-8 p-0 text-[#b4b4b4] hover:text-white hover:bg-[#404040] rounded-lg"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-[#b4b4b4] hover:text-white hover:bg-[#404040] rounded-lg"
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  type="submit"
                  className={`h-8 w-8 p-0 rounded-lg transition-all duration-200 ${
                    hasContent
                      ? "text-white bg-white hover:bg-gray-200"
                      : "text-[#b4b4b4] hover:text-white hover:bg-[#404040]"
                  }`}
                >
                  {hasContent ? (
                    <ArrowUp className="h-4 w-4 text-black" />
                  ) : (
                    <AudioWaveform className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*,application/pdf,.doc,.docx"
        onChange={handleFileUpload}
        className="hidden"
        title="Upload files"
      />
      {isLoading && (
        <div className="flex items-center mt-2 text-[#b4b4b4] text-sm animate-pulse">
          <span>Assistant is typing</span>
          <span className="ml-1">...</span>
        </div>
      )}
    </div>
  );
}
