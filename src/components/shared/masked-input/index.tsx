"use client";

import * as React from "react";
import { InputMask, InputMaskProps } from "primereact/inputmask";
import { cn } from "@/lib/utils";

type MaskedInputProps = InputMaskProps & {
  label?: string;
  error?: string;
};

export default function MaskedInput({ error, ...props }: MaskedInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <InputMask
        {...props}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive font-poppins rounded-full shadow-lg w-full"
        )}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
