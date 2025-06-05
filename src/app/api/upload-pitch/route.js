import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

export async function POST(req) {
  const data = await req.formData();
  const file = data.get('file');

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(uploadDir, filename);

  await writeFile(filepath, buffer);

  // Return URL path for frontend to access
  return NextResponse.json({ success: true, path: `/uploads/${filename}` });
}
