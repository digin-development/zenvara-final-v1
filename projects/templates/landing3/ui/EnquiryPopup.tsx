"use client";

import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import { useEnquiryPopup } from "@/components/project/EnquiryPopupContext";
import type { ProjectData } from "@/projects/templates/landing3/types";
import { EnquiryForm } from "./EnquiryForm";

const AUTO_OPEN_MS = 5000; // popup opens by itself after 5 seconds

// The popup is controlled by the shared state in EnquiryPopupContext (no #hash, no document listeners).
export function EnquiryPopup({ project }: { project: ProjectData }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const shownRef = useRef(false);
  const { isOpen, trigger, open, close } = useEnquiryPopup();

  // Keep the <dialog> in sync with the state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      shownRef.current = true;
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Auto open after 5 seconds, only if the visitor has not opened it already
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!shownRef.current) open("Auto popup (after 5 seconds)");
    }, AUTO_OPEN_MS);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Enquiry form"
      onClose={close} // also fires when the visitor presses Esc
      // clicking the dark backdrop closes it
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto w-[calc(100%-1.5rem)] max-w-lg bg-transparent p-0 backdrop:bg-navy/70 backdrop:backdrop-blur-sm"
    >
      <div className="relative max-h-[90vh] overflow-y-auto bg-white">
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center text-navy hover:text-gold"
        >
          <FiX size={24} />
        </button>
        <div className="px-6 pt-8 md:px-8">
          <p className="font-serif text-3xl text-navy">Get project details</p>
          <p className="mt-2 text-sm text-navy/70">Share your details and our team will call you back.</p>
        </div>
        <EnquiryForm
          configurations={project.configurations.map((c) => c.name)}
          source={`project:${project.slug}`}
          projectName={project.name}
          trigger={trigger}
        />
      </div>
    </dialog>
  );
}
