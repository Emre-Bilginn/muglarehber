import Link from "next/link";
import type { ReactNode } from "react";

function slugifyHeading(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function renderInline(value: string) {
  const tokens =
    value.match(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g) ?? [];

  if (tokens.length === 0) {
    return value;
  }

  const result: ReactNode[] = [];
  let cursor = 0;

  for (const token of tokens) {
    const index = value.indexOf(token, cursor);

    if (index > cursor) {
      result.push(value.slice(cursor, index));
    }

    if (token.startsWith("**") && token.endsWith("**")) {
      result.push(
        <strong key={`${token}-${index}`} className="font-semibold text-slate-950">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const match = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

      if (match) {
        result.push(
          <Link
            key={`${token}-${index}`}
            href={match[2]}
            className="font-medium text-sky-700 underline decoration-sky-300 underline-offset-4 hover:text-sky-800"
          >
            {match[1]}
          </Link>,
        );
      }
    }

    cursor = index + token.length;
  }

  if (cursor < value.length) {
    result.push(value.slice(cursor));
  }

  return result;
}

export default function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];
  let quoteBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) {
      return;
    }

    blocks.push(
      <p key={`paragraph-${blocks.length}`} className="text-base leading-8 text-slate-700">
        {renderInline(paragraphBuffer.join(" "))}
      </p>,
    );
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (listBuffer.length === 0) {
      return;
    }

    blocks.push(
      <ul
        key={`list-${blocks.length}`}
        className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 text-slate-700"
      >
        {listBuffer.map((item, index) => (
          <li key={`${item}-${index}`} className="flex gap-3 leading-7">
            <span className="mt-2 h-2 w-2 rounded-full bg-sky-600" />
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  const flushQuote = () => {
    if (quoteBuffer.length === 0) {
      return;
    }

    blocks.push(
      <aside
        key={`quote-${blocks.length}`}
        className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-5 text-slate-700"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">
          Editör Notu
        </p>
        <p className="mt-3 leading-7">{renderInline(quoteBuffer.join(" "))}</p>
      </aside>,
    );
    quoteBuffer = [];
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (!line) {
      flushAll();
      return;
    }

    if (line.startsWith("## ")) {
      flushAll();
      const title = line.replace(/^##\s+/, "");
      blocks.push(
        <h2
          key={`h2-${index}`}
          id={slugifyHeading(title)}
          className="scroll-mt-28 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl"
        >
          {title}
        </h2>,
      );
      return;
    }

    if (line.startsWith("### ")) {
      flushAll();
      blocks.push(
        <h3
          key={`h3-${index}`}
          className="text-xl font-semibold tracking-tight text-slate-900"
        >
          {line.replace(/^###\s+/, "")}
        </h3>,
      );
      return;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      flushQuote();
      listBuffer.push(line.replace(/^\-\s+/, ""));
      return;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      quoteBuffer.push(line.replace(/^>\s+/, ""));
      return;
    }

    flushList();
    flushQuote();
    paragraphBuffer.push(line);
  });

  flushAll();

  return <div className="space-y-6">{blocks}</div>;
}

