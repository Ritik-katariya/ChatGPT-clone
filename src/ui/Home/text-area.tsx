"use client";

import type React from "react";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Settings2,
  Mic,
  AudioWaveform,
  Paperclip,
  Grid3X3,
  Image,
  Globe,
  Code,
  Search,
  Lightbulb,
  ChevronRight,
  X,
  ArrowUp,
} from "lucide-react";

interface PastedImage {
  id: string;
  file: File;
  preview: string;
}

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [pastedImages, setPastedImages] = useState<PastedImage[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasContent = message.trim() || pastedImages.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasContent) {
      console.log("Sending message:", message);
      console.log("Sending images:", pastedImages);
      setMessage("");
      setPastedImages([]);
      adjustTextareaHeight();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 300);
      textarea.style.height = `${newHeight}px`;
    }
  };

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          const id = Math.random().toString(36).substring(7);
          const preview = URL.createObjectURL(file);
          setPastedImages(prev => [...prev, { id, file, preview }]);
        }
      }
    }
  }, []);

  const removeImage = (id: string) => {
    setPastedImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const id = Math.random().toString(36).substring(7);
        const preview = URL.createObjectURL(file);
        setPastedImages(prev => [...prev, { id, file, preview }]);
      }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative">
        <div onSubmit={handleSubmit} className="relative">
          <div className="relative bg-[#2f2f2f] rounded-3xl border border-[#4a4a4a] focus-within:border-[#5a5a5a] transition-colors">
            <div className="flex items-start p-3 flex-col">
              
              {/* Image Previews */}
              {pastedImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 w-full">
                  {pastedImages.map(image => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.preview}
                        alt="Pasted image"
                        className="w-16 h-16 object-cover rounded-lg border border-[#4a4a4a]"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff4444] hover:bg-[#ff6666] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Textarea */}
              <div className="flex-1 w-full text-lg">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setMessage(e.target.value);
                    adjustTextareaHeight();
                  }}
                  onPaste={handlePaste}
                  placeholder="Ask anything"
                  className="min-h-[50px] max-h-[300px] w-full resize-none border-0 bg-transparent text-white placeholder:text-[#8e8e8e] p-2 text-base leading-6 outline-none focus:outline-none focus:ring-0 overflow-y-auto scrollbar-thin scrollbar-thumb-[#4a4a4a] scrollbar-track-transparent"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#4a4a4a transparent'
                  }}
                />
              </div>

              <div className="flex justify-between items-center w-full">
                {/* Plus and Tools Section */}
                <div className="flex items-center gap-2 mr-3 mt-1">
                  <DropdownMenu open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-[#b4b4b4] hover:text-white hover:bg-[#404040] rounded-lg focus:outline-none focus:ring-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="top"
                      align="start"
                      className="w-56 bg-[#2f2f2f] border-[#4a4a4a] text-white"
                    >
                      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 hover:bg-[#404040] cursor-pointer focus:outline-none">
                        <label className="flex items-center gap-3 w-full cursor-pointer">
                          <Paperclip className="h-4 w-4" />
                          <span>Add photos and files</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 hover:bg-[#404040] cursor-pointer focus:outline-none">
                        <Grid3X3 className="h-4 w-4" />
                        <span>Add from apps</span>
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu open={isToolsOpen} onOpenChange={setIsToolsOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-[#b4b4b4] hover:text-white hover:bg-[#404040] rounded-lg flex items-center gap-2 focus:outline-none focus:ring-0"
                      >
                        <Settings2 className="h-4 w-4" />
                        <span className="text-sm">Tools</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="top"
                      align="start"
                      className="w-56 bg-[#2f2f2f] border-[#4a4a4a] text-white"
                    >
                      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 hover:bg-[#404040] cursor-pointer focus:outline-none">
                        <Image className="h-4 w-4" />
                        <span>Create an image</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 hover:bg-[#404040] cursor-pointer focus:outline-none">
                        <Globe className="h-4 w-4" />
                        <span>Search the web</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 hover:bg-[#404040] cursor-pointer focus:outline-none">
                        <Code className="h-4 w-4" />
                        <span>Write or code</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 hover:bg-[#404040] cursor-pointer focus:outline-none">
                        <Search className="h-4 w-4" />
                        <span>Run deep research</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 hover:bg-[#404040] cursor-pointer focus:outline-none">
                        <Lightbulb className="h-4 w-4" />
                        <span>Think for longer</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-2 ml-3 mt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-[#b4b4b4] hover:text-white hover:bg-[#404040] rounded-lg focus:outline-none focus:ring-0"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  
                  {/* Dynamic last button - shows up arrow when there's content, AudioWaveform when empty */}
                  <Button
                    variant="ghost"
                    size="sm"
                    type={hasContent ? "submit" : "button"}
                    className={`h-8 w-8 p-0 rounded-lg focus:outline-none focus:ring-0 transition-all duration-200 ${
                      hasContent 
                        ? "text-white bg-white hover:bg-gray-200" 
                        : "text-[#b4b4b4] hover:text-white hover:bg-[#404040]"
                    }`}
                    onClick={hasContent ? handleSubmit : undefined}
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
        </div>
      </div>
    </div>
  );
}