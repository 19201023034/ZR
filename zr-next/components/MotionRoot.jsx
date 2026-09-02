'use client';

import { useEffect } from 'react';

/**
 * One mount point for the page-wide pointer/scroll interactions.
 * Everything is delegated from a single listener pair instead of
 * per-element handlers, and all of it is skipped under
 * prefers-reduced-motion / on coarse pointers.
 *
 *   [data-spotlight]        → --mx/--my follow the cursor (border glow)
 *   [data-magnetic]         → element drifts slightly toward the cursor
 *   [data-parallax="0.15"]  → translateY driven by scroll offset
 *   .scroll-progress        → gold bar scaled to document progress
 */
export default function MotionRoot() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;

    // ── scroll progress + parallax ──────────────────────
    const bar = document.querySelector('.scroll-progress');
    let parallaxEls = [];
    let ticking = false;

    const refreshParallax = () => {
      parallaxEls = [...document.querySelectorAll('[data-parallax]')];
    };

    const onScrollFrame = () => {
      ticking = false;
      const doc = document.documentElement;

      if (bar) {
        const max = doc.scrollHeight - doc.clientHeight;
        bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }

      if (!reduce) {
        const vh = window.innerHeight;
        for (const el of parallaxEls) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) continue;
          // -1..1 across the viewport, 0 when centred
          const progress = (r.top + r.height / 2 - vh / 2) / vh;
          const speed = parseFloat(el.dataset.parallax) || 0.12;
          el.style.setProperty('--py', `${(-progress * speed * 100).toFixed(2)}px`);
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(onScrollFrame);
    };

    refreshParallax();
    onScrollFrame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // ── pointer: spotlight + magnetic ───────────────────
    let magnetized = new Set();

    const onPointerMove = e => {
      const spot = e.target.closest?.('[data-spotlight]');
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
        spot.style.setProperty('--my', `${e.clientY - r.top}px`);
      }

      const mag = e.target.closest?.('[data-magnetic]');
      if (mag) {
        const r = mag.getBoundingClientRect();
        const strength = parseFloat(mag.dataset.magnetic) || 0.25;
        const dx = (e.clientX - (r.left + r.width / 2)) * strength;
        const dy = (e.clientY - (r.top + r.height / 2)) * strength;
        mag.style.setProperty('--tx', `${dx.toFixed(1)}px`);
        mag.style.setProperty('--ty', `${dy.toFixed(1)}px`);
        magnetized.add(mag);
      }

      // release any magnet the cursor has left
      for (const el of magnetized) {
        if (el !== mag && !el.contains(e.target)) {
          el.style.setProperty('--tx', '0px');
          el.style.setProperty('--ty', '0px');
          magnetized.delete(el);
        }
      }
    };

    if (fine && !reduce) {
      document.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    // re-collect parallax targets when the route swaps content
    const mo = new MutationObserver(refreshParallax);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('pointermove', onPointerMove);
      mo.disconnect();
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
