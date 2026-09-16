# Sonali Boutique

Premium, photography-first boutique website for Sonali Boutique, Dhubulia.

## Stack

- Next.js App Router + React + TypeScript
- Supabase PostgreSQL database
- Supabase Storage for persistent images
- `bcryptjs` for admin password hashing
- `jose` for signed HTTP-only admin sessions
- Plain responsive CSS

## Local setup

1. Create a Supabase project.
2. In Supabase SQL Editor, run `schema.sql`.
3. In Supabase Storage, create a **private** bucket named `sonali-gallery`.
4. Copy `.env.example` to `.env.local`.
5. Add your Supabase project URL and **service role key** to `.env.local`. Never expose the service role key in client code or commit it to Git.
6. Set `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
7. Install dependencies:

```powershell
npm install
```

8. Seed the admin, owner placeholder and the 15 supplied saree photographs into Supabase:

```powershell
npm run db:setup
```

9. Start development:

```powershell
npm run dev
```

Open `http://localhost:3000`.

Admin login: `http://localhost:3000/admin/login`
Client gallery: `http://localhost:3000/client-gallery`

## Supabase storage

The application uses the server-side Supabase service role only. The bucket stays private, and the server creates time-limited signed image URLs for public pages and the client dashboard.

## Security

- Do not commit `.env.local`.
- Do not put `SUPABASE_SERVICE_ROLE_KEY` in `NEXT_PUBLIC_*` variables.
- Use a strong `AUTH_SECRET` and strong admin password in production.
- Uploaded images are limited to JPG/JPEG/PNG/WEBP and 6 MB.
