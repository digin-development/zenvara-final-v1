import Image from "next/image";
import type { ProjectData } from "@/projects/templates/landing3/types";

// The landing page footer carried the project logo, RERA number and the legal disclaimer.
// The website footer is generic, so this strip keeps them on every project page.
export function ProjectLegal({ project }: { project: ProjectData }) {
  const { rera, legalDisclaimer, logo } = project;
  return (
    <section aria-label="Legal information" className="border-t border-beige bg-ivory">
      <div className="mx-auto max-w-7xl space-y-3 px-5 py-8 text-xs leading-relaxed text-navy/65 md:px-8">
        {logo && (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            unoptimized // small logo, also allows SVG
            className="mb-2 h-14 w-auto"
          />
        )}
        {rera && <p>MahaRERA registration no. {rera.number}</p>}
        <p>{legalDisclaimer}</p>
      </div>
    </section>
  );
}
