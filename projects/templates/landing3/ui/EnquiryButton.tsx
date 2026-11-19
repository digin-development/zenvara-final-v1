"use client";

import type { ReactNode } from "react";
import { useEnquiryPopup } from "@/components/project/EnquiryPopupContext";

type Variant = "primary" | "secondary" | "onDark" | "link" | "plain";

const base = "inline-flex min-h-12 items-center justify-center px-7 text-sm font-medium tracking-wide transition-colors";
const styles: Record<Variant, string> = {
  primary: `${base} bg-navy text-white hover:bg-navy/90`,
  secondary: `${base} border border-gold text-navy hover:bg-gold/10`,
  onDark: `${base} border border-gold text-white hover:bg-white/10`,
  link: "text-sm font-medium text-navy underline decoration-gold underline-offset-4 hover:text-gold",
  plain: "", // style it fully with className
};

/**
 * Every button on a landing page is this one. No link, it only opens the enquiry popup.
 * `trigger` says which button was clicked; it is written in the enquiry email.
 */
export function EnquiryButton({
  trigger,
  variant = "primary",
  className = "",
  children,
}: {
  trigger: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  const { open } = useEnquiryPopup();
  return (
    <button type="button" onClick={() => open(trigger)} className={`${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}
