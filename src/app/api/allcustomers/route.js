// src/app/api/allcustomers/route.js
import { NextResponse } from 'next/server';

// 末尾スラッシュを削るユーティリティ
const trim = (s) => (s || '').replace(/\/+$/, '');

const BASE = trim(process.env.NEXT_PUBLIC_API_ENDPOINT);

export const dynamic = 'force-dynamic'; // 常にSSRで取りにいく

export async function GET(req) {
  if (!BASE) {
    return NextResponse.json(
      { error: 'NEXT_PUBLIC_API_ENDPOINT is not set' },
      { status: 500 }
    );
  }

  const targetUrl = `${BASE}/allcustomers`;

  const res = await fetch(targetUrl, {
    // ここはFastAPIへプロキシ
    // ヘッダは最小限でOK（Host系は付け替えられる）
    headers: { accept: 'application/json' },
    cache: 'no-store',
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return NextResponse.json(
      { error: `Upstream ${res.status}`, detail: text?.slice(0, 500) ?? '' },
      { status: 502 }
    );
  }

  // 受け取ったJSONをそのまま返す
  const data = await res.json();
  return NextResponse.json(data, { status: 200 });
}
