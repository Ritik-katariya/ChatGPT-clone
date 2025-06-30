import { Button } from "@/components/ui/button"
import { SignOutButton } from "@clerk/nextjs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar,AvatarImage,AvatarFallback } from '@radix-ui/react-avatar'
import Image from "next/image"

interface DropdownProfileProps {
  data: any; // Replace 'any' with a more specific type if available
}

export function DropdownProfile({ data }: DropdownProfileProps) {
  const {name,email,image}=data;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full w-8 h-8 p-0">
          <Avatar className="w-8 h-8 rounded-full overflow-hidden">
            <AvatarImage
              src={image || "https://tse2.mm.bing.net/th/id/OIP.tjFlJ96qI6uzt1gXH0Im0wHaHa?pid=Api&P=0&h=180"}
              alt="@shadcn"
              className="w-full h-full object-cover rounded-full"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#3b3b3b] border-[#474747] text-white " align="start" >
        <DropdownMenuLabel>{email}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Upgrade Plan
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Customise Chat GPT
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="bg-[#474747]">
          
          <DropdownMenuSub >
            <DropdownMenuSubTrigger>Help</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <SignOutButton/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
