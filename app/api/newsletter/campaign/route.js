import { NextResponse } from 'next/server';
import { buildCampaignHtml, sendCampaign } from '@/lib/newsletter';
import { getDict } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: getDict('pl').panel.msg.badRequest }, { status: 400 }); }

  // The campaign language also drives the operator-facing messages, so an English
  // mailing reports back in English.
  const locale = body?.locale === 'en' ? 'en' : 'pl';
  const t = getDict(locale).panel;

  const subject = String(body?.subject ?? '').trim();
  if (!subject) return NextResponse.json({ error: t.noSubject }, { status: 400 });
  const html = buildCampaignHtml({
    intro: body?.intro,
    events: Array.isArray(body?.events) ? body.events : [],
    locale,
  });
  const result = await sendCampaign({ subject, html, locale });

  if (!result.ok) {
    console.error('[newsletter/campaign]', result.reason);
    return NextResponse.json({ error: result.message }, { status: result.status ?? 502 });
  }
  return NextResponse.json({ ok: true, message: result.message });
}
