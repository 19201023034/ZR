'use client';

import { useEffect, useRef, useState } from 'react';

const easeOutExpo = t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts up to a numeric value when scrolled into view.
 * Accepts decorated strings: "10+", "1000", "550", "85+", "3".
 * Prefix/suffix are preserved, only the digits animate.
 */
export default function Counter({ value, duration = 1500, className = '', style }) {
  const raw = String(value);
  const match = raw.match(/^(\D*?)([\d\s.,]+)(.*)$/);

  const prefix = match ? match[1] : '';
  const numStr = match ? match[2].trim() : '';
  const suffix = match ? match[3] : '';
  const target = match ? parseFloat(numStr.replace(/\s/g, '').replace(',', '.')) : NaN;
  const animatable = match && !Number.isNaN(target);

  const ref = useRef(null);
  const [display, setDisplay] = useState(animatable ? 0 : raw);

  useEffect(() => {
    if (!animatable) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(target);
      return;
    }

    let frame;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const start = performance.now();
        const tick = now => {
          const t = Math.min((now - start) / duration, 1);
          setDisplay(target * easeOutExpo(t));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [animatable, target, duration]);

  if (!animatable) {
    return <span className={className} style={style}>{raw}</span>;
  }

  // Match the source formatting: integers stay integers.
  const isInt = Number.isInteger(target);
  const shown = isInt
    ? Math.round(display).toLocaleString('pl-PL')
    : display.toFixed(1).replace('.', ',');

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{shown}{suffix}
    </span>
  );
}
