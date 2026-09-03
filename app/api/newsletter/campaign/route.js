import { NextResponse } from 'next/server';
import { buildCampaignHtml, sendCampaign } from '@/lib/newsletter';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: 'Nieprawidłowe żądanie.' }, { status: 400 }); }

  const subject = String(body?.subject ?? '').trim();
  if (!subject) return NextResponse.json({ error: 'Podaj temat wiadomości.' }, { status: 400 });

  const html = buildCampaignHtml({ intro: body?.intro, events: Array.isArray(body?.events) ? body.events : [] });
  const result = await sendCampaign({ subject, html });

  if (!result.ok) {
    console.error('[newsletter/campaign]', result.reason);
    return NextResponse.json({ error: result.message }, { status: result.status ?? 502 });
  }
  return NextResponse.json({ ok: true, message: result.message });
}
