import { Dispatch, SetStateAction } from "react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command"
import { DialogTitle } from "@radix-ui/react-dialog"

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle>Command Palette</DialogTitle>
      <CommandInput placeholder="Finding a meeting agent..." />
      <CommandList>
        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandDialog>
  )
}
