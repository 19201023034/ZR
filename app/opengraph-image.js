import { ImageResponse } from 'next/og';
import { loadAnton, OG } from '@/lib/og';

export const alt = 'Zaklęte Rewiry — klub koncertowy i wynajem sal, Wrocław';
export const size = OG.size;
export const contentType = 'image/png';

export default async function Image() {
  const anton = await loadAnton();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: OG.bg,
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* gold rule top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: OG.gold }} />
        {/* warm floor glow */}
        <div
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, height: 320,
            background: 'radial-gradient(60% 100% at 50% 100%, rgba(252,204,0,0.16), transparent 70%)',
          }}
        />

        <div style={{ display: 'flex', fontFamily: 'Anton', fontSize: 26, letterSpacing: 6, color: OG.goldDim }}>
          KLUB KONCERTOWY · WROCŁAW
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'Anton', fontSize: 150, lineHeight: 0.9, color: OG.text, textTransform: 'uppercase' }}>
            Zaklęte
          </div>
          <div style={{ fontFamily: 'Anton', fontSize: 150, lineHeight: 0.9, color: OG.gold, textTransform: 'uppercase' }}>
            Rewiry
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', fontSize: 30, color: OG.body }}>
            ul. Krakowska 100 · Koncerty i wynajem sal
          </div>
          <div style={{ display: 'flex', fontFamily: 'Anton', fontSize: 30, color: OG.goldDim, letterSpacing: 2 }}>
            zakleterewiry.pl
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Anton', data: anton, style: 'normal', weight: 400 }] }
  );
}
