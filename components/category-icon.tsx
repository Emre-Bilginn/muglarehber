import {
  Compass,
  Landmark,
  MapPin,
  MapPinned,
  Route,
  TentTree,
  UtensilsCrossed,
  Waves,
} from "lucide-react";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Compass,
  Landmark,
  MapPin,
  MapPinned,
  Route,
  TentTree,
  UtensilsCrossed,
  Waves,
};

interface CategoryIconProps {
  icon?: string | null;
  className?: string;
}

export default function CategoryIcon({ icon, className = "w-6 h-6" }: CategoryIconProps) {
  const IconComponent = iconMap[icon ?? ""] ?? MapPin;
  return <IconComponent className={className} />;
}
