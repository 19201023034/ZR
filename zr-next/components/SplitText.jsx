'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Splits a string into per-character spans that slide up from behind a
 * mask, one after another. Spaces become non-breaking so words hold together.
 *
 * The observed wrapper is never clipped to zero — only the inner spans move —
 * otherwise the IntersectionObserver rect would collapse and never fire.
 */
export default function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  step = 32,
  delay = 0,
  immediate = false,   // above the fold → animate on mount, skip the observer
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    if (immediate) {
      const t = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(t);
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  const chars = [...String(text)];

  return (
    <Tag
      ref={ref}
      className={'split ' + className}
      data-visible={visible ? '' : undefined}
      style={style}
      {...rest}
    >
      {/* readable label for AT + copy/paste; the spans are decorative */}
      <span className="split-sr">{text}</span>
      {chars.map((c, i) => (
        <span className="split-char" key={i} aria-hidden="true">
          <span
            className="split-inner"
            style={{ transitionDelay: `${delay + i * step}ms` }}
          >
            {c === ' ' ? ' ' : c}
          </span>
        </span>
      ))}
    </Tag>
  );
}
