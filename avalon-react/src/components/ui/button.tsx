import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-xl hover:shadow-2xl ring-2 ring-transparent",
  {
    variants: {
      variant: {
        default: "bg-accent text-white hover:bg-amber-600 ring-accent/30",
        good: "bg-good text-white hover:bg-green-400 hover:scale-105 ring-good/40 hover:ring-good/60",
        evil: "bg-evil text-white hover:bg-red-600 ring-evil/40",
        outline: "border-2 border-border bg-transparent hover:bg-bg-secondary hover:border-accent",
        ghost: "hover:bg-bg-secondary hover:text-text-primary",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2",
        lg: "h-16 px-10 py-5 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
