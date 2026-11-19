import { EnquiryButton } from "@/projects/templates/landing3/ui/EnquiryButton";

export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gold/40 bg-navy p-3 md:hidden">
      <EnquiryButton
        trigger="Mobile bar - Request a Callback"
        variant="plain"
        className="flex min-h-12 w-full items-center justify-center bg-gold text-sm font-medium text-navy"
      >
        Request a Callback
      </EnquiryButton>
    </div>
  );
}
