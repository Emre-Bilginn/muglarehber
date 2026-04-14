'use client';

import { useState } from "react";
import { Check, Copy, Mail, MessageCircle, Share2 } from "lucide-react";

type ShareLinksProps = {
  title: string;
  url: string;
};

export default function ShareLinks({ title, url }: ShareLinksProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
        <Share2 className="h-4 w-4" />
        Paylaş
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-sky-200 hover:text-sky-700"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-sky-200 hover:text-sky-700"
        >
          <Mail className="h-4 w-4" />
          E-posta
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-sky-200 hover:text-sky-700"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Kopyalandı" : "Bağlantıyı Kopyala"}
        </button>
      </div>
    </div>
  );
}

