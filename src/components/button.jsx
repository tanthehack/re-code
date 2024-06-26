import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "dark:bg-orange-main bg-coal-main text-white dark:hover:bg-white hover:bg-orange-main dark:hover:text-coal-main",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-gray-semi dark:border-gray-dark hover:border-orange-light hover:bg-gray-light dark:hover:bg-coal-light",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-orange-light hover:text-coal-main",
                link: "text-orange-main underline-offset-4 hover:underline",
                none: "hover:bg-orange-main hover:text-white",
            },
            size: {
                default: "h-11 px-6 py-4",
                sm: "h-9 rounded-md px-3 py-4",
                lg: "h-11 rounded-md px-8 py-4",
                icon: "h-10 w-10",
                full: "h-11 w-full px-6 py-4",
                xs: "p-1"
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };