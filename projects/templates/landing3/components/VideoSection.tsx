import { SectionHeading } from "@/projects/templates/landing3/ui/SectionHeading";
import { VideoPlayer } from "@/projects/templates/landing3/ui/VideoPlayer";
import type { ProjectData } from "@/projects/templates/landing3/types";

export function VideoSection({ project }: { project: ProjectData }) {
  // No videos, no section.
  if (project.videos.length === 0) return null;
  return (
    <section
      id="videos"
      className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28"
    >
      <SectionHeading title="Videos" />
      <div className="grid gap-8 md:grid-cols-2">
        {project.videos.map((v) => (
          <figure key={v.src}>
            <VideoPlayer video={v} />
            <figcaption className="mt-3 text-sm text-navy/75">
              {v.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
