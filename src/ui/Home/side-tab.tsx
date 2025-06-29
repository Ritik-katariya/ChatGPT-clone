"use client";

import { useState } from "react";

import { LogoIcon,  TabIcon, SoraIcon, GPTsIcon } from "@/image/svg-icon";
import { items,tabs } from "@/constant/sidebarItems";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { title } from "process";
export default function SideTab() {
    const [collapsed, setCollapsed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
       <Sidebar
        className={`transition-all duration-300 ${
          collapsed ? "w-[64px]" : "w-[240px]"
        }  `}
      >
        <SidebarContent className="bg-[#181818] text-white ">
          <div
            className="flex items-center justify-between p-4"
           
          >
           <span
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="h-10 w-10 flex justify-center items-center rounded-md hover: hover:bg-[#3a3a3a]"
           >
           {collapsed && isOpen ? (
              <button onClick={() => setCollapsed(!collapsed)}>
                <TabIcon />
              </button>
            ) : (
              <span className="cursor-pointer   flex justify-center items-center">
                <LogoIcon />
              </span>
            )}
           </span>

            {!collapsed && (
              <button onClick={() => setCollapsed(!collapsed)} className="h-10 w-10 hover:bg-[#3a3a3a] rounded-md flex justify-center items-center">
                <TabIcon />
              </button>
            )}
          </div>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                
                  {
                    items.map((item)=>(
                      <SidebarMenuItem key={item.title} >
                    <SidebarMenuButton asChild className="hover:bg-[#3a3a3a] hover:text-white h-10 pr-2">
                      <a
                        href="/"
                        // onClick={onNewChat}
                        className="flex items-center gap-3 rounded-lg px-3 py-3  hover:bg-[#3a3a3a] "
                      >
                        {item.icon()}
                        <span className="truncate text-md font-semibold">{item.title}</span>
                        <div className="ml-auto text-xs  text-[#181818] hover:text-[#8d8d8d]">
                          {item?.srtcut}
                        </div>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                    ))
                  }

                 <div className="mt-4">
                 {!collapsed&&tabs.map((item,index)=>(
                     <a
                     key={index}
                       href="/"
                       // onClick={onNewChat}
                       className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-[#3a3a3a]"
                     >
                       {item.icon()}
                       <span className="truncate text-md font-semibold">
                         {item.title}
                       </span>
                     </a>
                  ))

                  }
                 </div>
               
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}
