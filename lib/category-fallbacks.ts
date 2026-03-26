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
    description: "Muğla'nın tarihi ve doğal güzellikleri",
    icon: 'Landmark',
    order: 1,
  },
  {
    slug: 'plajlar',
    name: 'Plajlar',
    description: "Muğla'nın en güzel plajları ve koyları",
    icon: 'Waves',
    order: 2,
  },
  {
    slug: 'restoranlar-kafeler',
    name: 'Restoranlar & Kafeler',
    description: "Muğla'da yeme-içme rehberi",
    icon: 'Utensils',
    order: 3,
  },
  {
    slug: 'oteller-konaklama',
    name: 'Oteller & Konaklama',
    description: 'Her bütçeye uygun konaklama seçenekleri',
    icon: 'Hotel',
    order: 4,
  },
  {
    slug: 'aktiviteler',
    name: 'Aktiviteler',
    description: 'Su sporları, doğa yürüyüşleri ve macera',
    icon: 'Mountain',
    order: 5,
  },
  {
    slug: 'gece-hayati',
    name: 'Gece Hayatı',
    description: 'Eğlence mekanları ve gece kulüpleri',
    icon: 'Music',
    order: 6,
  },
  {
    slug: 'ulasim-rehberi',
    name: 'Ulaşım Rehberi',
    description: "Muğla'ya nasıl gidilir?",
    icon: 'Plane',
    order: 7,
  },
];

export function getFallbackCategory(slug: string) {
  return fallbackCategories.find((category) => category.slug === slug) ?? null;
}
