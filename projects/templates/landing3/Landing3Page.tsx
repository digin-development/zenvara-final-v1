import { AmenitiesSection } from "./components/AmenitiesSection";
import { ContactSection } from "./components/ContactSection";
import { FaqSection } from "./components/FaqSection";
import { GallerySection } from "./components/GallerySection";
import { Hero3 } from "./components/Hero3";
import { Highlights3 } from "./components/Highlights3";
import { LocationSection3 } from "./components/LocationSection3";
import { MobileCta } from "./components/MobileCta";
import { OverviewSection3 } from "./components/OverviewSection3";
import { PricingSection3 } from "./components/PricingSection3";
import { ProjectLegal } from "./components/ProjectLegal";
import { VideoSection } from "./components/VideoSection";
import { EnquiryPopup } from "./ui/EnquiryPopup";
import { SimilarProjects } from "./ui/SimilarProjects";
import type { ProjectData } from "./types";

// Landing 3 layout. The layout is fixed, only `project` (from projects/data/projects.json) changes.
// Header and footer come from the project layout (app/(project)/[projectName]/layout.tsx).
export default function Landing3Page({ project }: { project: ProjectData }) {
  return (
    <>
      <Hero3 project={project} />
      <Highlights3 project={project} />
      <OverviewSection3 project={project} />
      <GallerySection project={project} />
      <VideoSection project={project} />
      <PricingSection3 project={project} />
      <AmenitiesSection project={project} />
      <LocationSection3 project={project} />
      <ContactSection project={project} />
      <FaqSection project={project} />
      <SimilarProjects projects={project.similarProjects} />
      <ProjectLegal project={project} />
      <MobileCta />
      <EnquiryPopup project={project} />
    </>
  );
}
