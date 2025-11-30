import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const touchableVariants = tv({
  base: "shadow-default cursor-pointer rounded-full font-poppins my-3",

  variants: {
    buttonType: {
      primary: "bg-white text-black text-sm font-medium w-full py-3",
      secondary: "bg-green-light px-12 h-20 text-white font-semibold uppercase",
    },
  },

  defaultVariants: {
    buttonType: "primary",
  },
});

interface TouchableProps
  extends ComponentProps<"button">,
    VariantProps<typeof touchableVariants> {
  children: ReactNode;
}

export default function Touchable({
  children,
  buttonType,
  ...props
}: TouchableProps) {
  return (
    <button {...props} className={touchableVariants({ buttonType })}>
      {children}
    </button>
  );
}
