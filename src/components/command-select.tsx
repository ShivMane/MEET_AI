import { ReactNode, useState } from "react";
import { ChevronsDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an option...",
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ triggers API refetch in parent when typing
  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    onSearch?.(val);
  };

  // ✅ clears search on dialog open/close
  const handleOpenChange = (value: boolean) => {
    if (!value) onSearch?.(""); // reset search when closing
    setOpen(value);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        type="button"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
      >
        <div>
          {selectedOption ? selectedOption.children : placeholder}
        </div>
        <ChevronsDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>

      <CommandResponsiveDialog open={open} onOpenChange={handleOpenChange}>
        <CommandInput
          placeholder="Search agents..."
          value={searchTerm}
          onValueChange={handleSearchChange} // ✅ updates parent search term
        />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No results found.
            </span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
