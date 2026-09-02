import { ImageResponse } from 'next/og';
import { loadAnton, OG } from '@/lib/og';
import { getEventBySlug } from '@/lib/store';
import { formatDate, getStatusLabel } from '@/lib/events';

export const alt = 'Wydarzenie w Zaklętych Rewirach';
export const size = OG.size;
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { slug } = await params;
  const [anton, event] = await Promise.all([loadAnton(), getEventBySlug(slug)]);

  // Unknown slug → fall back to a clean branded card rather than crashing.
  const artist = event?.artist ?? 'Zaklęte Rewiry';
  const when = event ? formatDate(event.date) : 'ul. Krakowska 100 · Wrocław';
  const line2 = event
    ? [event.genre, event.venue, event.priceFrom ? `od ${event.priceFrom} zł` : null].filter(Boolean).join('  ·  ')
    : 'Klub koncertowy';
  const status = event ? getStatusLabel(event) : '';

  // Long names need to step down or they overflow the card.
  const fontSize = artist.length > 22 ? 96 : artist.length > 14 ? 120 : 150;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', background: OG.bg, padding: '68px 80px', position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: OG.gold }} />
        <div
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, height: 340,
            background: 'radial-gradient(60% 100% at 50% 100%, rgba(252,204,0,0.15), transparent 70%)',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', fontFamily: 'Anton', fontSize: 28, letterSpacing: 4, color: OG.goldDim }}>
            {when.toUpperCase()}
          </div>
          {status ? (
            <div style={{ display: 'flex', fontFamily: 'Anton', fontSize: 22, letterSpacing: 3, color: OG.muted }}>
              {status.toUpperCase()}
            </div>
          ) : <div style={{ display: 'flex' }} />}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontFamily: 'Anton', fontSize, lineHeight: 0.9, color: OG.gold, textTransform: 'uppercase' }}>
            {artist}
          </div>
          <div style={{ display: 'flex', fontSize: 32, color: OG.body }}>{line2}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', fontSize: 26, color: OG.muted }}>
            Zaklęte Rewiry · ul. Krakowska 100, Wrocław
          </div>
          <div style={{ display: 'flex', fontFamily: 'Anton', fontSize: 28, color: OG.goldDim, letterSpacing: 2 }}>
            zakleterewiry.pl
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Anton', data: anton, style: 'normal', weight: 400 }] }
  );
}
