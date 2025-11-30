"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BookingCalendarProps {
  date?: Date | undefined;
  setDate?: (d?: Date) => void;
  hour?: string;
  setHour?: (h: string) => void;
}

export default function BookingCalendar({ date, setDate, hour, setHour }: BookingCalendarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex gap-4 font-poppins max-[600px]:flex-col max-[600px]:items-center">
      <div className="flex flex-col gap-3 max-[600px]:items-center">
        <Label htmlFor="date-picker" className="px-1">
          Data
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Selecionar"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              className="font-poppins"
              mode="single"
              disabled={(day) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return day < today;
              }}
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
              locale={ptBR}
              formatters={{
                formatWeekdayName: (day) => {
                  return format(day, "EEEEE", { locale: ptBR });
                },
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3 max-[600px]:items-center">
        <Label htmlFor="time-picker" className="px-1">
          Hora
        </Label>
          <Input
            type="time"
            id="time-picker"
            step="1"
            value={hour ?? "10:30"}
            onChange={(e) => setHour?.((e.target as HTMLInputElement).value)}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
      </div>
    </div>
  );
}