export interface FallbackCategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export const fallbackCategories: FallbackCategory[] = [
  {
    slug: 'gezilecek-yerler',
    name: 'Gezilecek Yerler',
    description: "Mugla'nin tarihi ve dogal guzellikleri",
    icon: 'Landmark',
    order: 1,
  },
  {
    slug: 'plajlar',
    name: 'Plajlar',
    description: "Mugla'nin en guzel plajlari ve koylari",
    icon: 'Waves',
    order: 2,
  },
  {
    slug: 'restoranlar-kafeler',
    name: 'Restoranlar',
    description: "Mugla'da yeme icme rehberi",
    icon: 'Utensils',
    order: 3,
  },
  {
    slug: 'oteller-konaklama',
    name: 'Oteller ve Konaklama',
    description: 'Her butceye uygun konaklama secenekleri',
    icon: 'Hotel',
    order: 4,
  },
  {
    slug: 'aktiviteler',
    name: 'Aktiviteler',
    description: 'Su sporlari, doga yuruyusleri ve macera',
    icon: 'Mountain',
    order: 5,
  },
  {
    slug: 'gece-hayati',
    name: 'Gece Hayati',
    description: 'Eglence mekanlari ve gece kulupleri',
    icon: 'Music',
    order: 6,
  },
  {
    slug: 'ulasim-rehberi',
    name: 'Ulasim Rehberi',
    description: "Mugla'ya nasil gidilir?",
    icon: 'Plane',
    order: 7,
  },
];

export function getFallbackCategory(slug: string) {
  return fallbackCategories.find((category) => category.slug === slug) ?? null;
}
