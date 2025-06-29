"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Sparkles, Orbit } from "lucide-react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function Dropdown() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-28 flex justify-around items-center rounded-md h-10 hover:bg-[#474747] text-lg font-medium text-white hover:text-white focus:border-0 outline-none focus:outline-none">
          Chat GPT <ChevronDown size={20} color="#ffffff" strokeWidth={1.25} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 bg-[#474747] border-[#474747] ">
        <DropdownMenuCheckboxItem
          onCheckedChange={setShowStatusBar}
          checked={showStatusBar}
          className="text-white focus:text-white"
        >
          <div className="flex items-center space-x-3 ">
            <div className="flex items-center justify-center w-6 h-6">
              <Sparkles color="white"/>
            </div>
            <div>
              <div className="text-white font-medium text-sm">ChatGPT Plus</div>
              <div className="text-gray-400 text-xs">
                Our smartest model & more
              </div>
            </div>
          </div>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onCheckedChange={setShowPanel}
          checked={showPanel}
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-6 h-6">
              <Orbit color="white"/>
            </div>
            <div>
              <div className="text-white font-medium text-sm">Chat GPT</div>
              <div className="text-gray-400 text-xs">
                Great for everyday tasks
              </div>
            </div>
          </div>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
