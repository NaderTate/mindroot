"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { format } from "date-fns";
import { CiCalendarDate } from "react-icons/ci";
import { cn } from "@nextui-org/react";
import { Calendar } from "./calendar";
import { HTMLAttributes, useState } from "react";

export function CalendarDateRangePicker({
  className,
  onSelect,
}: {
  className?: string;
  onSelect: (date: Date | undefined) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Button
            fullWidth
            id="date"
            variant={"bordered"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CiCalendarDate size={20} className="mr-2" />
            {date ? <>{format(date, "LLL dd, y")}</> : <span>Deadline</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-background">
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={(date) => {
              setDate(date);
              onSelect(date);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
