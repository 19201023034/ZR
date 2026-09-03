import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const ALLOWED = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' };
const MAX = 6 * 1024 * 1024; // 6 MB
const READ_ONLY = new Set(['EROFS', 'EACCES', 'EPERM']);

function safeSlug(name) {
  return name.replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, c => ({ ą:'a',ć:'c',ę:'e',ł:'l',ń:'n',ó:'o',ś:'s',ź:'z',ż:'z' }[c]))
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'foto';
}

export async function POST(request) {
  let form;
  try { form = await request.formData(); }
  catch { return NextResponse.json({ error: 'Nieprawidłowe żądanie.' }, { status: 400 }); }

  const file = form.get('file');
  if (!file || typeof file.arrayBuffer !== 'function') {
    return NextResponse.json({ error: 'Nie wybrano pliku.' }, { status: 400 });
  }
  const ext = ALLOWED[file.type];
  if (!ext) return NextResponse.json({ error: 'Dozwolone formaty: JPG, PNG, WEBP, AVIF.' }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: 'Plik za duży (max 6 MB).' }, { status: 400 });

  const buf = Buffer.from(await file.arrayBuffer());
  const name = `${safeSlug(file.name)}-${Date.now().toString(36)}.${ext}`;
  const dir = path.join(process.cwd(), 'public', 'assets', 'events');

  try {
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), buf);
  } catch (err) {
    if (READ_ONLY.has(err.code)) {
      return NextResponse.json(
        { error: 'Tryb demo: to środowisko nie zapisuje plików. W produkcji zdjęcia idą do magazynu (np. Supabase Storage).' },
        { status: 503 }
      );
    }
    throw err;
  }

  return NextResponse.json({ url: `/assets/events/${name}` });
}
