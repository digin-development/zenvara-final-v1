import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import { EnquiryPopupProvider } from "@/components/project/EnquiryPopupContext";
import ProjectHeader from "@/components/project/ProjectHeader";
import { getProject } from "@/projects";

// Layout for hidden project pages (/<projectName>): same footer, header menu = page sections.
// EnquiryPopupProvider lets the header button and every page button open the same enquiry popup.
export default async function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ projectName: string }>;
}) {
  const { projectName } = await params;
  const project = getProject(projectName);
  if (!project) notFound();

  return (
    <EnquiryPopupProvider>
      <ProjectHeader sections={project.sections} cta={project.cta} />
      <main id="top" className="flex-1">
        {children}
      </main>
      {/* Extra space on phones so the fixed callback bar does not cover the footer */}
      <div className={project.mobileCta ? "bg-navy pb-16 md:pb-0" : undefined}>
        <Footer />
      </div>
    </EnquiryPopupProvider>
  );
}
