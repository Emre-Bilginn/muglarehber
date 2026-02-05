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
      className={`ad-placeholder rounded-2xl flex items-center justify-center ${sizeClass} ${className ?? ''}`}
      aria-hidden="true"
    >
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Reklam</p>
        <p className="text-xs text-slate-400/80">Alan ayrıldı</p>
      </div>
    </div>
  );
}
