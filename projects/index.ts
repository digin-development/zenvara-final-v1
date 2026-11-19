import type { ProjectDefinition } from "./types";
import { sampleProject } from "./sample-project";
import { landing3Projects } from "./templates/landing3";

// Every hidden project page is registered here.
// Landing 3 projects come from projects/data/projects.json (add an object there, nothing else).
// Fully custom pages: create projects/<slug>/index.tsx and add it to this list.
const all: ProjectDefinition[] = [sampleProject, ...landing3Projects];

// These URLs already belong to the main website, so a project cannot use them.
const reserved = ["about", "services", "contact", "api", "sitemap.xml", "robots.txt"];
for (const project of all) {
  if (reserved.includes(project.slug)) {
    throw new Error(`Project slug "${project.slug}" is reserved by the main website.`);
  }
}

const seen = new Set<string>();
for (const project of all) {
  if (seen.has(project.slug)) {
    throw new Error(`Duplicate project slug "${project.slug}".`);
  }
  seen.add(project.slug);
}

export const projectSlugs = all.map((project) => project.slug);

export function getProject(slug: string): ProjectDefinition | undefined {
  return all.find((project) => project.slug === slug);
}
