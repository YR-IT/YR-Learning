import React from 'react';

/**
 * Strips outer asterisks or hashes from headings:
 * e.g. "**1. Web Development**" -> "1. Web Development"
 * e.g. "**Course Overview:**" -> "Course Overview:"
 */
function cleanHeadingText(str) {
  if (!str) return '';
  let cleaned = str.trim();
  // Strip outer triple or double asterisks
  cleaned = cleaned.replace(/^(\*{2,3})/, '').replace(/(\*{2,3})$/, '').trim();
  return cleaned;
}

/**
 * Parses inline markdown:
 * - [text](url) -> <a> link
 * - ***bold italic*** -> <strong><em>
 * - **bold text** -> <strong>
 * - *italic text* -> <em>
 * - `inline code` -> <code>
 */
function renderInline(str) {
  if (!str) return null;

  // Tokenize markdown elements: links, bold-italic, bold, code, italic
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*\*[^*]+?\*\*\*|\*\*[^*]+?\*\*|`[^`]+?`|\*[^*]+?\*)/g;
  const parts = str.split(tokenRegex);

  return parts.map((part, i) => {
    if (!part) return null;

    // Markdown Link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const linkUrl = linkMatch[2];
      const isExternal = linkUrl.startsWith('http://') || linkUrl.startsWith('https://');

      return (
        <a
          key={i}
          href={linkUrl}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="font-semibold text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          {linkText}
        </a>
      );
    }

    // Bold + Italic: ***text***
    if (part.startsWith('***') && part.endsWith('***') && part.length >= 6) {
      const inner = part.slice(3, -3);
      return (
        <strong key={i} className="font-bold text-slate-900 dark:text-white">
          <em className="italic">{renderInline(inner)}</em>
        </strong>
      );
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={i} className="font-bold text-slate-900 dark:text-white">
          {renderInline(inner)}
        </strong>
      );
    }

    // Inline Code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-200/90 dark:bg-gray-700/80 font-mono text-[11px] sm:text-xs text-indigo-700 dark:text-indigo-300 font-semibold"
        >
          {inner}
        </code>
      );
    }

    // Italic: *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <em key={i} className="italic text-slate-800 dark:text-gray-200">
          {inner}
        </em>
      );
    }

    // Plain text: convert internal paths like /enroll, /courses, /contact to links if stand-alone
    return part;
  });
}

export default function FormattedChatMessage({ text = '', isUser = false }) {
  if (isUser) {
    return <p className="whitespace-pre-wrap leading-relaxed">{text}</p>;
  }

  // Split message into lines for block-level parsing
  const rawLines = text.split('\n');
  const blocks = [];
  let inCodeBlock = false;
  let codeBuffer = [];
  let codeLanguage = '';

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();

    // Check for code block start/end
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        blocks.push({
          type: 'code',
          content: codeBuffer.join('\n'),
          language: codeLanguage,
        });
        codeBuffer = [];
        codeLanguage = '';
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLanguage = trimmed.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Empty line (spacer)
    if (!trimmed) {
      blocks.push({ type: 'empty' });
      continue;
    }

    // Horizontal Rule: ---, ***, ___
    if (/^([-*_]){3,}$/.test(trimmed)) {
      blocks.push({ type: 'divider' });
      continue;
    }

    // Markdown Headers: #, ##, ###, ####, #####
    const headerMatch = trimmed.match(/^(#{1,5})\s+(.+)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const content = cleanHeadingText(headerMatch[2]);
      blocks.push({ type: `h${level}`, text: content });
      continue;
    }

    // Standalone bold heading:
    // e.g. **Why Choose This Course:** or **1. Web Development Course** or **Curriculum & What You Will Learn:**
    // Matches if the entire line is wrapped in **...** (with optional trailing colon or spaces)
    const standaloneBoldMatch = trimmed.match(/^(\*{2,3})([^*]+?)(\*{2,3})[:\s]*$/);
    if (standaloneBoldMatch) {
      const headingContent = standaloneBoldMatch[2].trim();
      // Keep any trailing colon if desired or clean it
      const trailingColon = trimmed.endsWith(':') ? ':' : '';
      blocks.push({
        type: 'heading-bold',
        text: `${headingContent}${trailingColon}`,
      });
      continue;
    }

    // Bullet points or numbered lists
    // Handles "-", "*", "•", or "1." "2."
    const listMatch = line.match(/^(\s*)([-*•]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      const indent = listMatch[1].length;
      const marker = listMatch[2];
      const content = listMatch[3];
      blocks.push({
        type: 'list-item',
        marker,
        isNumber: /^\d+\./.test(marker),
        indent,
        text: content,
      });
      continue;
    }

    // Regular paragraph line
    blocks.push({ type: 'paragraph', text: line });
  }

  // Flush any open code block
  if (inCodeBlock && codeBuffer.length > 0) {
    blocks.push({
      type: 'code',
      content: codeBuffer.join('\n'),
      language: codeLanguage,
    });
  }

  return (
    <div className="space-y-1 text-sm leading-relaxed text-slate-800 dark:text-slate-100">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'code':
            return (
              <div
                key={idx}
                className="my-2 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-md"
              >
                {block.language && (
                  <div className="px-3 py-1 bg-slate-800/80 text-[10px] uppercase font-mono font-bold text-slate-400 border-b border-slate-700/50">
                    {block.language}
                  </div>
                )}
                <pre className="p-3 text-xs font-mono text-emerald-300 overflow-x-auto selection:bg-emerald-900">
                  <code>{block.content}</code>
                </pre>
              </div>
            );

          case 'h1':
            return (
              <h2
                key={idx}
                className="font-extrabold text-base sm:text-lg mt-3.5 mb-1.5 text-blue-600 dark:text-blue-400 tracking-tight"
              >
                {renderInline(block.text)}
              </h2>
            );

          case 'h2':
            return (
              <h3
                key={idx}
                className="font-bold text-sm sm:text-base mt-3 mb-1 text-indigo-600 dark:text-indigo-400 tracking-tight"
              >
                {renderInline(block.text)}
              </h3>
            );

          case 'h3':
            return (
              <h4
                key={idx}
                className="font-bold text-xs sm:text-sm mt-2.5 mb-1 text-slate-900 dark:text-white flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>{renderInline(block.text)}</span>
              </h4>
            );

          case 'h4':
          case 'h5':
            return (
              <h5
                key={idx}
                className="font-bold text-xs sm:text-xs mt-2 mb-0.5 text-slate-900 dark:text-slate-100 uppercase tracking-wide"
              >
                {renderInline(block.text)}
              </h5>
            );

          case 'heading-bold':
            return (
              <div
                key={idx}
                className="font-bold text-sm sm:text-[15px] mt-3 mb-1 text-slate-900 dark:text-white flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shrink-0" />
                <span className="font-bold">{renderInline(block.text)}</span>
              </div>
            );

          case 'list-item':
            return (
              <div
                key={idx}
                className="flex items-start gap-2 my-1"
                style={{ paddingLeft: `${Math.min(block.indent * 8, 24)}px` }}
              >
                {block.isNumber ? (
                  <span className="text-blue-600 dark:text-blue-400 font-bold select-none text-xs shrink-0 mt-0.5 min-w-[1.1rem]">
                    {block.marker}
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 mt-2 shrink-0 select-none" />
                )}
                <div className="flex-1 text-slate-800 dark:text-slate-200">
                  {renderInline(block.text)}
                </div>
              </div>
            );

          case 'divider':
            return <hr key={idx} className="my-2.5 border-slate-200 dark:border-gray-700/60" />;

          case 'empty':
            return <div key={idx} className="h-1.5" />;

          case 'paragraph':
          default:
            return (
              <p key={idx} className="text-slate-800 dark:text-slate-200 my-1 leading-relaxed">
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
