export async function POST(request) {
  const data = await request.json().catch(() => null);
  if (!data?.email || !data?.message) {
    return Response.json({ error: 'Brak wymaganych pól' }, { status: 400 });
  }
  // TODO: send via nodemailer
  console.log('Kontakt:', data);
  return Response.json({ ok: true });
}
