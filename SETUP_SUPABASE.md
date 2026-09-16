# Sonali Boutique — Supabase setup

## 1. Create the Supabase project

Create a project named `sonali-boutique`.

## 2. Database

Open **SQL Editor** and run `schema.sql`.

You should see these tables under `public`:

- `users`
- `gallery_items`
- `owner_profile`

## 3. Storage

Open **Storage** → **New bucket** and create:

`sonali-gallery`

Keep the bucket **Private**. The application uses the server-side Supabase service role to upload/delete files and generates signed URLs for viewing.

## 4. Get the server credentials

In your Supabase project, open the project API/settings area and copy:

- Project URL
- `service_role` secret key

Never put the service-role key in a `NEXT_PUBLIC_*` variable, browser code, GitHub, or screenshots.

## 5. Configure the project

From PowerShell:

```powershell
cd E:\sonali-boutique-complete
Copy-Item .env.example .env.local
```

Open `.env.local` and set:

```env
SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
SUPABASE_STORAGE_BUCKET=sonali-gallery
AUTH_SECRET=YOUR_LONG_RANDOM_SECRET
ADMIN_EMAIL=owner@sonaliboutique.local
ADMIN_PASSWORD=YOUR_STRONG_ADMIN_PASSWORD
```

## 6. Install packages

```powershell
npm install
```

## 7. Seed the database and supplied images

```powershell
npm run db:setup
```

This creates/updates the admin account, creates the owner placeholder if needed, uploads the supplied gallery photographs to Supabase Storage, and creates the initial gallery records.

## 8. Start the website

```powershell
npm run dev
```

Open `http://localhost:3000`.

Admin login: `http://localhost:3000/admin/login`

Client gallery: `http://localhost:3000/client-gallery`
