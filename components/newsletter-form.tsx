'use client';

import { Mail } from 'lucide-react';

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="flex flex-col gap-3"
    >
      <label className="sr-only" htmlFor="newsletter-email">
        E-posta adresiniz
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          <input
            id="newsletter-email"
            name="email"
            type="email"
            placeholder="E-posta adresiniz"
            className="w-full rounded-full border border-white/20 bg-white/10 px-11 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            autoComplete="email"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white/90"
        >
          Abone Ol
        </button>
      </div>
      <p className="text-xs text-white/60">
        Aylık 1-2 e-posta. İstediğiniz zaman ayrılabilirsiniz.
      </p>
    </form>
  );
}
