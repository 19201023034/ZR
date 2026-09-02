export async function POST(request) {
  const data = await request.json().catch(() => null);
  if (!data?.email) {
    return Response.json({ error: 'Brak adresu e-mail' }, { status: 400 });
  }
  // TODO: save to DB / send to Mailchimp / etc.
  console.log('Newsletter signup:', data.email);
  return Response.json({ ok: true });
}
