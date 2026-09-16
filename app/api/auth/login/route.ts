import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';
import { createSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 400 });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const { data: user, error } = await supabase
      .from('users')
      .select('id,email,password_hash,role')
      .eq('email', normalizedEmail)
      .eq('role', 'admin')
      .maybeSingle();
    if (error) throw error;
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }
    await createSession(user.id, user.email);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Login service unavailable.' }, { status: 500 });
  }
}
