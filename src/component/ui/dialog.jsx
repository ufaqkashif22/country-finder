import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

// Main Dialog wrapper
export const Dialog = DialogPrimitive.Root;

// Trigger button or element
export const DialogTrigger = DialogPrimitive.Trigger;

// Modal content wrapper
export function DialogContent({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
      
      <DialogPrimitive.Content
        {...props}
        className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl 
        bg-white/90 dark:bg-gray-900/80 p-6 shadow-2xl backdrop-blur-md z-50"
      >
        <div className="text-gray-900 dark:text-gray-100">
          {children}
        </div>

        <DialogPrimitive.Close
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white text-xl focus:outline-none"
          aria-label="Close"
        >
          ×
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

// Optional header section
export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

// Optional title element
export function DialogTitle({ children }) {
  return (
    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
      {children}
    </h2>
  );
}