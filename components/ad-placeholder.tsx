interface AdPlaceholderProps {
  size?: 'banner' | 'sidebar' | 'inline' | 'footer';
  className?: string;
}

const sizeClasses = {
  banner: 'h-24 md:h-28',
  sidebar: 'h-64',
  inline: 'h-20 md:h-24',
  footer: 'h-20',
};

export default function AdPlaceholder({ size = 'banner', className = '' }: AdPlaceholderProps) {
  const sizeClass = sizeClasses?.[size] ?? sizeClasses?.banner;

  return (
    <div
      className={`ad-placeholder rounded-lg flex items-center justify-center ${sizeClass} ${className ?? ''}`}
    >
      <div className="text-center">
        <p className="text-gray-400 text-sm font-medium">Reklam Alanı</p>
        <p className="text-gray-300 text-xs">Google AdSense</p>
      </div>
    </div>
  );
}
