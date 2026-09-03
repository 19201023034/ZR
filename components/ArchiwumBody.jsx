import Link from 'next/link';
import { ARTISTS_ARCHIVE, formatDate } from '@/lib/events';
import s from './ArchiwumBody.module.css';

export default function ArchiwumBody({ past = [] }) {
  const byYear = past.reduce((acc, e) => {
    const y = e.date.slice(0, 4);
    (acc[y] ??= []).push(e);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort().reverse();

  return (
    <>
      <section className={'section ' + s.intro}>
        <span className="section-label enter-fade d1">Archiwum</span>
        <h1 className={'display ' + s.heading + ' enter-mask d2'}>Grali u nas</h1>
        <p className={s.sub + ' enter d3'}>
          Ponad dekada koncertów przy Krakowskiej 100. Poniżej wydarzenia, które
          już się odbyły, oraz artyści, którzy przewinęli się przez naszą scenę.
        </p>
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
                    <span className={s.rowDate + ' mono'}>{formatDate(e.date)}</span>
                    <span className={'display ' + s.rowArtist}>{e.artist}</span>
                    <span className={s.rowMeta + ' mono'}>{e.genre} · {e.venue}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))
      ) : (
        <section className="section">
          <p className={s.empty + ' mono'}>
            Archiwum wydarzeń jest w budowie — starsze koncerty dopiero przenosimy do systemu.
          </p>
        </section>
      )}

      <section className={'section ' + s.artistsSection}>
        <span className="section-label">Wybrani artyści</span>
        <h2 className={'display ' + s.artistsHeading}>Na naszej scenie</h2>
        <div className={s.artists}>
          {ARTISTS_ARCHIVE.map(name => (
            <span key={name} className={'display ' + s.artistName}>{name}</span>
          ))}
        </div>
      </section>

      <section className={'section ' + s.cta}>
        <div className={s.ctaInner}>
          <h2 className={'display ' + s.ctaHeading}>Chcesz zagrać u nas?</h2>
          <div className={s.ctaActions}>
            <Link href="/kontakt" className="btn btn-gold">Wyślij propozycję</Link>
            <Link href="/repertuar" className="btn btn-outline">Nadchodzące</Link>
          </div>
        </div>
      </section>
    </>
  );
}
