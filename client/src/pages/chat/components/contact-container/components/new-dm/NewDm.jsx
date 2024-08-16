import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FaPlus } from "react-icons/fa"
import { IoPowerSharp } from "react-icons/io5"

function NewDm() {
  return (
    <>
       <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaPlus className="text-neutral-400 font-light text-opacity-90 hover:text-neutral-100 cursor-pointer transition-all duration-300"/>
            </TooltipTrigger>
            <TooltipContent>
              <p>LogOut</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
    </>
  )
}

export default NewDm
