"use client"; // popup open/close state lives in the browser

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type EnquiryPopupValue = {
  isOpen: boolean;
  /** Which button opened the popup, e.g. "Hero - Enquire Now". It is added to the email. */
  trigger: string;
  open: (trigger?: string) => void;
  close: () => void;
};

const EnquiryPopupContext = createContext<EnquiryPopupValue>({
  isOpen: false,
  trigger: "",
  open: () => {},
  close: () => {},
});

// Wrap the project layout with this. Any button (header, page, mobile bar) calls open().
export function EnquiryPopupProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({ isOpen: false, trigger: "" });

  const open = useCallback((trigger = "Enquire") => setState({ isOpen: true, trigger }), []);
  const close = useCallback(() => setState((current) => ({ ...current, isOpen: false })), []);
  const value = useMemo(() => ({ ...state, open, close }), [state, open, close]);

  return <EnquiryPopupContext.Provider value={value}>{children}</EnquiryPopupContext.Provider>;
}

export function useEnquiryPopup() {
  return useContext(EnquiryPopupContext);
}
