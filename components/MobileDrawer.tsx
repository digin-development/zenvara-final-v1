"use client"; // body scroll lock, Esc key and focus need the browser

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { FiX } from "react-icons/fi";

export type DrawerItem = { label: string; href: string; active?: boolean };

type Props = {
  id: string;
  label: string; // aria-label of the sidebar
  open: boolean;
  onClose: () => void; // pass a stable function (useCallback)
  logo: ReactNode;
  items: DrawerItem[];
  cta?: { label: string; href?: string; onClick?: () => void }; // onClick = button, href = link
};

// Shared mobile offcanvas sidebar (slides in from the right). Used by Header and ProjectHeader.
// Keep it OUTSIDE the <header> element: the header has backdrop-blur, which would trap `fixed` children.
export default function MobileDrawer({ id, label, open, onClose, logo, items, cta }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // lock page scroll behind the sidebar
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const onResize = () => {
      if (window.innerWidth >= 768) onClose(); // desktop menu takes over
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onClose]);

  const renderLink = (href: string, className: string, children: ReactNode) =>
    href.startsWith("/") ? (
      <Link href={href} onClick={onClose} className={className}>
        {children}
      </Link>
    ) : (
      <a href={href} onClick={onClose} className={className}>
        {children}
      </a>
    );

  return (
    <div
      className={`fixed inset-0 z-[60] transition-[visibility] duration-300 md:hidden ${open ? "visible" : "invisible"}`}
      inert={!open}
    >
      {/* Backdrop: click to close */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Sidebar */}
      <aside
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-navy text-ivory shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-ivory/15 px-5">
          <div className="[&_img]:h-14">{logo}</div>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center"
          >
            <FiX size={26} />
          </button>
        </div>

        <nav aria-label={label} className="flex-1 overflow-y-auto px-5">
          <ul>
            {items.map((item) => (
              <li key={item.href} className="border-b border-ivory/15">
                {renderLink(
                  item.href,
                  `block py-5 font-serif text-3xl ${item.active ? "text-gold" : ""}`,
                  item.label,
                )}
              </li>
            ))}
          </ul>
        </nav>

        {cta && (
          <div className="shrink-0 p-5">
            {(() => {
              const className =
                "block w-full rounded-full border border-ivory/60 px-6 py-3 text-center text-sm font-semibold transition-colors hover:bg-ivory hover:text-navy";
              if (cta.onClick) {
                return (
                  <button type="button" onClick={cta.onClick} className={className}>
                    {cta.label}
                  </button>
                );
              }
              return renderLink(cta.href ?? "#", className, cta.label);
            })()}
          </div>
        )}
      </aside>
    </div>
  );
}
