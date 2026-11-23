# Daisuke Minowa Portfolio Website

> Translated from the [Japanese original](README.ja.md).

The [website](https://www.daisukeminowa.com) of my father, the painter Daisuke Minowa. He can update his artwork and background himself through an admin panel.

Built with Next.js, Payload, Neon (Postgres) and Vercel Blob, and hosted on Vercel.

## Development

1. Set the following in `.env.local` (never production values).
   - `PAYLOAD_SECRET`: any long string
   - `BLOB_READ_WRITE_TOKEN`: token for the preview Blob store
2. Start the database and the dev server.

   ```sh
   npm ci
   docker compose up --detach
   npm run dev
   ```

## Deployment

1. If you changed a content definition in `src/collections/`, run this and commit the result.

   ```sh
   npx payload migrate:create
   npx payload generate:types
   ```

2. Merge into `main` (this deploys automatically).

## Backup

1. Set the production values in `.env.backup`.
   - `DATABASE_URL`: value of `DATABASE_URL_UNPOOLED` from Vercel
   - `BLOB_READ_WRITE_TOKEN`: token for the production Blob store
2. Start Docker and run this.

   ```sh
   npm run backup
   ```

3. Check that the backup is in `backups/` (it contains personal data, so don't share it).

## Restore

1. Create new destinations.
   - An empty Postgres 18 database
   - A public Vercel Blob store
2. Set the following in `.env.restore` (without quotes).
   - `DATABASE_URL`: direct connection string of the new database
3. Restore the data.

   ```sh
   docker run --rm --interactive \
     --env-file .env.restore \
     postgres:18 \
     sh -c 'psql --single-transaction --set=ON_ERROR_STOP=1 --dbname="$DATABASE_URL"' \
     < backups/db/YYYY-MM-DD.sql
   ```

4. Upload the contents of `backups/photos/` to Blob, keeping folder and file names unchanged.
5. Change the Blob host name in `next.config.ts` to the new one.
6. Set these environment variables in Vercel to the new values.
   - `DATABASE_URL`
   - `DATABASE_URL_UNPOOLED`
   - `BLOB_READ_WRITE_TOKEN`
7. Deploy.
