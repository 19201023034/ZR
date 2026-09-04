import Link from 'next/link';
import { ARTISTS_ARCHIVE, formatDate, translateGenre, translateRoom } from '@/lib/events';
import s from './ArchiwumBody.module.css';

export default function ArchiwumBody({ past = [], t, locale = 'pl' }) {
  const ta = t.archiwum;
  const byYear = past.reduce((acc, e) => {
    const y = e.date.slice(0, 4);
    (acc[y] ??= []).push(e);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort().reverse();

  return (
    <>
      <section className={'section ' + s.intro}>
        <span className="section-label enter-fade d1">{ta.label}</span>
        <h1 className={'display ' + s.heading + ' enter-mask d2'}>{ta.title}</h1>
        <p className={s.sub + ' enter d3'}>{ta.sub}</p>
      </section>

      {years.length > 0 ? (
        years.map(year => (
          <section key={year} className={s.year}>
            <div className={s.yearHead}>
              <h2 className={'display ' + s.yearLabel}>{year}</h2>
              <span className={s.yearCount + ' mono'}>{byYear[year].length}</span>
            </div>
            <div className={s.grid}>
              {byYear[year].map(e => (
                <Link key={e.id} href={`/wydarzenie/${e.slug}`} className={s.card}>
                  <div className={'led-grid ' + s.poster}>
                    {e.poster && <img src={e.poster} alt={e.artist} className={s.posterImg} />}
                  </div>
                  <div className={s.cardBody}>
                    <span className={s.rowDate + ' mono'}>{formatDate(e.date, locale)}</span>
                    <span className={'display ' + s.rowArtist}>{e.artist}</span>
                    <span className={s.rowMeta + ' mono'}>{translateGenre(e.genre, locale)} · {translateRoom(e.venue, locale)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))
      ) : (
        <section className="section">
          <p className={s.empty + ' mono'}>{ta.empty}</p>
        </section>
      )}

      <section className={'section ' + s.artistsSection}>
        <span className="section-label">{ta.artistsLabel}</span>
        <h2 className={'display ' + s.artistsHeading}>{ta.artistsHeading}</h2>
        <div className={s.artists}>
          {ARTISTS_ARCHIVE.map(name => (
            <span key={name} className={'display ' + s.artistName}>{name}</span>
          ))}
        </div>
      </section>

      <section className={'section ' + s.cta}>
        <div className={s.ctaInner}>
          <h2 className={'display ' + s.ctaHeading}>{ta.ctaHeading}</h2>
          <div className={s.ctaActions}>
            <Link href="/kontakt" className="btn btn-gold">{ta.ctaSend}</Link>
            <Link href="/repertuar" className="btn btn-outline">{ta.ctaUpcoming}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
