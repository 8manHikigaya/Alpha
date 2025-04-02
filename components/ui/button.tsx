import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-kid-sm hover:shadow-none hover:translate-y-1",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-kid-sm hover:shadow-none hover:translate-y-1",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-kid-sm hover:shadow-none hover:translate-y-1",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-kid-sm hover:shadow-none hover:translate-y-1",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        kid: "bg-gradient-to-r from-kid-primary to-kid-pink text-white font-bold shadow-kid-sm hover:shadow-none hover:translate-y-1",
        "kid-secondary":
          "bg-gradient-to-r from-kid-secondary to-kid-blue text-white font-bold shadow-kid-sm hover:shadow-none hover:translate-y-1",
        "kid-accent":
          "bg-gradient-to-r from-kid-accent to-kid-orange text-foreground font-bold shadow-kid-sm hover:shadow-none hover:translate-y-1",
        "kid-purple":
          "bg-gradient-to-r from-kid-purple to-kid-blue text-white font-bold shadow-kid-sm hover:shadow-none hover:translate-y-1",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-full px-4",
        lg: "h-11 rounded-full px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

