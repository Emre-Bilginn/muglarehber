import type { ReactNode } from "react";
import SiteBreadcrumbs from "@/components/site-breadcrumbs";

type StaticPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export default function StaticPageLayout({
  eyebrow,
  title,
  description,
  children,
}: StaticPageLayoutProps) {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
          <SiteBreadcrumbs
            items={[
              { label: "Ana sayfa", href: "/" },
              { label: title },
            ]}
          />
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            {description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-6 md:p-10">
          {children}
        </div>
      </section>
    </div>
  );
}

