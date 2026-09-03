import 'server-only';

/**
 * Newsletter provider adapter.
 *
 * Everything above this file talks to `subscribe()` only, so switching
 * from MailerLite to Brevo (or anything else) means adding one function
 * here — no changes to the route or the form.
 *
 * Double opt-in is deliberately left to the provider: it sends the
 * confirmation mail and only counts the address once the visitor clicks,
 * which is what makes the consent defensible under RODO.
 */

const PROVIDER = process.env.NEWSLETTER_PROVIDER ?? 'mailerlite';

export async function subscribe(email) {
  const provider = PROVIDERS[PROVIDER];

  if (!provider) {
    return {
      ok: false,
      reason: `Unknown NEWSLETTER_PROVIDER: ${PROVIDER}`,
      message: 'Newsletter jest chwilowo niedostępny.',
      status: 500,
    };
  }

  return provider(email);
}

/* ─── MailerLite ─────────────────────────────────────── */
async function mailerlite(email) {
  const key = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!key) {
    // Fail loudly rather than pretending it worked — a silent success
    // here means quietly losing every signup.
    return {
      ok: false,
      reason: 'MAILERLITE_API_KEY is not set',
      message: 'Zapis do newslettera nie jest jeszcze skonfigurowany.',
      status: 503,
    };
  }

  let res;
  try {
    res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        email,
        status: 'unconfirmed',            // triggers the double opt-in mail
        ...(groupId ? { groups: [groupId] } : {}),
      }),
    });
  } catch (err) {
    return {
      ok: false,
      reason: `MailerLite request failed: ${err.message}`,
      message: 'Nie udało się połączyć z serwisem newslettera.',
      status: 502,
    };
  }

  // 200/201 both mean accepted; MailerLite returns 200 for an existing address.
  if (res.ok) return { ok: true };

  if (res.status === 422) {
    return {
      ok: false,
      reason: 'MailerLite rejected the address (422)',
      message: 'Ten adres wygląda na nieprawidłowy.',
      status: 400,
    };
  }

  const detail = await res.text().catch(() => '');
  return {
    ok: false,
    reason: `MailerLite responded ${res.status}: ${detail.slice(0, 200)}`,
    message: 'Nie udało się zapisać. Spróbuj ponownie za chwilę.',
    status: 502,
  };
}

/* ─── Brevo (fallback if the contact list outgrows MailerLite's free tier) ─── */
async function brevo(email) {
  const key = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  if (!key) {
    return {
      ok: false,
      reason: 'BREVO_API_KEY is not set',
      message: 'Zapis do newslettera nie jest jeszcze skonfigurowany.',
      status: 503,
    };
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': key,
      },
      body: JSON.stringify({
        email,
        includeListIds: listId ? [Number(listId)] : undefined,
        templateId: Number(process.env.BREVO_OPTIN_TEMPLATE_ID ?? 0) || undefined,
        redirectionUrl: process.env.BREVO_REDIRECT_URL,
      }),
    });

    if (res.ok) return { ok: true };

    const detail = await res.text().catch(() => '');
    return {
      ok: false,
      reason: `Brevo responded ${res.status}: ${detail.slice(0, 200)}`,
      message: 'Nie udało się zapisać. Spróbuj ponownie za chwilę.',
      status: 502,
    };
  } catch (err) {
    return {
      ok: false,
      reason: `Brevo request failed: ${err.message}`,
      message: 'Nie udało się połączyć z serwisem newslettera.',
      status: 502,
    };
  }
}

const PROVIDERS = { mailerlite, brevo };

/* ─── Campaigns ──────────────────────────────────────── */

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zakleterewiry.pl';
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
));

/** Build a branded HTML email from the composer's payload.
 *
 * Email-hardened: table layout, inline styles, no web fonts (bold Arial stands
 * in for Anton), and it reads fine with images OFF — the one image is a hosted
 * PNG banner (the site OG card) that only enhances. CTAs are bulletproof
 * table-cell buttons rather than bare links. */
export function buildCampaignHtml({ intro, events = [] }) {
  const rows = events.map(e => {
    const price = e.priceFrom ? ` &middot; od ${esc(e.priceFrom)} zł` : '';
    const href = e.ticketUrl || `${SITE}/wydarzenie/${e.slug}`;
    const cta = e.ticketUrl ? 'Kup bilet' : 'Szczegóły';
    return `
      <tr><td style="padding:20px 0;border-top:1px solid #2C2618;">
        <div style="font:11px/1 'Courier New',monospace;color:#C09C18;letter-spacing:1.5px;text-transform:uppercase;">${esc(e.date)}</div>
        <div style="font:27px/1.05 Arial,Helvetica,sans-serif;font-weight:800;color:#F5F1E8;margin:7px 0;text-transform:uppercase;">${esc(e.artist)}</div>
        <div style="font:12px/1.4 'Courier New',monospace;color:#9A9484;">${esc(e.genre)} &middot; ${esc(e.venue)}${price}</div>
        <table cellpadding="0" cellspacing="0" style="margin-top:12px;"><tr>
          <td style="background:#FCCC00;border-radius:4px;">
            <a href="${esc(href)}" style="display:inline-block;padding:11px 22px;font:13px/1 Arial,Helvetica,sans-serif;font-weight:700;color:#0C0A08;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;">${cta} &rarr;</a>
          </td>
        </tr></table>
      </td></tr>`;
  }).join('');

  return `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="color-scheme" content="dark"></head>
  <body style="margin:0;padding:0;background:#0C0A08;-webkit-text-size-adjust:100%;">
    <span style="display:none;max-height:0;overflow:hidden;opacity:0;">Najbliższe wydarzenia w Zaklętych Rewirach.</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0C0A08;padding:24px 12px;">
      <tr><td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#0C0A08;border:1px solid #2C2618;border-radius:8px;overflow:hidden;">
          <!-- brand banner (hosted PNG, degrades to the gold band + wordmark when blocked) -->
          <tr><td style="background:#0C0A08;border-top:4px solid #FCCC00;">
            <a href="${SITE}" style="text-decoration:none;">
              <img src="${SITE}/opengraph-image" width="600" alt="Zaklęte Rewiry" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
            </a>
          </td></tr>
          ${intro ? `<tr><td style="padding:26px 28px 6px;font:16px/1.7 Arial,Helvetica,sans-serif;color:#D8D2C4;">${esc(intro)}</td></tr>` : ''}
          <tr><td style="padding:10px 28px 8px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
          <tr><td style="padding:22px 28px;border-top:1px solid #2C2618;font:11px/1.7 'Courier New',monospace;color:#6E6858;">
            <strong style="color:#9A9484;">Zaklęte Rewiry</strong> &middot; ul. Krakowska 100, Wrocław &middot; tel. 71 300 10 00<br>
            Newsletter otrzymujesz, bo zapisałeś się na naszej stronie. Możesz wypisać się w każdej chwili.
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

/**
 * Create and immediately send a MailerLite campaign to the newsletter group.
 * Defensive: no key → demo mode; failures return a readable reason.
 */
export async function sendCampaign({ subject, html }) {
  const key = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!key) {
    return { ok: false, status: 503, reason: 'MAILERLITE_API_KEY is not set',
      message: 'Tryb podglądu: brak klucza MailerLite, newsletter nie został wysłany.' };
  }
  if (!groupId) {
    return { ok: false, status: 503, reason: 'MAILERLITE_GROUP_ID is not set',
      message: 'Ustaw MAILERLITE_GROUP_ID — grupę odbiorców newslettera.' };
  }

  const headers = {
    'Content-Type': 'application/json', Accept: 'application/json',
    Authorization: `Bearer ${key}`,
  };

  try {
    // 1. create the campaign
    const createRes = await fetch('https://connect.mailerlite.com/api/campaigns', {
      method: 'POST', headers,
      body: JSON.stringify({
        name: subject, type: 'regular', groups: [groupId],
        emails: [{ subject, from_name: 'Zaklęte Rewiry', content: html }],
      }),
    });
    const created = await createRes.json().catch(() => ({}));
    if (!createRes.ok) {
      return { ok: false, status: 502,
        reason: `MailerLite create ${createRes.status}: ${JSON.stringify(created).slice(0, 200)}`,
        message: 'Nie udało się utworzyć kampanii w MailerLite.' };
    }

    const id = created?.data?.id;
    if (!id) return { ok: false, status: 502, reason: 'no campaign id', message: 'MailerLite nie zwrócił ID kampanii.' };

    // 2. send it now
    const sendRes = await fetch(`https://connect.mailerlite.com/api/campaigns/${id}/schedule`, {
      method: 'POST', headers, body: JSON.stringify({ delivery: 'instant' }),
    });
    if (!sendRes.ok) {
      const detail = await sendRes.text().catch(() => '');
      return { ok: false, status: 502, reason: `MailerLite schedule ${sendRes.status}: ${detail.slice(0, 160)}`,
        message: 'Kampania utworzona, ale wysyłka się nie powiodła — sprawdź ją w MailerLite.' };
    }

    return { ok: true, message: 'Newsletter wysłany do subskrybentów.' };
  } catch (err) {
    return { ok: false, status: 502, reason: `campaign request failed: ${err.message}`,
      message: 'Brak połączenia z MailerLite.' };
  }
}
