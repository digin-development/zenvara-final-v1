import Image from "next/image";
import { SectionHeading } from "@/projects/templates/landing3/ui/SectionHeading";
import { AmenityIcon } from "@/projects/templates/landing3/ui/AmenityIcon";
import type { Amenity, ProjectData } from "@/projects/templates/landing3/types";

type FeaturedAmenity = Amenity & { image: NonNullable<Amenity["image"]> };

export function AmenitiesSection({ project }: { project: ProjectData }) {
  const { amenities } = project;
  // Featured amenities get a photo card. A featured amenity without an image falls back to the icon list.
  const hasPhotoCard = (a: Amenity): a is FeaturedAmenity => Boolean(a.isFeatured && a.image);
  const featured = amenities.filter(hasPhotoCard);
  const others = amenities.filter((a) => !hasPhotoCard(a));

  return (
    <section id="amenities" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title="Amenities" />

        {featured.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((a) => (
              <article key={a.name} className="group relative aspect-[4/3] overflow-hidden bg-navy">
                <Image
                  src={a.image.src}
                  alt={a.image.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-serif text-3xl">{a.name}</h3>
                  <p className="mt-1 text-sm text-white/80">{a.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        {others.length > 0 && (
          <ul className={`grid grid-cols-2 gap-px border border-beige bg-beige md:grid-cols-4 ${featured.length > 0 ? "mt-12" : ""}`}>
            {others.map((a) => (
              <li key={a.name} className="flex items-center gap-4 bg-ivory p-5">
                <AmenityIcon name={a.icon} className="h-7 w-7 shrink-0 text-gold" />
                <span className="text-sm">{a.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
