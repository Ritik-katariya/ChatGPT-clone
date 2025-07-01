"use client"
import React from "react";
import { Dropdown } from "./drop-dwon/drop-down-chatgpt";

import { DropdownProfile } from "./drop-dwon/drop-down-profile";
import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";
import { TempChat } from "@/image/svg-icon";
import { useUser } from "@/hooks/useUser";
export default function Header() {


  // const {data,isLoading,isError}=useUser();
  // console.log(data[0],"data");
  const data={email:"",name:"",image:""}


  return (
    <div className="flex justify-between items-center w-full h-14 pb-2  -ml-2 ">
      <Dropdown />
      <Button className="w-[100px] h-[30px] bg-[#3f3e74d7] hover:bg-[#3f3e6d] rounded-xl font-medium text-sm ">
        <Sparkle size={15} color="#ffffff" strokeWidth={3} />
        Get Plus
      </Button>
      <span className="flex w-24 justify-between items-center text-white ">
        <span className="w-10 h-10 flex justify-center items-center hover:bg-[#525252b6] rounded-full">
          <TempChat />
        </span>
        <DropdownProfile  data={data}/>
      </span>
    </div>
  );
}
