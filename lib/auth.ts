import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-only-secret-change-me');
const COOKIE = 'sonali_session';

export async function createSession(userId: number, email: string) {
  const token = await new SignJWT({ sub: String(userId), email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret);
  const store = await cookies();
  store.set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 });
}

export async function getSession() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== 'admin' || !payload.sub) return null;
    return { id: Number(payload.sub), email: String(payload.email || '') };
  } catch { return null; }
}

export async function clearSession() {
  (await cookies()).set(COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
}
