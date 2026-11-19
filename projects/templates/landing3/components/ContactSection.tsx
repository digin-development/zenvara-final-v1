import { SectionHeading } from "@/projects/templates/landing3/ui/SectionHeading";
import { EnquiryForm } from "@/projects/templates/landing3/ui/EnquiryForm";
import { EnquiryButton } from "@/projects/templates/landing3/ui/EnquiryButton";
import type { ProjectData } from "@/projects/templates/landing3/types";

export function ContactSection({ project }: { project: ProjectData }) {
  const { contact, configurations } = project;
  return (
    <section id="contact" className="bg-navy py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            title="Get project details"
            intro="Share your details and our team will call you with current prices, availability and site visit options."
            onDark
          />
          <ul className="space-y-2 text-white/85">
            {contact.phone && <li><a href={`tel:${contact.phone}`} className="hover:text-gold">{contact.phone}</a></li>}
            {contact.email && <li><a href={`mailto:${contact.email}`} className="hover:text-gold">{contact.email}</a></li>}
          </ul>
          <EnquiryButton trigger="Contact - Request Brochure" variant="onDark" className="mt-8">
            Request Brochure
          </EnquiryButton>
        </div>
        <div className="text-navy">
          <EnquiryForm
            configurations={configurations.map((c) => c.name)}
            source={`project:${project.slug}`}
            projectName={project.name}
            trigger="Contact section form"
          />
        </div>
      </div>
    </section>
  );
}
