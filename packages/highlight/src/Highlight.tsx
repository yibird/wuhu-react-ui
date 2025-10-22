import React, { useMemo, useRef } from 'react';
import type { HighlightProps } from './types';

export default function Highlight({
  queries,
  content = '',
  caseSensitive = false,
  diacriticsSensitive = false,
  wholeWordMatch = true,
  escapeSpecial = true,
  multiple = true,
  unicodeBoundary = false,
  highlightStyle,
  highlightClass = '',
  highlightTag = 'mark',
  onMatch,
}: HighlightProps) {
  const count = useRef(0);

  const keywordArray = useMemo(
    () => (queries == null ? [] : Array.isArray(queries) ? queries : [queries]),
    [queries]
  );

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const normalizeString = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f\u1DC0-\u1DFF\u1AB0-\u1AFF\u1F00-\u1FFF]/g, '');

  const buildPattern = (keyword: string) => {
    let word = escapeSpecial ? escapeRegExp(keyword) : keyword;
    if (!diacriticsSensitive) word = normalizeString(word);

    if (wholeWordMatch) {
      if (unicodeBoundary) {
        word = `(?<=^|[\\s,.!?，。！？])${word}(?=$|[\\s,.!?，。！？])`;
      } else {
        word = `(?<![\\p{L}\\p{N}_])${word}(?![\\p{L}\\p{N}_])`;
      }
    }
    return word;
  };

  const normalizeKeyword = (kw: string | RegExp | undefined) => {
    if (typeof kw === 'string') return buildPattern(kw);
    if (kw instanceof RegExp) return kw.source;
    return '';
  };

  const flags = useMemo(() => {
    let f = 'g';
    if (!caseSensitive) f += 'i';
    if (diacriticsSensitive) f += 'u';
    return f;
  }, [caseSensitive, diacriticsSensitive]);

  const regex = useMemo(() => {
    const pattern = multiple
      ? keywordArray.filter(Boolean).map(normalizeKeyword).join('|')
      : normalizeKeyword(keywordArray[0] || '');

    return pattern ? new RegExp(pattern, flags) : null;
  }, [keywordArray, multiple, flags]);

  const nodes = useMemo(() => {
    if (!(regex && content)) return [content];
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    count.current = 0;

    while ((match = regex.exec(content)) !== null) {
      const [text] = match;
      const start = match.index;

      // 普通文本
      if (start > lastIndex) {
        parts.push(content.slice(lastIndex, start));
      }

      // 高亮文本
      count.current++;
      const displayText = diacriticsSensitive ? text : normalizeString(text);
      if (onMatch) onMatch(displayText, count.current, start);
      parts.push(
        React.createElement(
          highlightTag,
          {
            key: `${displayText}-${start}`,
            className: highlightClass,
            style: highlightStyle,
          },
          displayText
        )
      );

      lastIndex = start + text.length;
    }

    // 末尾未匹配的内容
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts;
  }, [content, regex, highlightTag, highlightClass, highlightStyle]);

  return <>{nodes}</>;
}
