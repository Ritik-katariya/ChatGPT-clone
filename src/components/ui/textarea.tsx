import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        " placeholder:text-[#696969]     flex  min-h-20 w-full rounded-md border-2 bg-[#363636] border-[#363636] px-3 py-2 text-base   md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
