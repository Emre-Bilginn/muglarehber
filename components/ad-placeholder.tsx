type AdPlaceholderProps = {
  size?: "banner" | "sidebar" | "inline" | "footer";
  className?: string;
  label?: string;
};

const sizeClasses = {
  banner: "min-h-[104px]",
  sidebar: "min-h-[320px]",
  inline: "min-h-[96px]",
  footer: "min-h-[88px]",
};

export default function AdPlaceholder({
  size = "banner",
  className = "",
  label = "İleride reklam alanı olarak kullanılabilir",
}: AdPlaceholderProps) {
  return (
    <aside
      aria-label="Reklam alanı taslak yerleşimi"
      className={`ad-placeholder rounded-[2rem] px-6 py-5 ${sizeClasses[size]} ${className}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        Reklam Alanı
      </p>
      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">{label}</p>
    </aside>
  );
}
