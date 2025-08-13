// src/app/api/[...path]/route.js
import { NextResponse } from 'next/server';

const BASE = (process.env.NEXT_PUBLIC_API_ENDPOINT || '').replace(/\/+$/, '');

async function proxy(req, { params }) {
  if (!BASE) {
    return NextResponse.json(
      { error: 'NEXT_PUBLIC_API_ENDPOINT is not set' },
      { status: 500 }
    );
  }

  // /api/xxx の xxx 部分を組み立て
  const tail = Array.isArray(params?.path) ? params.path.join('/') : '';
  const targetUrl = `${BASE}/${tail}${req.nextUrl.search}`;

  const init = {
    method: req.method,
    headers: (() => {
      const h = new Headers(req.headers);
      // FastAPI 側に不要な Host 系ヘッダは落とす
      h.delete('host');
      h.delete('x-forwarded-host');
      h.delete('x-forwarded-proto');
      return h;
    })(),
    body: ['GET', 'HEAD'].includes(req.method)
      ? undefined
      : await req.arrayBuffer(),
    duplex: 'half',
  };

  const resp = await fetch(targetUrl, init);

  const headers = new Headers(resp.headers);
  headers.delete('content-length'); // 転送時のズレ回避

  return new NextResponse(resp.body, {
    status: resp.status,
    headers,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
