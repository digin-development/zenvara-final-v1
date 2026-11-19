import type { ProjectDefinition } from "@/projects/types";
import rawProjects from "@/projects/data/projects.json";
import Landing3Page from "./Landing3Page";
import type { ProjectData } from "./types";

// projects/data/projects.json is the "database" for now. To add a project, add one more
// object to that file (same shape as the first one). The slug becomes the URL: /<slug>
// Later this can be replaced by an API or CMS call, nothing else needs to change.
const projects = rawProjects as unknown as ProjectData[];

// Header menu. Each id matches a <section id="..."> inside the landing 3 components.
const sections = [
  { id: "overview", label: "Overview" },
  { id: "gallery", label: "Gallery" },
  { id: "pricing", label: "Pricing" },
  { id: "amenities", label: "Amenities" },
  { id: "location", label: "Location" },
];

function toDefinition(data: ProjectData): ProjectDefinition {
  return {
    slug: data.slug,
    title: data.seo.title,
    description: data.seo.description,
    sections,
    // popup: true = the header button opens the enquiry popup (see ui/EnquiryPopup.tsx)
    cta: { label: "Enquire Now", popup: true },
    mobileCta: true,
    Page: () => <Landing3Page project={data} />,
  };
}

export const landing3Projects: ProjectDefinition[] = projects.map(toDefinition);
