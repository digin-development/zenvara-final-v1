export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface GalleryImage extends ImageAsset {
  category: string;
}

export interface Highlight {
  title: string;
  description: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Configuration {
  name: string;
  /** Carpet area in sq. ft. Leave empty until confirmed (shows "On request"). */
  carpetArea?: string;
  /** Display price, e.g. "₹ 4.5 Cr onwards". Leave empty to show "Enquire for Price". */
  price?: string;
  floorPlan?: ImageAsset;
}

export interface Amenity {
  name: string;
  description: string;
  /** Key into the icon map in ui/AmenityIcon.tsx */
  icon: string;
  /** true = shown as a photo card (needs `image`). Otherwise only icon and name are shown. */
  isFeatured?: boolean;
  image?: ImageAsset;
}

export interface NearbyPlace {
  name: string;
  category: string;
  /** e.g. "2.5 km". Leave undefined until verified. */
  distance?: string;
}

export interface ProjectVideo {
  title: string;
  /** Locally hosted file or YouTube video ID. */
  type: "file" | "youtube";
  src: string;
  poster: ImageAsset;
  uploadDate?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SimilarProject {
  name: string;
  location: string;
  type: string;
  image: ImageAsset;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ProjectData {
  slug: string;
  name: string;
  tagline: string;
  propertyType: string;
  status?: string;
  possession?: string;
  /** Fallback for the hero when `possession` is empty, e.g. "2032". */
  possessionYear?: string;
  /** e.g. "5 acres". Hidden in the hero when empty. */
  projectArea?: string;
  developer: { name: string; description: string; website?: string };
  location: {
    locality: string;
    city: string;
    state: string;
    address: string;
    mapEmbedUrl: string;
  };
  rera?: { number: string; url?: string };
  heroImage: ImageAsset;
  /** Project logo shown in the legal section at the bottom. */
  logo?: ImageAsset;
  description: string[];
  highlights: Highlight[];
  /** Numbers strip under the hero. Icons are matched by position. */
  stats: Stat[];
  /** Small badges under the numbers, e.g. "RERA registered". */
  trustBadges: string[];
  specifications: Specification[];
  overviewImage: ImageAsset;
  gallery: GalleryImage[];
  videos: ProjectVideo[];
  configurations: Configuration[];
  pricingDisclaimer: string;
  amenities: Amenity[];
  nearby: NearbyPlace[];
  contact: { phone?: string; email?: string; whatsapp?: string };
  faqs: Faq[];
  similarProjects: SimilarProject[];
  seo: { title: string; description: string; socialImage: string };
  legalDisclaimer: string;
}
