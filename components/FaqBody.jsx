import Link from 'next/link';
import Reveal, { RevealGroup } from './Reveal';
import s from './FaqBody.module.css';

/**
 * Native <details> rather than a JS accordion: it opens without hydration,
 * keyboard and screen readers get it for free, and Ctrl+F finds text inside
 * collapsed answers — which is exactly what someone hunting for the parking
 * rule is doing.
 */
export default function FaqBody({ t }) {
  return (
    <>
      <section className={'section ' + s.head}>
        <span className="section-label enter-fade d1">{t.label}</span>
        <h1 className={'display ' + s.title + ' enter-mask d2'}>{t.title}</h1>
        <p className={s.lead + ' enter d3'}>{t.lead}</p>
      </section>

      {t.groups.map((group, gi) => (
        <section key={group.name} className={'section ' + s.group}>
          <Reveal variant="mask">
            <h2 className={'display ' + s.groupName}>{group.name}</h2>
          </Reveal>

          <RevealGroup variant="up" step={60} className={s.list}>
            {group.items.map((item, i) => (
              <details key={item.q} className={s.item} open={gi === 0 && i === 0}>
                <summary className={s.q}>
                  <span className={s.qNum + ' mono'}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={s.qText}>{item.q}</span>
                  <span className={s.qIcon} aria-hidden="true" />
                </summary>
                <div className={s.a}>
                  <p className={s.aText}>{item.a}</p>
                  {item.link && (
                    <Link href={item.link.href} className={s.aLink + ' mono'}>
                      {item.link.label} →
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </RevealGroup>
        </section>
      ))}

      <section className="section">
        <Reveal variant="scale" className={s.cta}>
          <div>
            <h2 className={'display ' + s.ctaHeading}>{t.stillStuck}</h2>
            <p className={s.ctaSub}>{t.stillStuckSub}</p>
          </div>
          <Link href="/kontakt" className="btn btn-gold">{t.contactCta}</Link>
        </Reveal>
      </section>
    </>
  );
}
