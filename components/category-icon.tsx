import { Landmark, Waves, Utensils, Hotel, Mountain, Music, Plane, MapPin } from 'lucide-react';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Landmark,
  Waves,
  Utensils,
  Hotel,
  Mountain,
  Music,
  Plane,
  MapPin,
};

interface CategoryIconProps {
  icon?: string | null;
  className?: string;
}

export default function CategoryIcon({ icon, className = 'w-6 h-6' }: CategoryIconProps) {
  const IconComponent = iconMap?.[icon ?? ''] ?? MapPin;
  return <IconComponent className={className ?? ''} />;
}
