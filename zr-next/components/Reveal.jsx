'use client';

import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.15, rootMargin = '0px 0px -60px 0px') {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion → show instantly, skip the observer entirely.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}

/**
 * Single scroll-reveal element.
 *   <Reveal variant="up" delay={120}>…</Reveal>
 * variant: up | fade | left | right | scale | mask | blur
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  threshold = 0.15,
  className = '',
  style,
  ...rest
}) {
  const [ref, visible] = useInView(threshold);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-visible={visible ? '' : undefined}
      className={className}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Staggered container — direct children animate in sequence.
 * Keeps grid/flex layout intact (no per-child wrapper).
 *   <RevealGroup className={s.grid} step={80}>{cards}</RevealGroup>
 */
export function RevealGroup({
  children,
  step = 80,
  variant = 'up',
  threshold = 0.1,
  className = '',
  style,
  as: Tag = 'div',
  ...rest
}) {
  const [ref, visible] = useInView(threshold);

  return (
    <Tag
      ref={ref}
      data-stagger={variant}
      data-visible={visible ? '' : undefined}
      className={className}
      style={{ ...style, '--stagger-step': `${step}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
