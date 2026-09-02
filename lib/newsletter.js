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
